import {
  BarChart3,
  Building2,
  CalendarDays,
  ChevronRight,
  Disc3,
  Radio,
} from 'lucide-react';
import { PortalLink, SocialLink } from '../data/portalData';
import { DeviceCategory } from '../hooks/useDeviceType';

interface QuickLinksPanelProps {
  links: PortalLink[];
  socials: SocialLink[];
  onOpenLink: (link: PortalLink) => void;
  device: DeviceCategory;
}

function getLinkIcon(category: PortalLink['category']) {
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

function SocialBrandIcon({ id }: { id: SocialLink['id'] }) {
  if (id === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
    );
  }
  if (id === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2v2.2H7.5V14h2.7v8h3.3Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.34 0 .66.06.96.16V9.01a6.33 6.33 0 0 0-.96-.08A6.34 6.34 0 0 0 3 15.28 6.34 6.34 0 0 0 9.34 21.6a6.34 6.34 0 0 0 6.34-6.34V8.76a8.26 8.26 0 0 0 4.82 1.55V6.86c-.31 0-.62-.06-.91-.17Z" />
    </svg>
  );
}

const SOCIAL_STYLES: Record<SocialLink['id'], string> = {
  instagram:
    'bg-gradient-to-tr from-[#C81D25] via-[#E1306C] to-[#F9C80E] text-white hover:opacity-95',
  facebook: 'bg-[#153684] text-white hover:bg-[#102966]',
  tiktok: 'bg-[#111827] text-white hover:bg-[#B12722]',
};

export function QuickLinksPanel({
  links,
  socials,
  onOpenLink,
  device,
}: QuickLinksPanelProps) {
  return (
    <aside
      aria-label="Enlaces principales y redes sociales"
      className="w-full h-full flex flex-col justify-between gap-2.5 sm:gap-3 bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-sm p-3.5 sm:p-5"
    >
      {/* Encabezado de enlaces */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-sm sm:text-base text-[#111827]">
            Accesos Directos
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-500">
            CENDIS · Canal Cultura
          </p>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#153684]/10 text-[#153684] text-[10px] sm:text-[11px] font-bold">
          <CalendarDays className="w-3 h-3" />
          Portal Único
        </span>
      </div>

      {/* Lista / Grid adaptativo de enlaces */}
      <div
        className={`grid gap-2 ${
          device === 'mobile'
            ? 'grid-cols-2'
            : device === 'tablet'
              ? 'grid-cols-2'
              : 'grid-cols-1 flex-1 content-center'
        }`}
      >
        {links.map((link) => {
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

      {/* Botones de Redes Sociales: Instagram, Facebook, TikTok */}
      <div className="pt-2 border-t border-gray-100">
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
          Redes Oficiales
        </p>
        <div className="grid grid-cols-3 gap-2">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.name} ${social.handle}`}
              className={`flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-2 rounded-xl font-display font-semibold text-xs shadow-sm transition-all active:scale-[0.97] ${SOCIAL_STYLES[social.id]}`}
            >
              <SocialBrandIcon id={social.id} />
              <span className="truncate">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
