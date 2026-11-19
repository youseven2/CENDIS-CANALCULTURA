import { useState } from 'react';
import {
  BarChart3,
  CalendarPlus,
  Edit3,
  FileDown,
  Image as ImageIcon,
  Lock,
  RotateCcw,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { ManagedSlide } from '../hooks/useCarouselStore';
import { CulturalEvent } from '../hooks/useEventsStore';
import { DeviceInfo } from '../hooks/useDeviceType';
import { PortalStatsState, formatDuration } from '../hooks/usePortalStats';
import { Language, TranslationBundle } from '../i18n/translations';
import { exportStatsToPdf } from '../utils/exportStatsPdf';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  deviceInfo: DeviceInfo;
  stats: PortalStatsState;
  statsLabels: TranslationBundle['modal'];
  events: CulturalEvent[];
  onAddEvent: (evt: Omit<CulturalEvent, 'id' | 'createdAt'>) => void;
  onDeleteEvent: (id: string) => void;
  slides: ManagedSlide[];
  onAddSlide: (slide: Omit<ManagedSlide, 'id'>) => void;
  onUpdateSlide: (id: string, slide: Omit<ManagedSlide, 'id'>) => void;
  onDeleteSlide: (id: string) => void;
  onResetSlides: () => void;
}

export function AdminPanelModal({
  isOpen,
  onClose,
  language,
  stats,
  statsLabels,
  events,
  onAddEvent,
  onDeleteEvent,
  slides,
  onAddSlide,
  onUpdateSlide,
  onDeleteSlide,
  onResetSlides,
}: AdminPanelModalProps) {
  const [activeTab, setActiveTab] = useState<'events' | 'carousel' | 'stats'>('carousel');

  // Eventos form state
  const [entity, setEntity] = useState<CulturalEvent['entity']>('CENDIS');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | undefined>();
  const [attachmentType, setAttachmentType] = useState<'image' | 'pdf' | undefined>();
  const [attachmentDataUrl, setAttachmentDataUrl] = useState<string | undefined>();
  const [savedMsg, setSavedMsg] = useState('');

  // Carrusel form state
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [slideBadge, setSlideBadge] = useState('Noticia Cultural');
  const [slideTitle, setSlideTitle] = useState('');
  const [slideSubtitle, setSlideSubtitle] = useState('');
  const [slideTag, setSlideTag] = useState('CENDIS · Canal Cultura');
  const [slideAccent, setSlideAccent] = useState<ManagedSlide['accentColor']>('blue');
  const [slideActionLabel, setSlideActionLabel] = useState('Ver Más');
  const [slideTargetLinkId, setSlideTargetLinkId] = useState('canal-envivo');
  const [slideImageDataUrl, setSlideImageDataUrl] = useState<string | undefined>();
  const [slideSavedMsg, setSlideSavedMsg] = useState('');

  if (!isOpen) return null;

  const isEs = language === 'es';
  const maxContentViews = stats.topContent[0]?.views || 1;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setAttachmentName(undefined);
      setAttachmentType(undefined);
      setAttachmentDataUrl(undefined);
      return;
    }

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const reader = new FileReader();
    reader.onload = () => {
      setAttachmentName(file.name);
      setAttachmentType(isPdf ? 'pdf' : 'image');
      setAttachmentDataUrl(typeof reader.result === 'string' ? reader.result : undefined);
    };
    reader.readAsDataURL(file);
  };

  const handleSlideImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSlideImageDataUrl(typeof reader.result === 'string' ? reader.result : undefined);
    };
    reader.readAsDataURL(file);
  };

  const resetSlideForm = () => {
    setEditingSlideId(null);
    setSlideBadge('Noticia Cultural');
    setSlideTitle('');
    setSlideSubtitle('');
    setSlideTag('CENDIS · Canal Cultura');
    setSlideAccent('blue');
    setSlideActionLabel('Ver Más');
    setSlideTargetLinkId('canal-envivo');
    setSlideImageDataUrl(undefined);
  };

  const handleEditSlide = (slide: ManagedSlide) => {
    setEditingSlideId(slide.id);
    setSlideBadge(slide.badge);
    setSlideTitle(slide.title);
    setSlideSubtitle(slide.subtitle);
    setSlideTag(slide.tag);
    setSlideAccent(slide.accentColor);
    setSlideActionLabel(slide.actionLabel);
    setSlideTargetLinkId(slide.targetLinkId);
    setSlideImageDataUrl(slide.imageDataUrl);
  };

  const handleSlideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Omit<ManagedSlide, 'id'> = {
      badge: slideBadge.trim() || 'Noticia Cultural',
      title: slideTitle.trim(),
      subtitle: slideSubtitle.trim(),
      tag: slideTag.trim() || 'CENDIS · Canal Cultura',
      accentColor: slideAccent,
      actionLabel: slideActionLabel.trim() || 'Ver Más',
      targetLinkId: slideTargetLinkId,
      imageDataUrl: slideImageDataUrl,
    };

    if (editingSlideId) {
      onUpdateSlide(editingSlideId, payload);
      setSlideSavedMsg(isEs ? 'Diapositiva actualizada.' : 'Slide updated.');
    } else {
      onAddSlide(payload);
      setSlideSavedMsg(isEs ? 'Noticia agregada al carrusel.' : 'Slide added to carousel.');
    }
    resetSlideForm();
    window.setTimeout(() => setSlideSavedMsg(''), 3000);
  };

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent({
      entity,
      title: title.trim(),
      date,
      time,
      place: place.trim(),
      address: address.trim(),
      description: description.trim(),
      attachmentName,
      attachmentType,
      attachmentDataUrl,
    });
    setTitle('');
    setDate('');
    setTime('');
    setPlace('');
    setAddress('');
    setDescription('');
    setAttachmentName(undefined);
    setAttachmentType(undefined);
    setAttachmentDataUrl(undefined);
    setSavedMsg(isEs ? 'Evento guardado en el calendario.' : 'Event saved to calendar.');
    window.setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-panel-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-[#0F172A]/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[92dvh] bg-[#E2E8F0] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#94A3B8]/70 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-4 sm:px-6 py-3.5 border-b border-[#94A3B8]/50 bg-[#CBD5E1]/90">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#153684] text-[#F9C80E] flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3
                id="admin-panel-title"
                className="font-display font-bold text-sm sm:text-lg text-[#0F172A] truncate"
              >
                {isEs
                  ? 'Panel Administrativo · Ministerio de Cultura'
                  : 'Admin Panel · Ministry of Culture'}
              </h3>
              <p className="text-[11px] text-[#334155] truncate">
                {isEs
                  ? 'Gestión de Carrusel, Eventos y Estadísticas'
                  : 'Carousel, Events & Statistics Management'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2">
            <div className="inline-flex rounded-xl bg-[#E2E8F0] p-0.5 border border-[#94A3B8]/70">
              <button
                type="button"
                onClick={() => setActiveTab('carousel')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-display font-bold transition-all ${
                  activeTab === 'carousel'
                    ? 'bg-[#153684] text-white shadow-sm'
                    : 'text-[#334155] hover:text-[#0F172A]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{isEs ? 'Carrusel' : 'Carousel'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('events')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-display font-bold transition-all ${
                  activeTab === 'events'
                    ? 'bg-[#153684] text-white shadow-sm'
                    : 'text-[#334155] hover:text-[#0F172A]'
                }`}
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>{isEs ? 'Eventos' : 'Events'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('stats')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-display font-bold transition-all ${
                  activeTab === 'stats'
                    ? 'bg-[#153684] text-white shadow-sm'
                    : 'text-[#334155] hover:text-[#0F172A]'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>{isEs ? 'Estadísticas' : 'Statistics'}</span>
              </button>
            </div>

            {activeTab === 'stats' && (
              <button
                type="button"
                onClick={() => exportStatsToPdf(stats, language)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#B12722] hover:bg-[#8E161B] text-white font-display font-bold text-xs shadow-sm transition-all"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>{isEs ? 'Reporte PDF' : 'Export PDF'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label={isEs ? 'Cerrar' : 'Close'}
              className="p-2 rounded-xl bg-[#E2E8F0] border border-[#94A3B8]/60 text-[#334155] hover:text-[#153684] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scroll flex-1">
          {activeTab === 'carousel' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Formulario de Noticia / Imagen del Carrusel */}
              <form
                onSubmit={handleSlideSubmit}
                className="lg:col-span-6 rounded-2xl bg-[#F1F5F9]/90 border border-[#94A3B8]/60 p-4 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-sm sm:text-base text-[#153684]">
                    {editingSlideId
                      ? isEs
                        ? 'Modificar Noticia del Carrusel'
                        : 'Edit Carousel Slide'
                      : isEs
                        ? 'Agregar Noticia / Imagen al Carrusel'
                        : 'Add News / Image to Carousel'}
                  </h4>
                  {editingSlideId && (
                    <button
                      type="button"
                      onClick={resetSlideForm}
                      className="text-xs font-bold text-[#B12722] hover:underline"
                    >
                      {isEs ? 'Cancelar edición' : 'Cancel'}
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#334155] mb-1">
                    {isEs ? 'Título de la Noticia' : 'News Title'}
                  </label>
                  <input
                    type="text"
                    required
                    value={slideTitle}
                    onChange={(e) => setSlideTitle(e.target.value)}
                    placeholder={isEs ? 'Ej. Gran Festival Cultural...' : 'E.g. Cultural Festival...'}
                    className="w-full rounded-xl bg-white border border-[#94A3B8]/70 px-3 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#153684]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#334155] mb-1">
                    {isEs ? 'Descripción / Resumen' : 'Description / Summary'}
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={slideSubtitle}
                    onChange={(e) => setSlideSubtitle(e.target.value)}
                    placeholder={isEs ? 'Texto breve de la noticia...' : 'Brief news summary...'}
                    className="w-full rounded-xl bg-white border border-[#94A3B8]/70 px-3 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#153684]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      {isEs ? 'Etiqueta Superior' : 'Badge'}
                    </label>
                    <input
                      type="text"
                      value={slideBadge}
                      onChange={(e) => setSlideBadge(e.target.value)}
                      className="w-full rounded-xl bg-white border border-[#94A3B8]/70 px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#153684]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      {isEs ? 'Color de Fondo' : 'Theme Color'}
                    </label>
                    <select
                      value={slideAccent}
                      onChange={(e) =>
                        setSlideAccent(e.target.value as ManagedSlide['accentColor'])
                      }
                      className="w-full rounded-xl bg-white border border-[#94A3B8]/70 px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#153684]"
                    >
                      <option value="blue">{isEs ? 'Azul Institucional' : 'Institutional Blue'}</option>
                      <option value="red">{isEs ? 'Pizarra / Azul' : 'Slate / Blue'}</option>
                      <option value="yellow">{isEs ? 'Plateado Claro' : 'Light Silver'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      {isEs ? 'Texto del Botón' : 'Button Label'}
                    </label>
                    <input
                      type="text"
                      value={slideActionLabel}
                      onChange={(e) => setSlideActionLabel(e.target.value)}
                      className="w-full rounded-xl bg-white border border-[#94A3B8]/70 px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#153684]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      {isEs ? 'Enlace Destino' : 'Target Shortcut'}
                    </label>
                    <select
                      value={slideTargetLinkId}
                      onChange={(e) => setSlideTargetLinkId(e.target.value)}
                      className="w-full rounded-xl bg-white border border-[#94A3B8]/70 px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:border-[#153684]"
                    >
                      <option value="canal-envivo">Señal en Vivo</option>
                      <option value="cendis-catalogo">Catálogo</option>
                      <option value="conciertos">Conciertos</option>
                      <option value="podcast">Podcast</option>
                      <option value="noticias">Noticias</option>
                      <option value="canal-programacion">Parrilla</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#334155] mb-1">
                    {isEs ? 'Imagen o Foto del Carrusel (Opcional)' : 'Carousel Photo (Optional)'}
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-dashed border-[#94A3B8] cursor-pointer hover:border-[#153684] text-xs text-[#334155]">
                      <Upload className="w-4 h-4 text-[#153684] shrink-0" />
                      <span className="truncate">
                        {slideImageDataUrl
                          ? isEs
                            ? 'Foto cargada (clic para cambiar)'
                            : 'Photo loaded (click to change)'
                          : isEs
                            ? 'Subir JPG o PNG...'
                            : 'Upload JPG or PNG...'}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSlideImageChange}
                        className="hidden"
                      />
                    </label>
                    {slideImageDataUrl && (
                      <button
                        type="button"
                        onClick={() => setSlideImageDataUrl(undefined)}
                        className="px-2.5 py-2 rounded-xl bg-[#B12722]/10 text-[#B12722] text-xs font-bold"
                      >
                        {isEs ? 'Quitar' : 'Clear'}
                      </button>
                    )}
                  </div>
                  {slideImageDataUrl && (
                    <img
                      src={slideImageDataUrl}
                      alt="Vista previa"
                      className="mt-2 h-24 w-full object-cover rounded-xl border border-[#94A3B8]/60"
                    />
                  )}
                </div>

                {slideSavedMsg && (
                  <p className="text-xs font-bold text-[#0F766E] bg-[#0F766E]/10 px-3 py-2 rounded-xl">
                    {slideSavedMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#153684] hover:bg-[#0F2761] text-white font-display font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  {editingSlideId
                    ? isEs
                      ? 'Actualizar Diapositiva'
                      : 'Update Slide'
                    : isEs
                      ? 'Agregar al Carrusel'
                      : 'Add to Carousel'}
                </button>
              </form>

              {/* Lista de Diapositivas Predeterminadas y Personalizadas */}
              <div className="lg:col-span-6 rounded-2xl bg-[#F1F5F9]/90 border border-[#94A3B8]/60 p-4 space-y-2.5 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display font-bold text-sm sm:text-base text-[#0F172A]">
                    {isEs
                      ? `Diapositivas Activas (${slides.length})`
                      : `Active Slides (${slides.length})`}
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      resetSlideForm();
                      onResetSlides();
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#153684] hover:underline"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{isEs ? 'Restaurar' : 'Reset'}</span>
                  </button>
                </div>

                {slides.length === 0 ? (
                  <p className="text-xs text-[#64748B] py-8 text-center">
                    {isEs
                      ? 'No hay diapositivas activas en el carrusel.'
                      : 'No active slides in the carousel.'}
                  </p>
                ) : (
                  <div className="space-y-2 max-h-[50dvh] overflow-y-auto custom-scroll pr-1">
                    {slides.map((s, idx) => (
                      <div
                        key={s.id}
                        className="p-2.5 rounded-xl bg-white border border-[#94A3B8]/50 flex items-center justify-between gap-2.5"
                      >
                        {s.imageDataUrl && (
                          <img
                            src={s.imageDataUrl}
                            alt={s.title}
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-200"
                          />
                        )}
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-[#153684] uppercase">
                            #{idx + 1} · {s.badge}
                          </span>
                          <p className="font-display font-bold text-xs text-[#0F172A] truncate">
                            {s.title}
                          </p>
                          <p className="text-[10px] text-[#475569] truncate">{s.subtitle}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleEditSlide(s)}
                            title={isEs ? 'Modificar' : 'Edit'}
                            className="p-1.5 rounded-lg text-[#153684] hover:bg-[#153684]/10"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteSlide(s.id)}
                            title={isEs ? 'Eliminar' : 'Delete'}
                            className="p-1.5 rounded-lg text-[#B12722] hover:bg-[#B12722]/10"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'events' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Formulario de Nuevo Evento */}
              <form
                onSubmit={handleSubmitEvent}
                className="lg:col-span-7 rounded-2xl bg-[#F1F5F9]/90 border border-[#94A3B8]/60 p-4 space-y-3 shadow-sm"
              >
                <h4 className="font-display font-bold text-sm sm:text-base text-[#153684]">
                  {isEs ? 'Registrar Evento en Agenda' : 'Register Calendar Event'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      {isEs ? 'Ente' : 'Agency'}
                    </label>
                    <select
                      value={entity}
                      onChange={(e) => setEntity(e.target.value as CulturalEvent['entity'])}
                      className="w-full rounded-xl bg-white border border-[#94A3B8]/70 px-3 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#153684]"
                    >
                      <option value="CENDIS">CENDIS</option>
                      <option value="Canal Cultura">Canal Cultura</option>
                      <option value="CENDIS · Canal Cultura">CENDIS · Canal Cultura</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      {isEs ? 'Título del Evento' : 'Event Title'}
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={isEs ? 'Ej. Concierto Gala Sonora' : 'E.g. Sound Gala Concert'}
                      className="w-full rounded-xl bg-white border border-[#94A3B8]/70 px-3 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#153684]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      {isEs ? 'Fecha' : 'Date'}
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl bg-white border border-[#94A3B8]/70 px-3 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#153684]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      {isEs ? 'Hora' : 'Time'}
                    </label>
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full rounded-xl bg-white border border-[#94A3B8]/70 px-3 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#153684]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      {isEs ? 'Lugar' : 'Place'}
                    </label>
                    <input
                      type="text"
                      required
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      placeholder={isEs ? 'Ej. Teatro Nacional' : 'E.g. National Theater'}
                      className="w-full rounded-xl bg-white border border-[#94A3B8]/70 px-3 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#153684]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#334155] mb-1">
                      {isEs ? 'Dirección' : 'Address'}
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={isEs ? 'Av. Lecuna, Caracas' : 'Main St, Caracas'}
                      className="w-full rounded-xl bg-white border border-[#94A3B8]/70 px-3 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#153684]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#334155] mb-1">
                    {isEs ? 'Descripción del Evento' : 'Event Description'}
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={
                      isEs
                        ? 'Detalles de la actividad, artistas o programación...'
                        : 'Activity details, artists, or schedule...'
                    }
                    className="w-full rounded-xl bg-white border border-[#94A3B8]/70 px-3 py-2 text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#153684]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#334155] mb-1">
                    {isEs
                      ? 'Subir Foto o Documento (Opcional: JPG, PNG, PDF)'
                      : 'Upload Photo or Document (Optional: JPG, PNG, PDF)'}
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-dashed border-[#94A3B8] cursor-pointer hover:border-[#153684] text-xs text-[#334155]">
                    <Upload className="w-4 h-4 text-[#153684] shrink-0" />
                    <span className="truncate">
                      {attachmentName ||
                        (isEs
                          ? 'Seleccionar JPG, PNG o PDF...'
                          : 'Choose JPG, PNG, or PDF...')}
                    </span>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {savedMsg && (
                  <p className="text-xs font-bold text-[#0F766E] bg-[#0F766E]/10 px-3 py-2 rounded-xl">
                    {savedMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#153684] hover:bg-[#0F2761] text-white font-display font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  {isEs ? 'Guardar Evento' : 'Save Event'}
                </button>
              </form>

              {/* Lista de Eventos Registrados */}
              <div className="lg:col-span-5 rounded-2xl bg-[#F1F5F9]/90 border border-[#94A3B8]/60 p-4 space-y-2.5 shadow-sm">
                <h4 className="font-display font-bold text-sm sm:text-base text-[#0F172A]">
                  {isEs
                    ? `Eventos Programados (${events.length})`
                    : `Scheduled Events (${events.length})`}
                </h4>

                {events.length === 0 ? (
                  <p className="text-xs text-[#64748B] py-6 text-center">
                    {isEs ? 'Aún no hay eventos registrados.' : 'No events registered yet.'}
                  </p>
                ) : (
                  <div className="space-y-2 max-h-[46dvh] overflow-y-auto custom-scroll pr-1">
                    {events.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-2.5 rounded-xl bg-white border border-[#94A3B8]/50 flex items-start justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-[#153684] uppercase">
                            {evt.entity} · {evt.date} {evt.time}
                          </span>
                          <p className="font-display font-bold text-xs text-[#0F172A] truncate">
                            {evt.title}
                          </p>
                          <p className="text-[10px] text-[#475569] truncate">{evt.place}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onDeleteEvent(evt.id)}
                          aria-label={isEs ? 'Eliminar evento' : 'Delete event'}
                          className="p-1.5 rounded-lg text-[#B12722] hover:bg-[#B12722]/10 shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Pestaña de Estadísticas */
            <div className="space-y-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="p-3.5 rounded-2xl bg-[#153684] text-white shadow-sm">
                  <div className="text-xs font-semibold text-[#CBD5E1]">
                    {statsLabels.totalVisitsLabel}
                  </div>
                  <p className="font-display font-extrabold text-xl sm:text-2xl mt-1">
                    {stats.totalVisits.toLocaleString()}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#CBD5E1] border border-[#94A3B8] text-[#0F172A] shadow-sm">
                  <div className="text-xs font-semibold text-[#153684]">
                    {statsLabels.viewingTimeLabel}
                  </div>
                  <p className="font-display font-extrabold text-xl sm:text-2xl mt-1 text-[#B12722]">
                    {formatDuration(stats.sessionSeconds)}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#CBD5E1] border border-[#94A3B8] text-[#0F172A] shadow-sm">
                  <div className="text-xs font-semibold text-[#334155]">
                    {statsLabels.avgTimeLabel}
                  </div>
                  <p className="font-display font-extrabold text-xl sm:text-2xl mt-1">
                    {stats.avgViewTime}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#334155] text-white shadow-sm">
                  <div className="text-xs font-semibold text-[#CBD5E1]">
                    {statsLabels.detectedCountryLabel}
                  </div>
                  <p className="font-display font-bold text-sm sm:text-base mt-1.5 truncate text-[#F9C80E]">
                    {stats.currentVisitorRegion}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#F1F5F9]/90 border border-[#94A3B8]/60 p-4 space-y-2.5">
                  <h4 className="font-display font-bold text-sm text-[#0F172A]">
                    {statsLabels.countriesTitle}
                  </h4>
                  {stats.countries.map((c) => (
                    <div key={c.code} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span>
                          {isEs ? c.countryEs : c.countryEn} ({c.code})
                        </span>
                        <span>
                          {c.visits.toLocaleString()} · {c.percent}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#CBD5E1] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#153684]"
                          style={{ width: `${c.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-[#F1F5F9]/90 border border-[#94A3B8]/60 p-4 space-y-2">
                  <h4 className="font-display font-bold text-sm text-[#0F172A]">
                    {statsLabels.mostViewedTitle}
                  </h4>
                  {stats.topContent.map((item, idx) => {
                    const pct = Math.round((item.views / maxContentViews) * 100);
                    return (
                      <div
                        key={item.id}
                        className="p-2 rounded-xl bg-[#CBD5E1]/50 border border-[#94A3B8]/40 space-y-1"
                      >
                        <div className="flex justify-between text-xs">
                          <span className="font-bold truncate">
                            #{idx + 1} {isEs ? item.titleEs : item.titleEn}
                          </span>
                          <span className="font-bold text-[#B12722]">
                            {item.views.toLocaleString()} {statsLabels.viewsUnit}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[#E2E8F0] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#B12722] to-[#F9C80E]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
