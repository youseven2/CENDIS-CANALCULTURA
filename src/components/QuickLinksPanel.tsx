import {
  BarChart3,
  Building2,
  CalendarDays,
  Disc3,
  Mic,
  Music,
  Newspaper,
  Radio,
} from 'lucide-react';
import { DeviceCategory } from '../hooks/useDeviceType';
import { TranslatedLink, TranslationBundle } from '../i18n/translations';

interface QuickLinksPanelProps {
  t: TranslationBundle['linksPanel'];
  onOpenLink: (link: TranslatedLink) => void;
  device: DeviceCategory;
}

function getLinkIcon(category: TranslatedLink['category']) {
  switch (category) {
    case 'canal':
      return Radio;
    case 'cendis':
      return Disc3;
    case 'concerts':
      return Music;
    case 'podcast':
      return Mic;
    case 'news':
      return Newspaper;
    case 'reportes':
      return BarChart3;
    case 'institucional':
    default:
      return Building2;
  }
}

export function QuickLinksPanel({ t, onOpenLink, device }: QuickLinksPanelProps) {
  return (
    <aside
      aria-label={t.title}
      className="w-full h-full flex flex-col justify-between gap-2 bg-gradient-to-b from-[#E2E8F0] to-[#CBD5E1] rounded-2xl sm:rounded-3xl border border-[#94A3B8]/60 shadow-md p-3 sm:p-4 overflow-hidden"
    >
      <div className="flex items-center justify-between shrink-0">
        <div className="min-w-0">
          <h2 className="font-display font-bold text-xs sm:text-sm text-[#0F172A] truncate">
            {t.title}
          </h2>
          <p className="text-[10px] sm:text-[11px] text-[#334155] truncate">{t.subtitle}</p>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#153684] to-[#1D4ED8] text-white shadow-sm text-[10px] font-bold shrink-0">
          <CalendarDays className="w-3 h-3 text-[#F9C80E]" />
          {t.portalBadge}
        </span>
      </div>

      {/* Grilla compacta 2x3 para que todos los accesos directos quepan en una sola ventana */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 flex-1 content-center min-h-0">
        {t.links.map((link) => {
          const Icon = getLinkIcon(link.category);
          return (
            <button
              key={link.id}
              type="button"
              onClick={() => onOpenLink(link)}
              className="group w-full text-left flex items-center gap-2 p-2 sm:p-2.5 rounded-xl border border-[#94A3B8]/50 bg-[#F1F5F9]/80 hover:bg-[#F8FAFC] hover:border-[#153684]/50 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div
                className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: link.accent }}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-display font-bold text-[11px] sm:text-xs text-[#0F172A] truncate group-hover:text-[#153684] transition-colors">
                    {link.title}
                  </span>
                  {link.badge && device === 'desktop' && (
                    <span className="shrink-0 px-1 py-0.5 rounded text-[8px] font-extrabold tracking-wide bg-[#CBD5E1] text-[#1E293B]">
                      {link.badge}
                    </span>
                  )}
                </div>
                {device !== 'mobile' && (
                  <p className="text-[10px] text-[#475569] truncate mt-0.5">
                    {link.description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
