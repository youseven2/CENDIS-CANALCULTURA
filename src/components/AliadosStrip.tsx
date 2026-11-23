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
  logoUrl?: string;
  externalUrl?: string;
}

export const CENDIS_ALLIES: AllyItem[] = [
  {
    id: 'cenaf',
    shortName: 'CENAF',
    fullNameEs: 'Fundación Centro Nacional de la Fotografía',
    fullNameEn: 'National Photography Center (CENAF)',
    descEs:
      'Ente adscrito al Ministerio del Poder Popular para la Cultura dedicado a la preservación y difusión fotográfica.',
    descEn:
      "Agency attached to the Ministry of People's Power for Culture dedicated to photographic preservation and outreach.",
    accent: '#153684',
    logoUrl: '/logos/cenaf.jpg',
    externalUrl: 'https://cenaf.org.ve/',
  },
  {
    id: 'teatro',
    shortName: 'TEATRO',
    fullNameEs: 'Compañía Nacional de Teatro',
    fullNameEn: 'National Theater Company',
    descEs:
      'Ente del Ministerio del Poder Popular para la Cultura impulsor de las artes escénicas y la red nacional de teatros.',
    descEn:
      "Ministry of People's Power for Culture agency promoting performing arts and the national theater network.",
    accent: '#B12722',
    logoUrl: '/logos/compania-teatro.jpg',
    externalUrl: 'https://www.instagram.com/cnteatro_ve?knvt=MXFhdHhwZHpzbnJxYQ==',
  },
  {
    id: 'alba-ciudad',
    shortName: 'ALBA CIUDAD',
    fullNameEs: 'Alba Ciudad 96.3 FM',
    fullNameEn: 'Alba Ciudad 96.3 FM',
    descEs:
      'Emisora cultural del Ministerio del Poder Popular para la Cultura al servicio de la música y la información.',
    descEn:
      "Cultural radio station of the Ministry of People's Power for Culture serving music and information.",
    accent: '#0F766E',
  },
  {
    id: 'danza',
    shortName: 'DANZA',
    fullNameEs: 'Fundación Compañía Nacional de Danza',
    fullNameEn: 'National Dance Company Foundation',
    descEs:
      'Ente adscrito al Ministerio del Poder Popular para la Cultura dedicado al fomento y proyección de la danza nacional.',
    descEn:
      "Agency attached to the Ministry of People's Power for Culture dedicated to promoting national dance.",
    accent: '#D97706',
    logoUrl: '/logos/compania-danza.jpg',
    externalUrl: 'https://www.instagram.com/cndanzave_?avpt=M3BkeG8yempubnAw',
  },
  {
    id: 'musica',
    shortName: 'MÚSICA',
    fullNameEs: 'Compañía Nacional de Música',
    fullNameEn: 'National Music Company',
    descEs:
      'Ente del Ministerio del Poder Popular para la Cultura dedicado a la promoción de las expresiones musicales.',
    descEn:
      "Ministry of People's Power for Culture agency dedicated to promoting musical expressions.",
    accent: '#0284C7',
    logoUrl: '/logos/compania-musica.jpg',
    externalUrl: 'https://www.instagram.com/companiademusica_ve?avpt=MXI0eDJ0NmtwNW9hOQ==',
  },
  {
    id: 'circo',
    shortName: 'CIRCO',
    fullNameEs: 'Artes Circenses Nacionales',
    fullNameEn: 'National Circus Arts',
    descEs:
      'Expresión y formación circense adscrita al Ministerio del Poder Popular para la Cultura.',
    descEn:
      "Circus arts training and cultural outreach attached to the Ministry of People's Power for Culture.",
    accent: '#7C3AED',
  },
  {
    id: 'iaem',
    shortName: 'IAEM',
    fullNameEs: 'Instituto de las Artes Escénicas y Musicales (IAEM)',
    fullNameEn: 'Institute of Performing and Musical Arts (IAEM)',
    descEs:
      'Ente aliado adscrito al Ministerio del Poder Popular para la Cultura en articulación con el CENDIS.',
    descEn:
      "Allied agency attached to the Ministry of People's Power for Culture working alongside CENDIS.",
    accent: '#334155',
    logoUrl: '/logos/iaem.jpg',
    externalUrl: 'https://www.instagram.com/plataformaiaem?evlk=NGVsb283NnNzMTFo',
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
      className="shrink-0 w-full bg-gradient-to-r from-[#CBD5E1]/90 via-[#E2E8F0]/95 to-[#CBD5E1]/90 border border-[#94A3B8]/60 rounded-xl sm:rounded-2xl px-2.5 sm:px-4 py-1 sm:py-1.5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3"
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
            onClick={() => {
              if (ally.externalUrl) {
                window.open(ally.externalUrl, '_blank', 'noopener,noreferrer');
                return;
              }
              onSelectAlly(ally);
            }}
            className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-[#F1F5F9]/90 hover:bg-white border border-[#94A3B8]/60 hover:border-[#153684]/50 text-[#0F172A] font-display font-bold text-[10px] sm:text-[11px] shadow-sm transition-all active:scale-95"
          >
            {ally.logoUrl ? (
              <img
                src={ally.logoUrl}
                alt={ally.shortName}
                className="h-3.5 sm:h-4 w-auto object-contain rounded-sm shrink-0"
              />
            ) : (
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: ally.accent }}
              />
            )}
            <span>{ally.shortName}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
