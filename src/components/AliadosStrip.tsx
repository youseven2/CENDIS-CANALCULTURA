import { Handshake } from 'lucide-react';
import { Language } from '../i18n/translations';

export interface AllyItem {
  id: string;
  shortName: string;
  fullNameEs: string;
  fullNameEn: string;
  descEs: string;
  descEn: string;
  accent: string;
}

export const CENDIS_ALLIES: AllyItem[] = [
  {
    id: 'cenaf',
    shortName: 'CENAF',
    fullNameEs: 'Centro Nacional de Fotografía',
    fullNameEn: 'National Photography Center (CENAF)',
    descEs: 'Ente adscrito al Ministerio del Poder Popular para la Cultura dedicado a la preservación y difusión fotográfica.',
    descEn: "Agency attached to the Ministry of People's Power for Culture dedicated to photographic preservation and outreach.",
    accent: '#153684',
  },
  {
    id: 'cenat',
    shortName: 'CENAT',
    fullNameEs: 'Centro Nacional de Teatro',
    fullNameEn: 'National Theater Center (CENAT)',
    descEs: 'Ente del Ministerio del Poder Popular para la Cultura impulsor de las artes escénicas y el teatro nacional.',
    descEn: "Ministry of People's Power for Culture agency promoting performing arts and national theater.",
    accent: '#B12722',
  },
  {
    id: 'cinemateca',
    shortName: 'Cinemateca',
    fullNameEs: 'Fundación Cinemateca Nacional',
    fullNameEn: 'National Cinematheque Foundation',
    descEs: 'Ente adscrito al Ministerio de Cultura encargado del resguardo y proyección del patrimonio cinematográfico.',
    descEn: 'Ministry of Culture agency responsible for safeguarding and screening film heritage.',
    accent: '#334155',
  },
  {
    id: 'teatros',
    shortName: 'Teatros',
    fullNameEs: 'Red Nacional de Teatros',
    fullNameEn: 'National Theater Network',
    descEs: 'Espacios culturales y salas escénicas adscritas al Ministerio del Poder Popular para la Cultura.',
    descEn: "Cultural venues and performing halls attached to the Ministry of People's Power for Culture.",
    accent: '#D97706',
  },
  {
    id: 'alba-ciudad',
    shortName: 'Alba Ciudad',
    fullNameEs: 'Alba Ciudad 96.3 FM',
    fullNameEn: 'Alba Ciudad 96.3 FM',
    descEs: 'Emisora cultural del Ministerio del Poder Popular para la Cultura al servicio de la música y la información.',
    descEn: "Cultural radio station of the Ministry of People's Power for Culture serving music and information.",
    accent: '#0F766E',
  },
  {
    id: 'museos',
    shortName: 'Museos',
    fullNameEs: 'Fundación Museos Nacionales',
    fullNameEn: 'National Museums Foundation',
    descEs: 'Red de museos adscrita al Ministerio de Cultura para la preservación de las artes visuales y la historia.',
    descEn: 'Network of museums attached to the Ministry of Culture for visual arts and history preservation.',
    accent: '#0284C7',
  },
];

interface AliadosStripProps {
  language: Language;
  onSelectAlly: (ally: AllyItem) => void;
}

export function AliadosStrip({ language, onSelectAlly }: AliadosStripProps) {
  const title =
    language === 'es'
      ? 'Aliados CENDIS · Entes del Ministerio de Cultura'
      : 'CENDIS Allies · Ministry of Culture Agencies';

  return (
    <section
      aria-label={title}
      className="shrink-0 w-full bg-gradient-to-r from-[#CBD5E1]/90 via-[#E2E8F0]/95 to-[#CBD5E1]/90 border border-[#94A3B8]/60 rounded-xl sm:rounded-2xl px-2.5 sm:px-4 py-1.5 sm:py-2 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3"
    >
      <div className="flex items-center gap-1.5 shrink-0">
        <Handshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#153684] shrink-0" />
        <span className="font-display font-bold text-[10px] sm:text-xs text-[#0F172A] tracking-tight">
          {title}:
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
        {CENDIS_ALLIES.map((ally) => (
          <button
            key={ally.id}
            type="button"
            onClick={() => onSelectAlly(ally)}
            className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-[#F1F5F9]/90 hover:bg-white border border-[#94A3B8]/60 hover:border-[#153684]/50 text-[#0F172A] font-display font-bold text-[10px] sm:text-[11px] shadow-sm transition-all active:scale-95"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: ally.accent }}
            />
            <span>{ally.shortName}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
