import { SocialLink } from '../data/portalData';
import { DeviceCategory } from '../hooks/useDeviceType';

interface FloatingSocialsProps {
  socials: SocialLink[];
  device: DeviceCategory;
  ariaLabel: string;
}

function SocialSvg({ id }: { id: SocialLink['id'] }) {
  if (id === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
    );
  }
  if (id === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2v2.2H7.5V14h2.7v8h3.3Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.34 0 .66.06.96.16V9.01a6.33 6.33 0 0 0-.96-.08A6.34 6.34 0 0 0 3 15.28 6.34 6.34 0 0 0 9.34 21.6a6.34 6.34 0 0 0 6.34-6.34V8.76a8.26 8.26 0 0 0 4.82 1.55V6.86c-.31 0-.62-.06-.91-.17Z" />
    </svg>
  );
}

const FLOAT_STYLES: Record<SocialLink['id'], string> = {
  instagram:
    'bg-gradient-to-tr from-[#334155] via-[#475569] to-[#64748B] text-white shadow-slate-700/30',
  facebook: 'bg-[#153684] text-white shadow-[#153684]/30',
  tiktok: 'bg-[#0F172A] text-[#E2E8F0] shadow-slate-900/30',
};

export function FloatingSocials({ socials, device, ariaLabel }: FloatingSocialsProps) {
  const isMobile = device === 'mobile';

  return (
    <div
      aria-label={ariaLabel}
      className={
        isMobile
          ? 'fixed bottom-12 right-3 z-40 flex items-center gap-2 bg-[#E2E8F0]/90 backdrop-blur-md p-1.5 rounded-full shadow-xl border border-[#94A3B8]/70'
          : 'fixed right-3 sm:right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5 bg-[#E2E8F0]/90 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-[#94A3B8]/70'
      }
    >
      {socials.map((social) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${social.name} (${social.handle})`}
          aria-label={`${social.name} ${social.handle}`}
          className={`group relative flex items-center justify-center rounded-xl shadow-md transition-all duration-200 hover:scale-110 active:scale-95 ${
            isMobile ? 'w-9 h-9 rounded-full' : 'w-10 h-10'
          } ${FLOAT_STYLES[social.id]}`}
        >
          <SocialSvg id={social.id} />
          {!isMobile && (
            <span className="pointer-events-none absolute right-full mr-2.5 px-2.5 py-1 rounded-lg bg-[#111827] text-white text-xs font-display font-semibold whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shadow-md">
              {social.name}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
