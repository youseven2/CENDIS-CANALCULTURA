import { Share2 } from 'lucide-react';
import { DeviceCategory } from '../hooks/useDeviceType';
import { Language } from '../i18n/translations';

interface FloatingSocialsProps {
  device: DeviceCategory;
  language: Language;
  onOpenSocials: () => void;
}

export function FloatingSocials({
  device,
  language,
  onOpenSocials,
}: FloatingSocialsProps) {
  const label = language === 'es' ? 'Redes Sociales' : 'Social Media';

  return (
    <button
      type="button"
      onClick={onOpenSocials}
      aria-label={label}
      className={`fixed right-0 z-40 flex flex-col items-center justify-center gap-2 bg-gradient-to-b from-[#153684] via-[#1D4ED8] to-[#C81D25] text-white shadow-2xl border-l-2 border-y-2 border-[#F9C80E]/80 rounded-l-2xl hover:pr-1 transition-all active:scale-95 ${
        device === 'mobile'
          ? 'top-1/2 -translate-y-1/2 px-2 py-3'
          : 'top-1/2 -translate-y-1/2 px-2.5 py-4'
      }`}
    >
      <Share2 className="w-4 h-4 text-[#F9C80E] shrink-0" />
      <span
        className="font-display font-extrabold tracking-widest uppercase text-[11px] sm:text-xs whitespace-nowrap"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        {label}
      </span>
    </button>
  );
}
