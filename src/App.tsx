import { useState } from 'react';
import { CintilloHeader } from './components/CintilloHeader';
import { HeroCarousel } from './components/HeroCarousel';
import { QuickLinksPanel } from './components/QuickLinksPanel';
import { ReportModal } from './components/ReportModal';
import {
  CAROUSEL_SLIDES,
  PORTAL_LINKS,
  PortalLink,
  SOCIAL_LINKS,
} from './data/portalData';
import { useDeviceType } from './hooks/useDeviceType';

export function App() {
  const deviceInfo = useDeviceType();
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedLink, setSelectedLink] = useState<PortalLink | null>(null);

  const handleGoHome = () => {
    setSelectedLink(null);
    setActiveSlide(0);
  };

  const handleOpenLink = (link: PortalLink) => {
    if (link.externalUrl) {
      window.open(link.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedLink(link);
  };

  const handleSelectSlideAction = (targetLinkId: string) => {
    const found = PORTAL_LINKS.find((l) => l.id === targetLinkId);
    if (found) {
      handleOpenLink(found);
    }
  };

  return (
    <div className="h-dvh w-full overflow-hidden flex flex-col bg-[#F8F9FB]">
      {/* Cintillo Superior: Solo Home + Logos + Indicador de dispositivo */}
      <CintilloHeader deviceInfo={deviceInfo} onGoHome={handleGoHome} />

      {/* Área Principal Sin Deslizamiento (Single-Screen Responsive) */}
      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 py-2.5 sm:py-4">
        <div
          className={`h-full w-full grid gap-2.5 sm:gap-4 ${
            deviceInfo.device === 'desktop'
              ? 'grid-cols-12 grid-rows-1'
              : deviceInfo.device === 'tablet'
                ? 'grid-cols-1 grid-rows-[1.05fr_1fr]'
                : 'grid-cols-1 grid-rows-[0.95fr_1.15fr]'
          }`}
        >
          {/* Carrusel Principal */}
          <div
            className={`min-h-0 ${
              deviceInfo.device === 'desktop' ? 'col-span-7 h-full' : 'h-full'
            }`}
          >
            <HeroCarousel
              slides={CAROUSEL_SLIDES}
              activeIndex={activeSlide}
              onChangeIndex={setActiveSlide}
              onSelectSlideAction={handleSelectSlideAction}
              device={deviceInfo.device}
            />
          </div>

          {/* Enlaces Principales + Redes Sociales */}
          <div
            className={`min-h-0 ${
              deviceInfo.device === 'desktop' ? 'col-span-5 h-full' : 'h-full'
            }`}
          >
            <QuickLinksPanel
              links={PORTAL_LINKS}
              socials={SOCIAL_LINKS}
              onOpenLink={handleOpenLink}
              device={deviceInfo.device}
            />
          </div>
        </div>
      </main>

      {/* Pie institucional compacto */}
      <footer className="shrink-0 w-full bg-white border-t border-gray-200/80 px-3 sm:px-6 py-1.5 sm:py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
          <span className="truncate font-medium">
            © {new Date().getFullYear()} CENDIS · Canal Cultura — Ministerio del Poder Popular para la Cultura
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-[#153684]">
            <span className="w-2 h-2 rounded-full bg-[#C81D25]" />
            Adaptado automáticamente a {deviceInfo.label}
          </span>
        </div>
      </footer>

      {/* Modal adaptativo para enlaces y reportes */}
      <ReportModal
        activeLink={selectedLink}
        deviceInfo={deviceInfo}
        onClose={() => setSelectedLink(null)}
      />
    </div>
  );
}

export default App;
