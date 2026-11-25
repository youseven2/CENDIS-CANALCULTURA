import { useState } from 'react';
import { TRANSLATIONS, TranslatedSlide } from '../i18n/translations';

export interface ManagedSlide extends TranslatedSlide {
  imageDataUrl?: string;
}

const CAROUSEL_STORAGE_KEY = 'cendis_canal_cultura_carousel_v2';

const DEFAULT_SLIDES: ManagedSlide[] = TRANSLATIONS.es.carousel.slides.map((s) => ({
  ...s,
}));

/**
 * Persists and manages main HeroCarousel slides (predetermined + custom news slides) in localStorage.
 */
export function useCarouselStore() {
  const [slides, setSlides] = useState<ManagedSlide[]>(() => {
    try {
      const raw = window.localStorage.getItem(CAROUSEL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ManagedSlide[];
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_SLIDES;
  });

  const persist = (next: ManagedSlide[]) => {
    setSlides(next);
    try {
      window.localStorage.setItem(CAROUSEL_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota errors
    }
  };

  const addSlide = (slide: Omit<ManagedSlide, 'id'>) => {
    const newSlide: ManagedSlide = {
      ...slide,
      id: `slide-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    persist([...slides, newSlide]);
    return newSlide;
  };

  const updateSlide = (id: string, patch: Omit<ManagedSlide, 'id'>) => {
    persist(slides.map((s) => (s.id === id ? { ...patch, id } : s)));
  };

  const deleteSlide = (id: string) => {
    persist(slides.filter((s) => s.id !== id));
  };

  const resetSlides = () => {
    persist(DEFAULT_SLIDES);
  };

  return { slides, addSlide, updateSlide, deleteSlide, resetSlides };
}
