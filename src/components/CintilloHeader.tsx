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
    <header className="w-full shrink-0 bg-white border-b border-gray-200/80 shadow-sm z-30">
      {/* Cintillo tricolor superior inspirado en los colores oficiales */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#F9C80E]" />
        <div className="flex-1 bg-[#153684]" />
        <div className="flex-1 bg-[#C81D25]" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Logos Institucionales */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none group min-w-0"
          title={t.home}
        >
          <div className="flex items-center gap-1.5 sm:gap-2.5 bg-gray-50 border border-gray-200/80 rounded-xl px-2 py-1 group-hover:border-[#C81D25]/40 transition-colors shrink-0">
            <img
              src="/logos/cultura-venezuela.jpg"
              alt="Cultura Venezuela"
              className="h-7 sm:h-10 w-auto object-contain rounded-md"
            />
            <div className="h-6 w-px bg-gray-300" />
            <img
              src="/logos/cendis.jpg"
              alt="Centro Nacional del Disco - CENDIS"
              className="h-6 sm:h-9 w-auto object-contain rounded-md"
            />
          </div>

          {device !== 'mobile' && (
            <div className="hidden md:flex flex-col leading-tight min-w-0">
              <span className="font-display font-bold text-sm text-[#111827] tracking-tight truncate">
                CENDIS · Canal Cultura
              </span>
              <span className="text-[11px] font-medium text-gray-500 truncate">
                {t.ministryShort}
              </span>
            </div>
          )}
        </button>

        {/* Controles del Cintillo: Buscar + Idioma (ES/EN) + Únicamente Home */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Icono de buscar dentro de la misma página */}
          <button
            type="button"
            onClick={onOpenSearch}
            title={t.searchButtonTitle}
            aria-label={t.searchButtonTitle}
            className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-100 hover:bg-[#153684] text-gray-700 hover:text-white border border-gray-200 transition-colors active:scale-95"
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* Selector de idioma propio ES / EN */}
          <div
            role="group"
            aria-label={t.languageLabel}
            className="inline-flex items-center rounded-xl bg-gray-100 p-0.5 border border-gray-200"
          >
            <Languages className="w-3.5 h-3.5 text-[#153684] ml-1.5 mr-1 hidden sm:block" />
            <button
              type="button"
              onClick={() => onToggleLanguage('es')}
              className={`px-2 py-1 rounded-lg text-[11px] sm:text-xs font-display font-bold transition-all ${
                language === 'es'
                  ? 'bg-[#153684] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#111827]'
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
                  : 'text-gray-600 hover:text-[#111827]'
              }`}
            >
              EN
            </button>
          </div>

          {/* Cintillo de navegación: Únicamente Home */}
          <nav aria-label="Navegación principal">
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[#C81D25] hover:bg-[#B12722] active:scale-[0.98] text-white font-display font-semibold text-xs sm:text-sm shadow-sm shadow-[#C81D25]/25 transition-all"
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
