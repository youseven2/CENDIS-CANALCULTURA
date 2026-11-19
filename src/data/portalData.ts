export interface CarouselSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  accentColor: 'red' | 'blue' | 'yellow';
  tag: string;
  actionLabel: string;
  targetLinkId: string;
}

export interface PortalLink {
  id: string;
  title: string;
  description: string;
  category: 'canal' | 'cendis' | 'reportes' | 'institucional';
  accent: string;
  badge?: string;
  externalUrl?: string;
  modalType?: 'reports' | 'live' | 'catalog' | 'schedule' | 'about';
}

export interface SocialLink {
  id: 'instagram' | 'facebook' | 'tiktok';
  name: string;
  handle: string;
  url: string;
}

export interface ReportRow {
  id: string;
  area: 'CENDIS' | 'Canal Cultura' | 'Híbrido';
  indicador: string;
  periodo: string;
  valor: string;
  estado: 'Activo' | 'Publicado' | 'En Curso';
}

export const CAROUSEL_SLIDES: CarouselSlide[] = [
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
];

export const PORTAL_LINKS: PortalLink[] = [
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
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@cendis_ve',
    url: 'https://www.instagram.com/',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'CENDIS · Canal Cultura',
    url: 'https://www.facebook.com/',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@canalcultura.ve',
    url: 'https://www.tiktok.com/',
  },
];

export const INSTITUTIONAL_REPORTS: ReportRow[] = [
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
];
