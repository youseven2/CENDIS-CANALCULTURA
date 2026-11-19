export type Language = 'es' | 'en';

export interface TranslatedSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  accentColor: 'red' | 'blue' | 'yellow';
  tag: string;
  actionLabel: string;
  targetLinkId: string;
}

export interface TranslatedLink {
  id: string;
  title: string;
  description: string;
  category: 'canal' | 'cendis' | 'reportes' | 'institucional';
  accent: string;
  badge?: string;
  externalUrl?: string;
  modalType?: 'reports' | 'live' | 'catalog' | 'schedule' | 'about';
}

export interface TranslatedReportRow {
  id: string;
  area: string;
  indicador: string;
  periodo: string;
  valor: string;
  estado: string;
}

export interface TranslationBundle {
  header: {
    ministryShort: string;
    home: string;
    searchPlaceholder: string;
    searchButtonTitle: string;
    languageLabel: string;
    deviceLabels: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };
  carousel: {
    ariaLabel: string;
    prevSlide: string;
    nextSlide: string;
    slides: TranslatedSlide[];
  };
  linksPanel: {
    title: string;
    subtitle: string;
    portalBadge: string;
    links: TranslatedLink[];
  };
  socials: {
    ariaLabel: string;
  };
  search: {
    title: string;
    placeholder: string;
    noResults: string;
    typeSlide: string;
    typeLink: string;
    typeReport: string;
    close: string;
  };
  modal: {
    adaptedTo: string;
    close: string;
    summaryWorks: string;
    summaryHours: string;
    summaryCoverage: string;
    coverageValue: string;
    tableHeaders: {
      code: string;
      area: string;
      indicator: string;
      period: string;
      result: string;
      status: string;
    };
    moduleReadyTitle: string;
    moduleReadyBody: string;
    reports: TranslatedReportRow[];
  };
  footer: {
    ministryName: string;
    subtitle: string;
    rights: string;
    adaptedBadge: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationBundle> = {
  es: {
    header: {
      ministryShort: 'Ministerio del Poder Popular para la Cultura',
      home: 'Home',
      searchPlaceholder: 'Buscar en la página...',
      searchButtonTitle: 'Buscar dentro de la página',
      languageLabel: 'Idioma',
      deviceLabels: {
        mobile: 'Celular',
        tablet: 'Tablet',
        desktop: 'Computadora',
      },
    },
    carousel: {
      ariaLabel: 'Carrusel principal CENDIS y Canal Cultura',
      prevSlide: 'Diapositiva anterior',
      nextSlide: 'Siguiente diapositiva',
      slides: [
        {
          id: 'slide-hibrido',
          badge: 'Plataforma Híbrida Oficial',
          title: 'CENDIS · Canal Cultura Venezuela',
          subtitle:
            'Unimos la memoria sonora y discográfica del Centro Nacional del Disco con la señal audiovisual de Canal Cultura.',
          accentColor: 'red',
          tag: 'Ministerio del Poder Popular para la Cultura',
          actionLabel: 'Ver Señal y Enlaces',
          targetLinkId: 'canal-envivo',
        },
        {
          id: 'slide-cendis',
          badge: 'Centro Nacional del Disco',
          title: 'Patrimonio Sonoro y Talento Nacional',
          subtitle:
            'Producción, preservación y difusión de la música venezolana en formatos físicos y digitales para todo el país.',
          accentColor: 'yellow',
          tag: 'Producción Discográfica',
          actionLabel: 'Explorar Catálogo',
          targetLinkId: 'cendis-catalogo',
        },
        {
          id: 'slide-canal',
          badge: 'Canal Cultura en Línea',
          title: 'Nuestra Cultura en Pantalla y Sin Límites',
          subtitle:
            'Programación cultural, documentales, conciertos y festivales transmitidos en vivo con identidad venezolana.',
          accentColor: 'blue',
          tag: 'Señal Audiovisual',
          actionLabel: 'Ver Programación',
          targetLinkId: 'canal-programacion',
        },
        {
          id: 'slide-reportes',
          badge: 'Transparencia y Gestión',
          title: 'Reportes e Indicadores Institucionales',
          subtitle:
            'Consulta los avances de producción, transmisiones y alcance cultural adaptados automáticamente a tu pantalla.',
          accentColor: 'red',
          tag: 'Gestión Pública',
          actionLabel: 'Abrir Reportes',
          targetLinkId: 'reportes-gestion',
        },
      ],
    },
    linksPanel: {
      title: 'Accesos Directos',
      subtitle: 'CENDIS · Canal Cultura',
      portalBadge: 'Portal Único',
      links: [
        {
          id: 'canal-envivo',
          title: 'Señal en Vivo · Canal Cultura',
          description: 'Transmisión audiovisual continua y eventos especiales.',
          category: 'canal',
          accent: '#153684',
          badge: 'EN VIVO',
          modalType: 'live',
        },
        {
          id: 'cendis-catalogo',
          title: 'Catálogo Sonoro CENDIS',
          description: 'Fonoteca digital, producciones y grabaciones nacionales.',
          category: 'cendis',
          accent: '#B12722',
          badge: 'MÚSICA',
          modalType: 'catalog',
        },
        {
          id: 'canal-programacion',
          title: 'Parrilla y Programación',
          description: 'Horarios culturales, ciclos de cine y conciertos.',
          category: 'canal',
          accent: '#F9C80E',
          modalType: 'schedule',
        },
        {
          id: 'reportes-gestion',
          title: 'Reportes Institucionales',
          description: 'Métricas de gestión CENDIS + Canal Cultura por pantalla.',
          category: 'reportes',
          accent: '#C81D25',
          badge: 'REPORTES',
          modalType: 'reports',
        },
        {
          id: 'ministerio-cultura',
          title: 'Portal Ministerio de Cultura',
          description: 'Información institucional, entes adscritos y convocatorias.',
          category: 'institucional',
          accent: '#153684',
          modalType: 'about',
        },
      ],
    },
    socials: {
      ariaLabel: 'Botones flotantes de redes sociales',
    },
    search: {
      title: 'Buscar en el portal',
      placeholder: 'Escribe palabras clave (ej. reportes, catálogo, en vivo, cultura)...',
      noResults: 'No se encontraron coincidencias en esta página.',
      typeSlide: 'Carrusel',
      typeLink: 'Enlace',
      typeReport: 'Reporte',
      close: 'Cerrar búsqueda',
    },
    modal: {
      adaptedTo: 'Vista adaptada a',
      close: 'Cerrar ventana',
      summaryWorks: 'Obras CENDIS',
      summaryHours: 'Horas Canal Cultura',
      summaryCoverage: 'Cobertura Nacional',
      coverageValue: '24 Estados',
      tableHeaders: {
        code: 'Código',
        area: 'Ente / Área',
        indicator: 'Indicador',
        period: 'Periodo',
        result: 'Resultado',
        status: 'Estado',
      },
      moduleReadyTitle: 'Módulo listo para enlazar:',
      moduleReadyBody:
        'Puedes conectar este acceso directo a tu URL oficial de transmisión, catálogo discográfico o sistema interno en',
      reports: [
        {
          id: 'RPT-001',
          area: 'CENDIS',
          indicador: 'Producciones Discográficas Digitalizadas',
          periodo: 'Trimestre Actual',
          valor: '148 obras',
          estado: 'Publicado',
        },
        {
          id: 'RPT-002',
          area: 'Canal Cultura',
          indicador: 'Horas de Programación Cultural Emitidas',
          periodo: 'Trimestre Actual',
          valor: '1,920 hrs',
          estado: 'Activo',
        },
        {
          id: 'RPT-003',
          area: 'Híbrido',
          indicador: 'Conciertos y Sesiones Grabadas en Vivo',
          periodo: 'Acumulado Anual',
          valor: '42 eventos',
          estado: 'Publicado',
        },
        {
          id: 'RPT-004',
          area: 'CENDIS',
          indicador: 'Artistas y Cultores Registrados',
          periodo: 'Acumulado Anual',
          valor: '315 cultores',
          estado: 'En Curso',
        },
        {
          id: 'RPT-005',
          area: 'Canal Cultura',
          indicador: 'Cobertura Regional de Festivales',
          periodo: 'Nacional',
          valor: '24 estados',
          estado: 'Activo',
        },
      ],
    },
    footer: {
      ministryName: 'Ministerio del Poder Popular para la Cultura',
      subtitle: 'Ente Adscrito: Centro Nacional del Disco (CENDIS) · Canal Cultura Venezuela',
      rights: 'Gobierno Bolivariano de Venezuela · Todos los derechos reservados',
      adaptedBadge: 'Pantalla:',
    },
  },
  en: {
    header: {
      ministryShort: "Ministry of People's Power for Culture",
      home: 'Home',
      searchPlaceholder: 'Search within page...',
      searchButtonTitle: 'Search within this page',
      languageLabel: 'Language',
      deviceLabels: {
        mobile: 'Mobile',
        tablet: 'Tablet',
        desktop: 'Desktop',
      },
    },
    carousel: {
      ariaLabel: 'Main CENDIS and Canal Cultura carousel',
      prevSlide: 'Previous slide',
      nextSlide: 'Next slide',
      slides: [
        {
          id: 'slide-hibrido',
          badge: 'Official Hybrid Platform',
          title: 'CENDIS · Canal Cultura Venezuela',
          subtitle:
            'Uniting the sound and discographic heritage of the National Disc Center with the audiovisual broadcast of Canal Cultura.',
          accentColor: 'red',
          tag: "Ministry of People's Power for Culture",
          actionLabel: 'Watch Live & Links',
          targetLinkId: 'canal-envivo',
        },
        {
          id: 'slide-cendis',
          badge: 'National Disc Center',
          title: 'Sound Heritage & National Talent',
          subtitle:
            'Production, preservation, and dissemination of Venezuelan music in physical and digital formats nationwide.',
          accentColor: 'yellow',
          tag: 'Music Production',
          actionLabel: 'Explore Catalog',
          targetLinkId: 'cendis-catalogo',
        },
        {
          id: 'slide-canal',
          badge: 'Canal Cultura Online',
          title: 'Our Culture On Screen Without Limits',
          subtitle:
            'Cultural programming, documentaries, concerts, and festivals streamed live with Venezuelan identity.',
          accentColor: 'blue',
          tag: 'Audiovisual Signal',
          actionLabel: 'View Schedule',
          targetLinkId: 'canal-programacion',
        },
        {
          id: 'slide-reportes',
          badge: 'Transparency & Management',
          title: 'Institutional Reports & Metrics',
          subtitle:
            'Review production progress, broadcasts, and cultural reach automatically adapted to your screen.',
          accentColor: 'red',
          tag: 'Public Management',
          actionLabel: 'Open Reports',
          targetLinkId: 'reportes-gestion',
        },
      ],
    },
    linksPanel: {
      title: 'Quick Links',
      subtitle: 'CENDIS · Canal Cultura',
      portalBadge: 'Single Portal',
      links: [
        {
          id: 'canal-envivo',
          title: 'Live Broadcast · Canal Cultura',
          description: 'Continuous audiovisual stream and special cultural events.',
          category: 'canal',
          accent: '#153684',
          badge: 'LIVE',
          modalType: 'live',
        },
        {
          id: 'cendis-catalogo',
          title: 'CENDIS Sound Catalog',
          description: 'Digital sound archive, productions, and national recordings.',
          category: 'cendis',
          accent: '#B12722',
          badge: 'MUSIC',
          modalType: 'catalog',
        },
        {
          id: 'canal-programacion',
          title: 'Schedule & Programming',
          description: 'Cultural timetables, film series, and live concerts.',
          category: 'canal',
          accent: '#F9C80E',
          modalType: 'schedule',
        },
        {
          id: 'reportes-gestion',
          title: 'Institutional Reports',
          description: 'CENDIS + Canal Cultura management metrics by device.',
          category: 'reportes',
          accent: '#C81D25',
          badge: 'REPORTS',
          modalType: 'reports',
        },
        {
          id: 'ministerio-cultura',
          title: 'Ministry of Culture Portal',
          description: 'Institutional information, affiliated agencies, and open calls.',
          category: 'institucional',
          accent: '#153684',
          modalType: 'about',
        },
      ],
    },
    socials: {
      ariaLabel: 'Floating social media buttons',
    },
    search: {
      title: 'Search on this portal',
      placeholder: 'Type keywords (e.g. reports, catalog, live, culture)...',
      noResults: 'No matching results found on this page.',
      typeSlide: 'Carousel',
      typeLink: 'Link',
      typeReport: 'Report',
      close: 'Close search',
    },
    modal: {
      adaptedTo: 'View adapted to',
      close: 'Close window',
      summaryWorks: 'CENDIS Works',
      summaryHours: 'Canal Cultura Hours',
      summaryCoverage: 'National Reach',
      coverageValue: '24 States',
      tableHeaders: {
        code: 'Code',
        area: 'Agency / Area',
        indicator: 'Indicator',
        period: 'Period',
        result: 'Result',
        status: 'Status',
      },
      moduleReadyTitle: 'Module ready to link:',
      moduleReadyBody:
        'You can connect this shortcut to your official stream URL, music catalog, or internal system in',
      reports: [
        {
          id: 'RPT-001',
          area: 'CENDIS',
          indicador: 'Digitized Discographic Productions',
          periodo: 'Current Quarter',
          valor: '148 works',
          estado: 'Published',
        },
        {
          id: 'RPT-002',
          area: 'Canal Cultura',
          indicador: 'Cultural Programming Hours Broadcast',
          periodo: 'Current Quarter',
          valor: '1,920 hrs',
          estado: 'Active',
        },
        {
          id: 'RPT-003',
          area: 'Hybrid',
          indicador: 'Live Recorded Concerts & Sessions',
          periodo: 'Annual Total',
          valor: '42 events',
          estado: 'Published',
        },
        {
          id: 'RPT-004',
          area: 'CENDIS',
          indicador: 'Registered Artists & Cultural Creators',
          periodo: 'Annual Total',
          valor: '315 artists',
          estado: 'In Progress',
        },
        {
          id: 'RPT-005',
          area: 'Canal Cultura',
          indicador: 'Regional Festival Coverage',
          periodo: 'Nationwide',
          valor: '24 states',
          estado: 'Active',
        },
      ],
    },
    footer: {
      ministryName: "Ministry of People's Power for Culture",
      subtitle: 'Affiliated Agency: National Disc Center (CENDIS) · Canal Cultura Venezuela',
      rights: 'Bolivarian Government of Venezuela · All rights reserved',
      adaptedBadge: 'Screen:',
    },
  },
};
