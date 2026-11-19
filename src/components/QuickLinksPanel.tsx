import {
  BarChart3,
  Building2,
  CalendarDays,
  ChevronRight,
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
      className="w-full h-full flex flex-col justify-between gap-1 bg-gradient-to-b from-[#E2E8F0] to-[#CBD5E1] rounded-2xl sm:rounded-3xl border border-[#94A3B8]/60 shadow-md p-2 sm:p-3 overflow-hidden"
    >
      <div className="flex items-center justify-between shrink-0 pb-1 border-b border-[#94A3B8]/40">
        <div>
          <h2 className="font-display font-bold text-xs sm:text-sm text-[#0F172A] leading-tight">
            {t.title}
          </h2>
          <p className="text-[10px] text-[#334155] leading-tight">{t.subtitle}</p>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#153684] to-[#1D4ED8] text-white shadow-sm text-[9px] sm:text-[10px] font-bold">
          <CalendarDays className="w-3 h-3 text-[#F9C80E]" />
          {t.portalBadge}
        </span>
      </div>

      {/* Lista vertical en computadora más compacta y ajustada a la ventana */}
      <div
        className={`grid gap-1 flex-1 content-evenly min-h-0 overflow-y-auto custom-scroll ${
          device === 'desktop' ? 'grid-cols-1' : 'grid-cols-2'
        }`}
      >
        {t.links.map((link) => {
          const Icon = getLinkIcon(link.category);
          return (
            <button
              key={link.id}
              type="button"
              onClick={() => onOpenLink(link)}
              className="group w-full text-left flex items-center gap-2 px-2 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-[#94A3B8]/50 bg-[#F1F5F9]/85 hover:bg-[#F8FAFC] hover:border-[#153684]/50 hover:shadow-sm transition-all active:scale-[0.99]"
            >
              <div
                className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: link.accent }}
              >
                <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-display font-bold text-[10px] sm:text-xs text-[#0F172A] truncate group-hover:text-[#153684] transition-colors">
                    {link.title}
                  </span>
                  {link.badge && device !== 'mobile' && (
                    <span className="shrink-0 px-1 py-0.2 rounded text-[8px] font-extrabold tracking-wide bg-[#CBD5E1] text-[#1E293B]">
                      {link.badge}
                    </span>
                  )}
                </div>
                {device !== 'mobile' && (
                  <p className="text-[9px] sm:text-[10px] text-[#475569] truncate leading-tight">
                    {link.description}
                  </p>
                )}
              </div>

              {device === 'desktop' && (
                <ChevronRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#153684] group-hover:translate-x-0.5 transition-all shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
