import {
  BarChart3,
  Building2,
  CalendarDays,
  ChevronRight,
  Disc3,
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
      className="w-full h-full flex flex-col justify-between gap-2.5 sm:gap-3 bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-sm p-3.5 sm:p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-sm sm:text-base text-[#111827]">
            {t.title}
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-500">{t.subtitle}</p>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#153684]/10 text-[#153684] text-[10px] sm:text-[11px] font-bold">
          <CalendarDays className="w-3 h-3" />
          {t.portalBadge}
        </span>
      </div>

      <div
        className={`grid gap-2 flex-1 content-center ${
          device === 'mobile'
            ? 'grid-cols-2'
            : device === 'tablet'
              ? 'grid-cols-2'
              : 'grid-cols-1'
        }`}
      >
        {t.links.map((link) => {
          const Icon = getLinkIcon(link.category);
          return (
            <button
              key={link.id}
              type="button"
              onClick={() => onOpenLink(link)}
              className="group w-full text-left flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border border-gray-200/80 bg-[#F8F9FB] hover:bg-white hover:border-[#C81D25]/40 hover:shadow-md transition-all active:scale-[0.99]"
            >
              <div
                className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: link.accent }}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-xs sm:text-sm text-[#111827] truncate group-hover:text-[#C81D25] transition-colors">
                    {link.title}
                  </span>
                  {link.badge && device !== 'mobile' && (
                    <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] font-extrabold tracking-wide bg-[#F9C80E]/30 text-[#111827]">
                      {link.badge}
                    </span>
                  )}
                </div>
                {device !== 'mobile' && (
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">
                    {link.description}
                  </p>
                )}
              </div>

              {device === 'desktop' && (
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#C81D25] group-hover:translate-x-0.5 transition-all shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
