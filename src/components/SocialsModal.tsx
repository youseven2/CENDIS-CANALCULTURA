import { Share2, X } from 'lucide-react';
import { Language } from '../i18n/translations';

interface SocialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface InstitutionSocial {
  id: 'instagram' | 'facebook' | 'tiktok';
  name: string;
  handle: string;
  url: string;
}

const CANAL_CULTURA_SOCIALS: InstitutionSocial[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@canalcultura.ve',
    url: 'https://www.instagram.com/',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Canal Cultura Venezuela',
    url: 'https://www.facebook.com/',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@canalcultura.ve',
    url: 'https://www.tiktok.com/',
  },
];

const CENDIS_SOCIALS: InstitutionSocial[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@cendis_ve',
    url: 'https://www.instagram.com/',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Centro Nacional del Disco',
    url: 'https://www.facebook.com/',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@cendis_ve',
    url: 'https://www.tiktok.com/',
  },
];

function BrandIcon({ id }: { id: InstitutionSocial['id'] }) {
  if (id === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
    );
  }
  if (id === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2v2.2H7.5V14h2.7v8h3.3Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.34 0 .66.06.96.16V9.01a6.33 6.33 0 0 0-.96-.08A6.34 6.34 0 0 0 3 15.28 6.34 6.34 0 0 0 9.34 21.6a6.34 6.34 0 0 0 6.34-6.34V8.76a8.26 8.26 0 0 0 4.82 1.55V6.86c-.31 0-.62-.06-.91-.17Z" />
    </svg>
  );
}

const BRAND_BUTTON_STYLES: Record<InstitutionSocial['id'], string> = {
  instagram:
    'bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-[#DD2A7B]/25',
  facebook: 'bg-[#1877F2] text-white shadow-[#1877F2]/25',
  tiktok: 'bg-[#010101] text-white ring-1 ring-[#25F4EE]/60 shadow-slate-900/25',
};

const LABELS = {
  es: {
    title: 'Redes Sociales Oficiales',
    subtitle: 'Conéctate con Canal Cultura y CENDIS en nuestras plataformas digitales',
    canalTitle: 'Canal Cultura',
    canalDesc: 'Señal audiovisual y programación cultural',
    cendisTitle: 'CENDIS',
    cendisDesc: 'Centro Nacional del Disco',
    close: 'Cerrar',
  },
  en: {
    title: 'Official Social Media',
    subtitle: 'Connect with Canal Cultura and CENDIS across our digital platforms',
    canalTitle: 'Canal Cultura',
    canalDesc: 'Audiovisual broadcast & cultural schedule',
    cendisTitle: 'CENDIS',
    cendisDesc: 'National Disc Center',
    close: 'Close',
  },
};

export function SocialsModal({ isOpen, onClose, language }: SocialsModalProps) {
  if (!isOpen) return null;
  const t = LABELS[language];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="socials-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0F172A]/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90dvh] bg-[#E2E8F0] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#94A3B8]/70 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#94A3B8]/50 bg-[#CBD5E1]/90">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#153684] text-white flex items-center justify-center shrink-0">
              <Share2 className="w-4 h-4 text-[#F9C80E]" />
            </div>
            <div className="min-w-0">
              <h3
                id="socials-modal-title"
                className="font-display font-bold text-base sm:text-lg text-[#0F172A] truncate"
              >
                {t.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#334155] truncate">{t.subtitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="p-2 rounded-xl bg-[#E2E8F0] border border-[#94A3B8]/60 text-[#334155] hover:text-[#153684] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Módulos lado a lado: Canal Cultura | CENDIS */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scroll grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Módulo Canal Cultura */}
          <div className="rounded-2xl bg-[#CBD5E1]/70 border-2 border-[#153684]/35 p-4 space-y-3 shadow-sm">
            <div className="flex items-center gap-3 pb-2.5 border-b border-[#94A3B8]/50">
              <div className="bg-white rounded-xl p-1 border border-[#94A3B8]/60 shrink-0 shadow-sm">
                <img
                  src="/logos/cultura-venezuela.jpg"
                  alt={t.canalTitle}
                  className="h-9 w-auto object-contain rounded"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-display font-extrabold text-base text-[#153684] truncate">
                  {t.canalTitle}
                </h4>
                <p className="text-[11px] text-[#334155] truncate">{t.canalDesc}</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {CANAL_CULTURA_SOCIALS.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl font-display font-bold text-sm shadow-md hover:opacity-95 active:scale-[0.98] transition-all ${BRAND_BUTTON_STYLES[item.id]}`}
                >
                  <span className="flex items-center gap-2.5">
                    <BrandIcon id={item.id} />
                    <span>{item.name}</span>
                  </span>
                  <span className="text-xs font-medium opacity-90 truncate">{item.handle}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Módulo CENDIS */}
          <div className="rounded-2xl bg-[#CBD5E1]/70 border-2 border-[#C81D25]/35 p-4 space-y-3 shadow-sm">
            <div className="flex items-center gap-3 pb-2.5 border-b border-[#94A3B8]/50">
              <div className="bg-white rounded-xl p-1 border border-[#94A3B8]/60 shrink-0 shadow-sm">
                <img
                  src="/logos/cendis.jpg"
                  alt={t.cendisTitle}
                  className="h-9 w-auto object-contain rounded"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-display font-extrabold text-base text-[#B12722] truncate">
                  {t.cendisTitle}
                </h4>
                <p className="text-[11px] text-[#334155] truncate">{t.cendisDesc}</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {CENDIS_SOCIALS.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl font-display font-bold text-sm shadow-md hover:opacity-95 active:scale-[0.98] transition-all ${BRAND_BUTTON_STYLES[item.id]}`}
                >
                  <span className="flex items-center gap-2.5">
                    <BrandIcon id={item.id} />
                    <span>{item.name}</span>
                  </span>
                  <span className="text-xs font-medium opacity-90 truncate">{item.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
