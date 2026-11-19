import { useState } from 'react';

export interface CulturalEvent {
  id: string;
  entity: 'CENDIS' | 'Canal Cultura' | 'CENDIS · Canal Cultura';
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  place: string;
  address: string;
  description: string;
  attachmentName?: string;
  attachmentType?: 'image' | 'pdf';
  attachmentDataUrl?: string;
  createdAt: string;
}

const EVENTS_STORAGE_KEY = 'cendis_canal_cultura_events_v1';

/**
 * Persists and manages CENDIS & Canal Cultura monthly calendar events in localStorage.
 */
export function useEventsStore() {
  const [events, setEvents] = useState<CulturalEvent[]>(() => {
    try {
      const raw = window.localStorage.getItem(EVENTS_STORAGE_KEY);
      if (raw) return JSON.parse(raw) as CulturalEvent[];
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const save = (next: CulturalEvent[]) => {
    setEvents(next);
    try {
      window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota errors
    }
  };

  const addEvent = (event: Omit<CulturalEvent, 'id' | 'createdAt'>) => {
    const newEvent: CulturalEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    save([newEvent, ...events]);
    return newEvent;
  };

  const deleteEvent = (id: string) => {
    save(events.filter((e) => e.id !== id));
  };

  return { events, addEvent, deleteEvent };
}
