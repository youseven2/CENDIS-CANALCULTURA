import { Share2, X } from 'lucide-react';
import { Language } from '../i18n/translations';

interface SocialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

type SocialBrandId = 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'threads';

interface InstitutionSocial {
  id: SocialBrandId;
  name: string;
  handle: string;
  url: string;
}

const CANAL_CULTURA_SOCIALS: InstitutionSocial[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@canalcultura_ve',
    url: 'https://www.youtube.com/@canalcultura_ve',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@canalcultura_ve',
    url: 'https://www.instagram.com/canalcultura_ve/?hl=es-la',
  },
  {
    id: 'threads',
    name: 'Threads',
    handle: '@canalcultura_ve',
    url: 'https://www.threads.com/@canalcultura_ve',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@canalcultura_ve',
    url: 'https://tiktok.com/@canalcultura_ve',
  },
];

const CENDIS_SOCIALS: InstitutionSocial[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@cendis_ve',
    url: 'https://www.instagram.com/cendis_ve?gwpx=MWZiamZ1eXMwOTJoaQ==',
  },
  {
    id: 'threads',
    name: 'Threads',
    handle: '@cendis_ve',
    url: 'https://www.threads.com/@cendis_ve',
  },
];

function BrandIcon({ id }: { id: SocialBrandId }) {
  if (id === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" aria-hidden="true">
        <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
      </svg>
    );
  }
  if (id === 'threads') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" aria-hidden="true">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32l-1.757-1.182C9.8 5.39 11.466 4.74 13.2 4.74h.044c3.21.02 5.146 1.964 5.21 5.224.215.104.423.22.624.348 1.24.793 2.094 1.933 2.536 3.386.678 2.226.447 5.021-1.805 7.226-1.874 1.835-4.132 2.658-7.624 2.676Zm-.618-9.956c-.795.046-1.454.277-1.908.668-.425.367-.638.842-.606 1.39.048.859.654 1.503 1.773 1.442 1.07-.058 2.275-.524 2.548-2.99a11.79 11.79 0 0 0-1.807-.51Z" />
      </svg>
    );
  }
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

const BRAND_BUTTON_STYLES: Record<SocialBrandId, string> = {
  youtube: 'bg-[#FF0000] text-white shadow-[#FF0000]/25',
  instagram:
    'bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-[#DD2A7B]/25',
  threads: 'bg-[#18181B] text-white ring-1 ring-white/25 shadow-slate-900/25',
  facebook: 'bg-[#1877F2] text-white shadow-[#1877F2]/25',
  tiktok: 'bg-[#010101] text-white ring-1 ring-[#25F4EE]/60 shadow-slate-900/25',
};

const LABELS = {
  es: {
    title: 'Redes Sociales Oficiales',
    subtitle: 'Conéctate con CENDIS y CANAL CULTURA en nuestras plataformas digitales',
    canalTitle: 'CANAL CULTURA',
    canalDesc: 'Señal audiovisual y programación cultural',
    cendisTitle: 'CENDIS',
    cendisDesc: 'Centro Nacional del Disco',
    close: 'Cerrar',
  },
  en: {
    title: 'Official Social Media',
    subtitle: 'Connect with CENDIS and CANAL CULTURA across our digital platforms',
    canalTitle: 'CANAL CULTURA',
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

        {/* Módulos lado a lado: CENDIS (izquierda) | CANAL CULTURA (derecha) */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scroll grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Módulo CENDIS (izquierda) */}
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

          {/* Módulo CANAL CULTURA (derecha) */}
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
                <h4 className="font-display font-extrabold text-base text-[#153684] uppercase truncate">
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
        </div>
      </div>
    </div>
  );
}
