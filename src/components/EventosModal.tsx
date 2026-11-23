import { useMemo, useState } from 'react';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  MapPin,
  Navigation,
  X,
} from 'lucide-react';
import { CulturalEvent } from '../hooks/useEventsStore';
import { Language } from '../i18n/translations';

interface EventosModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: CulturalEvent[];
  language: Language;
}

const MONTHS_ES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS_ES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const WEEKDAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function EventosModal({
  isOpen,
  onClose,
  events,
  language,
}: EventosModalProps) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  const isEs = language === 'es';
  const months = isEs ? MONTHS_ES : MONTHS_EN;
  const weekdays = isEs ? WEEKDAYS_ES : WEEKDAYS_EN;

  const eventsByDate = useMemo(() => {
    const map: Record<string, CulturalEvent[]> = {};
    for (const evt of events) {
      if (!map[evt.date]) map[evt.date] = [];
      map[evt.date].push(evt);
    }
    return map;
  }, [events]);

  const calendarCells = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // Convert Sunday (0) -> 6, Monday (1) -> 0
    const startOffset = (firstDay.getDay() + 6) % 7;

    const cells: { day: number | null; dateKey: string | null }[] = [];
    for (let i = 0; i < startOffset; i++) {
      cells.push({ day: null, dateKey: null });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const mm = String(currentMonth + 1).padStart(2, '0');
      const dd = String(d).padStart(2, '0');
      cells.push({ day: d, dateKey: `${currentYear}-${mm}-${dd}` });
    }
    return cells;
  }, [currentYear, currentMonth]);

  if (!isOpen) return null;

  const handlePrevMonth = () => {
    setSelectedDateKey(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    setSelectedDateKey(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const selectedEvents = selectedDateKey ? eventsByDate[selectedDateKey] ?? [] : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="eventos-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-[#0F172A]/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92dvh] bg-[#E2E8F0] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#94A3B8]/70 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[#94A3B8]/50 bg-[#CBD5E1]/90">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#153684] text-[#F9C80E] flex items-center justify-center shrink-0">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3
                id="eventos-modal-title"
                className="font-display font-bold text-base sm:text-lg text-[#0F172A] truncate"
              >
                {isEs ? 'Agenda Mensual de Eventos' : 'Monthly Events Calendar'}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#334155] truncate">
                {isEs
                  ? 'CENDIS y Canal Cultura · Selecciona un día para ver los detalles'
                  : 'CENDIS & Canal Cultura · Select a day to view event details'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={isEs ? 'Cerrar' : 'Close'}
            className="p-2 rounded-xl bg-[#E2E8F0] border border-[#94A3B8]/60 text-[#334155] hover:text-[#153684] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navegación del Mes */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#F1F5F9]/80 border-b border-[#94A3B8]/40">
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label={isEs ? 'Mes anterior' : 'Previous month'}
            className="p-1.5 rounded-lg bg-[#CBD5E1] hover:bg-[#153684] text-[#0F172A] hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-display font-extrabold text-sm sm:text-base text-[#153684] uppercase tracking-wide">
            {months[currentMonth]} {currentYear}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            aria-label={isEs ? 'Mes siguiente' : 'Next month'}
            className="p-1.5 rounded-lg bg-[#CBD5E1] hover:bg-[#153684] text-[#0F172A] hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grilla del Calendario */}
        <div className="p-3 sm:p-5 overflow-y-auto custom-scroll flex-1">
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-1.5 text-center">
            {weekdays.map((wd) => (
              <div
                key={wd}
                className="font-display font-bold text-[10px] sm:text-xs text-[#475569] uppercase py-1"
              >
                {wd}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarCells.map((cell, idx) => {
              if (!cell.day || !cell.dateKey) {
                return <div key={`empty-${idx}`} className="h-12 sm:h-16 rounded-xl bg-[#CBD5E1]/30" />;
              }

              const dayEvents = eventsByDate[cell.dateKey] ?? [];
              const hasEvents = dayEvents.length > 0;
              const isSelected = selectedDateKey === cell.dateKey;

              return (
                <button
                  key={cell.dateKey}
                  type="button"
                  onClick={() => setSelectedDateKey(cell.dateKey)}
                  className={`relative h-12 sm:h-16 rounded-xl border p-1 sm:p-1.5 flex flex-col justify-between text-left transition-all ${
                    isSelected
                      ? 'bg-[#153684] text-white border-[#F9C80E] ring-2 ring-[#F9C80E]/60'
                      : hasEvents
                        ? 'bg-white border-[#B12722]/60 hover:border-[#153684] shadow-sm'
                        : 'bg-[#F1F5F9]/80 border-[#94A3B8]/50 hover:bg-white'
                  }`}
                >
                  <span
                    className={`font-display font-bold text-xs sm:text-sm ${
                      isSelected ? 'text-white' : 'text-[#0F172A]'
                    }`}
                  >
                    {cell.day}
                  </span>

                  {hasEvents && (
                    <span
                      className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[9px] font-bold truncate ${
                        isSelected
                          ? 'bg-[#F9C80E] text-[#0F172A]'
                          : 'bg-[#B12722] text-white'
                      }`}
                    >
                      {dayEvents.length}{' '}
                      {isEs
                        ? dayEvents.length === 1
                          ? 'evento'
                          : 'eventos'
                        : dayEvents.length === 1
                          ? 'event'
                          : 'events'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Ventana Flotante con toda la información del día seleccionado */}
        {selectedDateKey && (
          <div
            className="absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-6 bg-[#0F172A]/55 backdrop-blur-[2px]"
            onClick={() => setSelectedDateKey(null)}
          >
            <div
              className="w-full max-w-lg max-h-[80dvh] bg-[#F1F5F9] rounded-2xl shadow-2xl border-2 border-[#153684] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 bg-[#153684] text-white">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-[#F9C80E]" />
                  <span className="font-display font-bold text-sm">
                    {isEs ? 'Eventos del día' : 'Events for'} {selectedDateKey}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDateKey(null)}
                  className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto custom-scroll space-y-3">
                {selectedEvents.length === 0 ? (
                  <p className="text-center text-sm text-[#475569] py-6">
                    {isEs
                      ? 'No hay eventos programados para esta fecha.'
                      : 'No events scheduled for this date.'}
                  </p>
                ) : (
                  selectedEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="rounded-xl bg-white border border-[#94A3B8]/60 p-3.5 space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#153684] text-[#F9C80E] text-[10px] font-bold uppercase">
                          {evt.entity}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#B12722]">
                          <Clock className="w-3.5 h-3.5" />
                          {evt.time}
                        </span>
                      </div>

                      <h4 className="font-display font-extrabold text-sm sm:text-base text-[#0F172A]">
                        {evt.title}
                      </h4>

                      <div className="space-y-1 text-xs text-[#334155]">
                        <p className="flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#153684] shrink-0 mt-0.5" />
                          <span>
                            <strong>{isEs ? 'Lugar:' : 'Place:'}</strong> {evt.place}
                          </span>
                        </p>
                        <p className="flex items-start gap-1.5">
                          <Navigation className="w-3.5 h-3.5 text-[#153684] shrink-0 mt-0.5" />
                          <span>
                            <strong>{isEs ? 'Dirección:' : 'Address:'}</strong> {evt.address}
                          </span>
                        </p>
                        <div className="pt-1">
                          <a
                            href={
                              evt.address.trim().startsWith('http')
                                ? evt.address.trim()
                                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                    `${evt.place} ${evt.address}`.trim()
                                  )}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#153684] hover:bg-[#0F2761] text-white font-display font-bold text-[11px] shadow-sm transition-colors"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#F9C80E]" />
                            <span>
                              {isEs ? 'Abrir en Google Maps' : 'Open in Google Maps'}
                            </span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed pt-1 border-t border-gray-200">
                        {evt.description}
                      </p>

                      {evt.attachmentDataUrl && (
                        <div className="pt-2">
                          {evt.attachmentType === 'image' ? (
                            <img
                              src={evt.attachmentDataUrl}
                              alt={evt.attachmentName || evt.title}
                              className="w-full max-h-52 object-contain rounded-xl border border-gray-200 bg-[#F8FAFC]"
                            />
                          ) : (
                            <a
                              href={evt.attachmentDataUrl}
                              download={evt.attachmentName || 'evento.pdf'}
                              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#B12722] text-white text-xs font-bold hover:opacity-90 transition-opacity"
                            >
                              <FileText className="w-4 h-4" />
                              <span>{evt.attachmentName || 'Descargar PDF'}</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
