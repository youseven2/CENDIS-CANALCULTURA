import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { DeviceInfo } from '../hooks/useDeviceType';
import { TranslationBundle } from '../i18n/translations';

interface FooterCintilloProps {
  deviceInfo: DeviceInfo;
  t: TranslationBundle['footer'];
  deviceLabel: string;
  onGoHome: () => void;
}

export function FooterCintillo({
  deviceInfo,
  t,
  deviceLabel,
  onGoHome,
}: FooterCintilloProps) {
  const DeviceIcon =
    deviceInfo.device === 'mobile'
      ? Smartphone
      : deviceInfo.device === 'tablet'
        ? Tablet
        : Monitor;

  return (
    <footer className="shrink-0 w-full bg-gradient-to-r from-[#1E293B] via-[#153684] to-[#1E293B] text-[#E2E8F0] z-30 shadow-inner border-t border-[#94A3B8]/40">
      {/* Línea tricolor institucional */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#F9C80E]" />
        <div className="flex-1 bg-[#153684]" />
        <div className="flex-1 bg-[#C81D25]" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-1.5 sm:py-2 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4 text-[10px] sm:text-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Logo oficial del Ministerio de Cultura en el cintillo (tocar para ir a Home) */}
          <button
            type="button"
            onClick={onGoHome}
            title="Home"
            aria-label={t.ministryName}
            className="shrink-0 bg-white/95 border border-[#F9C80E]/60 rounded-lg px-2 py-0.5 shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            <img
              src="/logos/ministerio-cultura.jpg"
              alt={t.ministryName}
              className="h-7 sm:h-8 w-auto object-contain rounded"
            />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 min-w-0">
            <span className="font-display font-bold tracking-tight text-white truncate">
              {t.ministryName}
            </span>
            <span className="hidden md:inline text-[#94A3B8]">·</span>
            <span className="hidden md:inline text-[#CBD5E1] truncate">{t.subtitle}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-[#CBD5E1]">
          <span className="hidden lg:inline">{t.rights}</span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#CBD5E1]/15 border border-[#94A3B8]/30 text-white font-semibold">
            <DeviceIcon className="w-3 h-3 text-[#F9C80E]" />
            <span>
              {t.adaptedBadge} {deviceLabel}
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
