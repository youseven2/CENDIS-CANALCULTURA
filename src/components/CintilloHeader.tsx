import { Home, Languages, Search } from 'lucide-react';
import { DeviceInfo } from '../hooks/useDeviceType';
import { Language, TranslationBundle } from '../i18n/translations';

interface CintilloHeaderProps {
  deviceInfo: DeviceInfo;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onOpenSearch: () => void;
  onGoHome: () => void;
  t: TranslationBundle['header'];
}

export function CintilloHeader({
  deviceInfo,
  language,
  onToggleLanguage,
  onOpenSearch,
  onGoHome,
  t,
}: CintilloHeaderProps) {
  const { device } = deviceInfo;

  return (
    <header className="w-full shrink-0 bg-gradient-to-r from-[#DCE2EA] via-[#E8ECF2] to-[#DCE2EA] border-b border-[#94A3B8]/50 shadow-sm z-30">
      {/* Cintillo metálico superior plateado y azul */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#94A3B8]" />
        <div className="flex-1 bg-[#153684]" />
        <div className="flex-1 bg-[#64748B]" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Logos Institucionales */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none group min-w-0"
          title={t.home}
        >
          <div className="flex items-center gap-1.5 sm:gap-2.5 bg-[#CBD5E1]/70 border border-[#94A3B8]/60 rounded-xl px-2 py-1 group-hover:border-[#153684]/50 transition-colors shrink-0 shadow-inner">
            <img
              src="/logos/cultura-venezuela.jpg"
              alt="Cultura Venezuela"
              className="h-7 sm:h-10 w-auto object-contain rounded-md"
            />
            <div className="h-6 w-px bg-[#94A3B8]" />
            <img
              src="/logos/cendis.jpg"
              alt="Centro Nacional del Disco - CENDIS"
              className="h-6 sm:h-9 w-auto object-contain rounded-md"
            />
          </div>

          {device !== 'mobile' && (
            <div className="hidden md:flex flex-col leading-tight min-w-0">
              <span className="font-display font-bold text-sm text-[#0F172A] tracking-tight truncate">
                CENDIS · Canal Cultura
              </span>
              <span className="text-[11px] font-medium text-[#334155] truncate">
                {t.ministryShort}
              </span>
            </div>
          )}
        </button>

        {/* Controles del Cintillo: Buscar + Idioma (ES/EN) + Únicamente Home */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            title={t.searchButtonTitle}
            aria-label={t.searchButtonTitle}
            className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#CBD5E1]/80 hover:bg-[#153684] text-[#1E293B] hover:text-white border border-[#94A3B8]/60 transition-colors active:scale-95"
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          <div
            role="group"
            aria-label={t.languageLabel}
            className="inline-flex items-center rounded-xl bg-[#CBD5E1]/80 p-0.5 border border-[#94A3B8]/60"
          >
            <Languages className="w-3.5 h-3.5 text-[#153684] ml-1.5 mr-1 hidden sm:block" />
            <button
              type="button"
              onClick={() => onToggleLanguage('es')}
              className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs font-display font-bold transition-all ${
                language === 'es'
                  ? 'bg-[#153684] text-white shadow-sm'
                  : 'text-[#334155] hover:text-[#0F172A]'
              }`}
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => onToggleLanguage('en')}
              className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs font-display font-bold transition-all ${
                language === 'en'
                  ? 'bg-[#153684] text-white shadow-sm'
                  : 'text-[#334155] hover:text-[#0F172A]'
              }`}
            >
              EN
            </button>
          </div>

          <nav aria-label="Navegación principal">
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[#153684] hover:bg-[#0F2761] active:scale-[0.98] text-white font-display font-semibold text-xs sm:text-sm shadow-sm shadow-[#153684]/25 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>{t.home}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
