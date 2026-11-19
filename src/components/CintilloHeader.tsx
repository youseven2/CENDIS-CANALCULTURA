import { Home, Info, Languages, Network, Search } from 'lucide-react';
import { Language, TranslationBundle } from '../i18n/translations';

interface CintilloHeaderProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onOpenSearch: () => void;
  onOpenConocenos: () => void;
  onOpenOrganigrama: () => void;
  onGoHome: () => void;
  t: TranslationBundle['header'];
}

export function CintilloHeader({
  language,
  onToggleLanguage,
  onOpenSearch,
  onOpenConocenos,
  onOpenOrganigrama,
  onGoHome,
  t,
}: CintilloHeaderProps) {
  return (
    <header className="w-full shrink-0 bg-gradient-to-r from-[#DCE2EA] via-[#E8ECF2] to-[#DCE2EA] border-b border-[#94A3B8]/50 shadow-sm z-30">
      {/* Cintillo metálico superior con acento tricolor */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#F9C80E]" />
        <div className="flex-1 bg-[#153684]" />
        <div className="flex-1 bg-[#C81D25]" />
      </div>

      <div className="max-w-7xl mx-auto px-2.5 sm:px-5 lg:px-6 py-1.5 sm:py-2">
        <div className="flex items-center justify-between gap-2">
          {/* LADO IZQUIERDO: Ambos logos (sin nombres) + Buscar + Traducción ES/EN */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 bg-white/95 rounded-xl px-1.5 sm:px-2 py-1 border border-[#94A3B8]/70 shadow-sm">
              <button
                type="button"
                onClick={onGoHome}
                title={t.home}
                aria-label={`CENDIS - ${t.home}`}
                className="focus:outline-none hover:opacity-85 active:scale-95 transition-all"
              >
                <img
                  src="/logos/cendis.jpg"
                  alt="CENDIS"
                  className="h-5 sm:h-7 w-auto object-contain rounded"
                />
              </button>
              <div className="h-5 sm:h-6 w-px bg-[#94A3B8]" />
              <button
                type="button"
                onClick={onGoHome}
                title={t.home}
                aria-label={`Canal Cultura - ${t.home}`}
                className="focus:outline-none hover:opacity-85 active:scale-95 transition-all"
              >
                <img
                  src="/logos/cultura-venezuela.jpg"
                  alt="Canal Cultura"
                  className="h-6 sm:h-8 w-auto object-contain rounded"
                />
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenSearch}
              title={t.searchButtonTitle}
              aria-label={t.searchButtonTitle}
              className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#CBD5E1]/80 hover:bg-[#153684] text-[#1E293B] hover:text-white border border-[#94A3B8]/60 transition-colors active:scale-95 shrink-0"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            <div
              role="group"
              aria-label={t.languageLabel}
              className="inline-flex items-center rounded-xl bg-[#CBD5E1]/80 p-0.5 border border-[#94A3B8]/60 shrink-0"
            >
              <Languages className="w-3.5 h-3.5 text-[#153684] ml-1.5 mr-1 hidden lg:block" />
              <button
                type="button"
                onClick={() => onToggleLanguage('es')}
                className={`px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-xs font-display font-bold transition-all ${
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
                className={`px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-xs font-display font-bold transition-all ${
                  language === 'en'
                    ? 'bg-[#153684] text-white shadow-sm'
                    : 'text-[#334155] hover:text-[#0F172A]'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* LADO DERECHO (md+): Home, Conócenos, Organigrama */}
          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-1.5 shrink-0"
          >
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#153684] hover:bg-[#0F2761] active:scale-[0.98] text-white font-display font-semibold text-xs shadow-sm shadow-[#153684]/25 transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.home}</span>
            </button>

            <button
              type="button"
              onClick={onOpenConocenos}
              title={t.aboutUs}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#CBD5E1] hover:bg-[#334155] text-[#0F172A] hover:text-white border border-[#94A3B8]/70 active:scale-[0.98] font-display font-semibold text-xs transition-all"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{t.aboutUs}</span>
            </button>

            <button
              type="button"
              onClick={onOpenOrganigrama}
              title={t.orgChart}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#CBD5E1] hover:bg-[#334155] text-[#0F172A] hover:text-white border border-[#94A3B8]/70 active:scale-[0.98] font-display font-semibold text-xs transition-all"
            >
              <Network className="w-3.5 h-3.5" />
              <span>{t.orgChart}</span>
            </button>
          </nav>
        </div>

        {/* Fila 2 exclusiva para móvil (< md): Home, Conócenos y Organigrama */}
        <nav
          aria-label="Navegación móvil"
          className="flex md:hidden items-center justify-center gap-1.5 pt-1.5 mt-1.5 border-t border-[#94A3B8]/40"
        >
          <button
            type="button"
            onClick={onGoHome}
            className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-xl bg-[#153684] hover:bg-[#0F2761] active:scale-[0.98] text-white font-display font-semibold text-[11px] shadow-sm transition-all"
          >
            <Home className="w-3.5 h-3.5 shrink-0" />
            <span>{t.home}</span>
          </button>

          <button
            type="button"
            onClick={onOpenConocenos}
            className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-xl bg-[#CBD5E1] hover:bg-[#334155] text-[#0F172A] hover:text-white border border-[#94A3B8]/70 active:scale-[0.98] font-display font-semibold text-[11px] transition-all"
          >
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t.aboutUs}</span>
          </button>

          <button
            type="button"
            onClick={onOpenOrganigrama}
            className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1.5 rounded-xl bg-[#CBD5E1] hover:bg-[#334155] text-[#0F172A] hover:text-white border border-[#94A3B8]/70 active:scale-[0.98] font-display font-semibold text-[11px] transition-all"
          >
            <Network className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t.orgChart}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
