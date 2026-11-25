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

const VISITS_STORAGE_KEY = 'cendis_canal_cultura_visits_v3';
const CONTENT_STORAGE_KEY = 'cendis_canal_cultura_content_views_v3';
const COUNTRY_STORAGE_KEY = 'cendis_canal_cultura_country_views_v3';

const EMPTY_COUNTRIES: Omit<CountryStat, 'visits' | 'percent'>[] = [
  { countryEs: 'Venezuela', countryEn: 'Venezuela', code: 'VE' },
  { countryEs: 'Colombia', countryEn: 'Colombia', code: 'CO' },
  { countryEs: 'España', countryEn: 'Spain', code: 'ES' },
  { countryEs: 'Estados Unidos', countryEn: 'United States', code: 'US' },
  { countryEs: 'Argentina', countryEn: 'Argentina', code: 'AR' },
  { countryEs: 'Otros Países', countryEn: 'Other Countries', code: 'INT' },
];

const EMPTY_CONTENT: Omit<ContentStat, 'views' | 'avgTime'>[] = [
  {
    id: 'canal-envivo',
    titleEs: 'Señal en Vivo',
    titleEn: 'Live Signal',
  },
  {
    id: 'cendis-catalogo',
    titleEs: 'Catálogo',
    titleEn: 'Catalog',
  },
  {
    id: 'conciertos',
    titleEs: 'Conciertos',
    titleEn: 'Concerts',
  },
  {
    id: 'podcast',
    titleEs: 'Podcast',
    titleEn: 'Podcast',
  },
  {
    id: 'noticias',
    titleEs: 'Noticias',
    titleEn: 'News',
  },
  {
    id: 'canal-programacion',
    titleEs: 'Parrilla',
    titleEn: 'Schedule',
  },
];

function detectVisitorCountryCode(): { label: string; code: string } {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const locale = navigator.language || '';
    if (tz.includes('Caracas') || locale.includes('VE')) {
      return { label: 'Venezuela (VE)', code: 'VE' };
    }
    if (tz.includes('Bogota') || locale.includes('CO')) {
      return { label: 'Colombia (CO)', code: 'CO' };
    }
    if (tz.includes('Madrid') || locale.includes('ES')) {
      return { label: 'España (ES)', code: 'ES' };
    }
    if (tz.includes('America/New_York') || locale.includes('US')) {
      return { label: 'Estados Unidos (US)', code: 'US' };
    }
    if (tz.includes('Buenos_Aires') || locale.includes('AR')) {
      return { label: 'Argentina (AR)', code: 'AR' };
    }
    return { label: tz ? tz.replace('_', ' ') : 'Sin registro', code: 'INT' };
  } catch {
    return { label: 'Sin registro', code: 'INT' };
  }
}

export function formatDuration(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
}

/**
 * Starts all metrics strictly at zero for clean testing, and provides resetStats().
 */
export function usePortalStats() {
  const [detected] = useState(() => detectVisitorCountryCode());
  const [sessionSeconds, setSessionSeconds] = useState(0);

  const [totalVisits, setTotalVisits] = useState<number>(() => {
    try {
      return Number(window.localStorage.getItem(VISITS_STORAGE_KEY) || '0');
    } catch {
      return 0;
    }
  });

  const [countryVisits, setCountryVisits] = useState<Record<string, number>>(() => {
    try {
      const raw = window.localStorage.getItem(COUNTRY_STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Record<string, number>;
    } catch {
      // ignore
    }
    return {};
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

    setTotalVisits((prev) => {
      const next = prev + 1;
      try {
        window.localStorage.setItem(VISITS_STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });

    setCountryVisits((prev) => {
      const updated = { ...prev, [detected.code]: (prev[detected.code] || 0) + 1 };
      try {
        window.localStorage.setItem(COUNTRY_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const resetStats = () => {
    setTotalVisits(0);
    setCountryVisits({});
    setContentViews({});
    setSessionSeconds(0);
    try {
      window.localStorage.removeItem(VISITS_STORAGE_KEY);
      window.localStorage.removeItem(COUNTRY_STORAGE_KEY);
      window.localStorage.removeItem(CONTENT_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const totalCountryVisits = Object.values(countryVisits).reduce((acc, v) => acc + v, 0);

  const countries: CountryStat[] = EMPTY_COUNTRIES.map((c) => {
    const visits = countryVisits[c.code] || 0;
    const percent =
      totalCountryVisits > 0 ? Math.round((visits / totalCountryVisits) * 100) : 0;
    return { ...c, visits, percent };
  });

  const topContent: ContentStat[] = EMPTY_CONTENT.map((item) => ({
    ...item,
    views: contentViews[item.id] || 0,
    avgTime: '00m 00s',
  })).sort((a, b) => b.views - a.views);

  const stats: PortalStatsState = {
    totalVisits,
    sessionSeconds,
    avgViewTime: formatDuration(sessionSeconds),
    currentVisitorRegion: detected.label,
    countries,
    topContent,
  };

  return { stats, trackContentView, resetStats };
}
