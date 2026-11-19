import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { DeviceInfo } from '../hooks/useDeviceType';
import { TranslationBundle } from '../i18n/translations';

interface FooterCintilloProps {
  deviceInfo: DeviceInfo;
  t: TranslationBundle['footer'];
  deviceLabel: string;
}

export function FooterCintillo({ deviceInfo, t, deviceLabel }: FooterCintilloProps) {
  const DeviceIcon =
    deviceInfo.device === 'mobile'
      ? Smartphone
      : deviceInfo.device === 'tablet'
        ? Tablet
        : Monitor;

  return (
    <footer className="shrink-0 w-full bg-[#153684] text-white z-30 shadow-inner">
      {/* Línea tricolor superior del cintillo de pie de página */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#F9C80E]" />
        <div className="flex-1 bg-[#153684]" />
        <div className="flex-1 bg-[#C81D25]" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-2 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-[10px] sm:text-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-block w-2 h-2 rounded-full bg-[#F9C80E] shrink-0" />
          <span className="font-display font-bold tracking-tight truncate">
            {t.ministryName}
          </span>
          <span className="hidden md:inline text-white/60">·</span>
          <span className="hidden md:inline text-white/85 truncate">{t.subtitle}</span>
        </div>

        <div className="flex items-center gap-3 shrink-0 text-white/85">
          <span className="hidden lg:inline">{t.rights}</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 text-white font-semibold">
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
