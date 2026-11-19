import { useEffect, useState } from 'react';
import { CintilloHeader } from './components/CintilloHeader';
import { ConocenosModal } from './components/ConocenosModal';
import { FloatingSocials } from './components/FloatingSocials';
import { FooterCintillo } from './components/FooterCintillo';
import { HeroCarousel } from './components/HeroCarousel';
import { OrganigramaModal } from './components/OrganigramaModal';
import { QuickLinksPanel } from './components/QuickLinksPanel';
import { ReportModal } from './components/ReportModal';
import { SearchOverlay } from './components/SearchOverlay';
import { SocialsModal } from './components/SocialsModal';
import { useDeviceType } from './hooks/useDeviceType';
import { Language, TRANSLATIONS, TranslatedLink } from './i18n/translations';

export function App() {
  const deviceInfo = useDeviceType();
  const [language, setLanguage] = useState<Language>('es');
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConocenosOpen, setIsConocenosOpen] = useState(false);
  const [isOrganigramaOpen, setIsOrganigramaOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);

  const t = TRANSLATIONS[language];
  const deviceLabel = t.header.deviceLabels[deviceInfo.device];
  const selectedLink =
    selectedLinkId !== null
      ? t.linksPanel.links.find((l) => l.id === selectedLinkId) ?? null
      : null;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleGoHome = () => {
    setSelectedLinkId(null);
    setIsSearchOpen(false);
    setIsConocenosOpen(false);
    setIsOrganigramaOpen(false);
    setIsSocialsOpen(false);
    setActiveSlide(0);
  };

  const handleOpenLink = (link: TranslatedLink) => {
    if (link.externalUrl) {
      window.open(link.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setSelectedLinkId(link.id);
  };

  const handleSelectSlideAction = (targetLinkId: string) => {
    const found = t.linksPanel.links.find((l) => l.id === targetLinkId);
    if (found) {
      handleOpenLink(found);
    }
  };

  return (
    <div className="h-dvh w-full overflow-hidden flex flex-col bg-gradient-to-br from-[#CBD5E1] via-[#DCE2EA] to-[#B8C4D4]">
      {/* Cintillo Superior: Logos (al tocar vuelven al Home) + Buscar + Idioma + Home + Conócenos + Organigrama */}
      <CintilloHeader
        deviceInfo={deviceInfo}
        language={language}
        onToggleLanguage={setLanguage}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenConocenos={() => setIsConocenosOpen(true)}
        onOpenOrganigrama={() => setIsOrganigramaOpen(true)}
        onGoHome={handleGoHome}
        t={t.header}
      />

      {/* Área Principal Sin Deslizamiento */}
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
              t={t.carousel}
              activeIndex={activeSlide}
              onChangeIndex={setActiveSlide}
              onSelectSlideAction={handleSelectSlideAction}
              device={deviceInfo.device}
            />
          </div>

          {/* Enlaces Principales */}
          <div
            className={`min-h-0 ${
              deviceInfo.device === 'desktop' ? 'col-span-5 h-full' : 'h-full'
            }`}
          >
            <QuickLinksPanel
              t={t.linksPanel}
              onOpenLink={handleOpenLink}
              device={deviceInfo.device}
            />
          </div>
        </div>
      </main>

      {/* Cintillo de Pie de Página: Ministerio del Poder Popular para la Cultura */}
      <FooterCintillo
        deviceInfo={deviceInfo}
        t={t.footer}
        deviceLabel={deviceLabel}
        onGoHome={handleGoHome}
      />

      {/* Botón Flotante Vertical de Redes Sociales */}
      <FloatingSocials
        device={deviceInfo.device}
        language={language}
        onOpenSocials={() => setIsSocialsOpen(true)}
      />

      {/* Ventana de Redes Sociales: Canal Cultura y CENDIS */}
      <SocialsModal
        isOpen={isSocialsOpen}
        onClose={() => setIsSocialsOpen(false)}
        language={language}
      />

      {/* Buscador dentro de la misma página */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        t={t}
        onSelectSlide={(idx) => setActiveSlide(idx)}
        onSelectLink={handleOpenLink}
      />

      {/* Modal Conócenos */}
      <ConocenosModal
        isOpen={isConocenosOpen}
        onClose={() => setIsConocenosOpen(false)}
        language={language}
      />

      {/* Modal Organigrama (Gráfico y Textual) */}
      <OrganigramaModal
        isOpen={isOrganigramaOpen}
        onClose={() => setIsOrganigramaOpen(false)}
        language={language}
        device={deviceInfo.device}
      />

      {/* Modal adaptativo para enlaces y reportes */}
      <ReportModal
        activeLink={selectedLink}
        deviceInfo={deviceInfo}
        deviceLabel={deviceLabel}
        t={t.modal}
        onClose={() => setSelectedLinkId(null)}
      />
    </div>
  );
}

export default App;
