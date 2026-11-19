import { useEffect, useState } from 'react';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AliadosModal } from './components/AliadosModal';
import { AliadosStrip, AllyItem } from './components/AliadosStrip';
import { CintilloHeader } from './components/CintilloHeader';
import { ConocenosModal } from './components/ConocenosModal';
import { EventosModal } from './components/EventosModal';
import { FloatingSocials } from './components/FloatingSocials';
import { FooterCintillo } from './components/FooterCintillo';
import { HeroCarousel } from './components/HeroCarousel';
import { OrganigramaModal } from './components/OrganigramaModal';
import { QuickLinksPanel } from './components/QuickLinksPanel';
import { ReportModal } from './components/ReportModal';
import { SearchOverlay } from './components/SearchOverlay';
import { SocialsModal } from './components/SocialsModal';
import { StatsLoginModal } from './components/StatsLoginModal';
import { useCarouselStore } from './hooks/useCarouselStore';
import { useDeviceType } from './hooks/useDeviceType';
import { useEventsStore } from './hooks/useEventsStore';
import { usePortalStats } from './hooks/usePortalStats';
import { Language, TRANSLATIONS, TranslatedLink } from './i18n/translations';

export function App() {
  const deviceInfo = useDeviceType();
  const { stats, trackContentView } = usePortalStats();
  const { events, addEvent, deleteEvent } = useEventsStore();
  const { slides, addSlide, updateSlide, deleteSlide, resetSlides } = useCarouselStore();
  const [language, setLanguage] = useState<Language>('es');
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConocenosOpen, setIsConocenosOpen] = useState(false);
  const [isOrganigramaOpen, setIsOrganigramaOpen] = useState(false);
  const [isEventosOpen, setIsEventosOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [isStatsLoginOpen, setIsStatsLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [selectedAlly, setSelectedAlly] = useState<AllyItem | null>(null);

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
    setIsEventosOpen(false);
    setIsSocialsOpen(false);
    setIsStatsLoginOpen(false);
    setIsAdminPanelOpen(false);
    setSelectedAlly(null);
    setActiveSlide(0);
  };

  const handleOpenLink = (link: TranslatedLink) => {
    trackContentView(link.id);
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
        language={language}
        onToggleLanguage={setLanguage}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenConocenos={() => {
          trackContentView('conocenos');
          setIsConocenosOpen(true);
        }}
        onOpenOrganigrama={() => {
          trackContentView('organigrama');
          setIsOrganigramaOpen(true);
        }}
        onOpenEventos={() => {
          trackContentView('eventos');
          setIsEventosOpen(true);
        }}
        onGoHome={handleGoHome}
        t={t.header}
      />

      {/* Área Principal Sin Deslizamiento */}
      <main className="flex-1 min-h-0 w-full max-w-7xl mx-auto px-2.5 sm:px-5 lg:px-6 py-1.5 sm:py-2.5 flex flex-col gap-1.5 sm:gap-2.5">
        <div
          className={`flex-1 min-h-0 w-full grid gap-2 sm:gap-3 ${
            deviceInfo.device === 'desktop'
              ? 'grid-cols-12 grid-rows-1'
              : deviceInfo.device === 'tablet'
                ? 'grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)]'
                : 'grid-cols-1 grid-rows-[minmax(0,0.92fr)_minmax(0,1.08fr)]'
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
              slides={slides}
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

        {/* Segmento de Aliados del CENDIS (Entes del Ministerio de Cultura) */}
        <AliadosStrip language={language} onSelectAlly={setSelectedAlly} />
      </main>

      {/* Cintillo de Pie de Página: Ministerio del Poder Popular para la Cultura */}
      <FooterCintillo
        deviceInfo={deviceInfo}
        t={t.footer}
        deviceLabel={deviceLabel}
        onOpenStatsLogin={() => setIsStatsLoginOpen(true)}
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

      {/* Modal Eventos (Agenda Mensual) */}
      <EventosModal
        isOpen={isEventosOpen}
        onClose={() => setIsEventosOpen(false)}
        events={events}
        language={language}
      />

      {/* Modal Aliados del CENDIS */}
      <AliadosModal
        selectedAlly={selectedAlly}
        onClose={() => setSelectedAlly(null)}
        language={language}
      />

      {/* Login oculto en logo Ministerio de Cultura */}
      <StatsLoginModal
        isOpen={isStatsLoginOpen}
        onClose={() => setIsStatsLoginOpen(false)}
        onSuccess={() => {
          setIsStatsLoginOpen(false);
          setIsAdminPanelOpen(true);
        }}
        language={language}
      />

      {/* Panel Administrativo: Carrusel, Eventos y Estadísticas */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        language={language}
        deviceInfo={deviceInfo}
        stats={stats}
        statsLabels={t.modal}
        events={events}
        onAddEvent={addEvent}
        onDeleteEvent={deleteEvent}
        slides={slides}
        onAddSlide={addSlide}
        onUpdateSlide={updateSlide}
        onDeleteSlide={deleteSlide}
        onResetSlides={resetSlides}
      />

      {/* Modal adaptativo para enlaces */}
      <ReportModal
        activeLink={selectedLink}
        deviceInfo={deviceInfo}
        deviceLabel={deviceLabel}
        language={language}
        stats={stats}
        t={t.modal}
        onClose={() => setSelectedLinkId(null)}
      />
    </div>
  );
}

export default App;
