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
import { StatsLoginModal } from './components/StatsLoginModal';
import { useDeviceType } from './hooks/useDeviceType';
import { usePortalStats } from './hooks/usePortalStats';
import { Language, TRANSLATIONS, TranslatedLink } from './i18n/translations';

export function App() {
  const deviceInfo = useDeviceType();
  const { stats, trackContentView } = usePortalStats();
  const [language, setLanguage] = useState<Language>('es');
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConocenosOpen, setIsConocenosOpen] = useState(false);
  const [isOrganigramaOpen, setIsOrganigramaOpen] = useState(false);
  const [isSocialsOpen, setIsSocialsOpen] = useState(false);
  const [isStatsLoginOpen, setIsStatsLoginOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const t = TRANSLATIONS[language];
  const deviceLabel = t.header.deviceLabels[deviceInfo.device];
  const statsLink: TranslatedLink = {
    id: 'estadisticas-admin',
    title: language === 'es' ? 'Estadísticas del Portal' : 'Portal Statistics',
    description:
      language === 'es'
        ? 'Tiempo de visualización, visitas, países y contenido más visto.'
        : 'Viewing time, total visits, countries, and most viewed content.',
    category: 'reportes',
    accent: '#B12722',
    modalType: 'reports',
  };
  const selectedLink = isStatsOpen
    ? statsLink
    : selectedLinkId !== null
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
    setIsStatsLoginOpen(false);
    setIsStatsOpen(false);
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

      {/* Login oculto para estadísticas en logo Ministerio de Cultura */}
      <StatsLoginModal
        isOpen={isStatsLoginOpen}
        onClose={() => setIsStatsLoginOpen(false)}
        onSuccess={() => {
          setIsStatsLoginOpen(false);
          setIsStatsOpen(true);
        }}
        language={language}
      />

      {/* Modal adaptativo para enlaces y estadísticas */}
      <ReportModal
        activeLink={selectedLink}
        deviceInfo={deviceInfo}
        deviceLabel={deviceLabel}
        language={language}
        stats={stats}
        t={t.modal}
        onClose={() => {
          setSelectedLinkId(null);
          setIsStatsOpen(false);
        }}
      />
    </div>
  );
}

export default App;
