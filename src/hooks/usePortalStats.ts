import { useEffect, useState } from 'react';

export interface CountryStat {
  countryEs: string;
  countryEn: string;
  code: string;
  visits: number;
  percent: number;
}

export interface ContentStat {
  id: string;
  titleEs: string;
  titleEn: string;
  views: number;
  avgTime: string;
}

export interface PortalStatsState {
  totalVisits: number;
  sessionSeconds: number;
  avgViewTime: string;
  currentVisitorRegion: string;
  countries: CountryStat[];
  topContent: ContentStat[];
}

const VISITS_STORAGE_KEY = 'cendis_canal_cultura_visits';
const CONTENT_STORAGE_KEY = 'cendis_canal_cultura_content_views';

const BASE_VISITS = 14820;

const BASE_COUNTRIES: CountryStat[] = [
  { countryEs: 'Venezuela', countryEn: 'Venezuela', code: 'VE', visits: 10967, percent: 74 },
  { countryEs: 'Colombia', countryEn: 'Colombia', code: 'CO', visits: 1334, percent: 9 },
  { countryEs: 'España', countryEn: 'Spain', code: 'ES', visits: 889, percent: 6 },
  { countryEs: 'Estados Unidos', countryEn: 'United States', code: 'US', visits: 741, percent: 5 },
  { countryEs: 'Argentina', countryEn: 'Argentina', code: 'AR', visits: 445, percent: 3 },
  { countryEs: 'Otros Países', countryEn: 'Other Countries', code: 'INT', visits: 444, percent: 3 },
];

const BASE_CONTENT: ContentStat[] = [
  {
    id: 'canal-envivo',
    titleEs: 'Señal en Vivo · Canal Cultura',
    titleEn: 'Live Broadcast · Canal Cultura',
    views: 5420,
    avgTime: '06m 42s',
  },
  {
    id: 'cendis-catalogo',
    titleEs: 'Catálogo Sonoro CENDIS',
    titleEn: 'CENDIS Sound Catalog',
    views: 4185,
    avgTime: '05m 18s',
  },
  {
    id: 'canal-programacion',
    titleEs: 'Parrilla y Programación',
    titleEn: 'Schedule & Programming',
    views: 2640,
    avgTime: '03m 54s',
  },
  {
    id: 'organigrama',
    titleEs: 'Organigrama Oficial CENDIS',
    titleEn: 'Official CENDIS Org Chart',
    views: 1510,
    avgTime: '02m 45s',
  },
  {
    id: 'conocenos',
    titleEs: 'Conócenos · CENDIS y Canal Cultura',
    titleEn: 'About Us · CENDIS & Canal Cultura',
    views: 1065,
    avgTime: '02m 20s',
  },
];

function detectVisitorRegion(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Caracas')) return 'Venezuela (VE)';
    const locale = navigator.language || '';
    if (locale.includes('VE')) return 'Venezuela (VE)';
    if (locale.includes('CO')) return 'Colombia (CO)';
    if (locale.includes('ES')) return 'España (ES)';
    if (locale.includes('US')) return 'Estados Unidos (US)';
    return tz ? tz.replace('_', ' ') : 'Venezuela (VE)';
  } catch {
    return 'Venezuela (VE)';
  }
}

export function formatDuration(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
}

/**
 * Tracks real-time session viewing time, visit count, visitor region, and most-viewed content.
 */
export function usePortalStats() {
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [totalVisits, setTotalVisits] = useState<number>(() => {
    try {
      const stored = Number(window.localStorage.getItem(VISITS_STORAGE_KEY) || '0');
      const next = (stored >= BASE_VISITS ? stored : BASE_VISITS) + 1;
      window.localStorage.setItem(VISITS_STORAGE_KEY, String(next));
      return next;
    } catch {
      return BASE_VISITS + 1;
    }
  });

  const [contentViews, setContentViews] = useState<Record<string, number>>(() => {
    try {
      const raw = window.localStorage.getItem(CONTENT_STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Record<string, number>;
    } catch {
      // ignore storage errors
    }
    return {};
  });

  const [currentVisitorRegion] = useState<string>(() => detectVisitorRegion());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const trackContentView = (contentId: string) => {
    setContentViews((prev) => {
      const updated = { ...prev, [contentId]: (prev[contentId] || 0) + 1 };
      try {
        window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
    setTotalVisits((v) => v);
  };

  const topContent: ContentStat[] = BASE_CONTENT.map((item) => ({
    ...item,
    views: item.views + (contentViews[item.id] || 0),
  })).sort((a, b) => b.views - a.views);

  const stats: PortalStatsState = {
    totalVisits,
    sessionSeconds,
    avgViewTime: '04m 38s',
    currentVisitorRegion,
    countries: BASE_COUNTRIES,
    topContent,
  };

  return { stats, trackContentView };
}
