import { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2, Minus, Move, Radio, X } from 'lucide-react';
import { Language } from '../i18n/translations';

interface LiveSignalFloatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const YOUTUBE_VIDEO_ID = 'lwxUdX18190';
const EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`;

export function LiveSignalFloatingModal({
  isOpen,
  onClose,
  language,
}: LiveSignalFloatingModalProps) {
  const [viewMode, setViewMode] = useState<'normal' | 'expanded' | 'minimized'>('normal');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragOffset.current || !windowRef.current) return;
      const rect = windowRef.current.getBoundingClientRect();
      const maxX = Math.max(8, window.innerWidth - rect.width - 8);
      const maxY = Math.max(8, window.innerHeight - rect.height - 8);
      const nextX = Math.min(Math.max(8, e.clientX - dragOffset.current.x), maxX);
      const nextY = Math.min(Math.max(8, e.clientY - dragOffset.current.y), maxY);
      setPosition({ x: nextX, y: nextY });
    };

    const handlePointerUp = () => {
      dragOffset.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, []);

  if (!isOpen) return null;

  const isEs = language === 'es';
  const title = isEs ? 'Señal en Vivo · Canal Cultura' : 'Live Signal · Canal Cultura';
  const liveLabel = isEs ? 'EN VIVO' : 'LIVE';

  const handleClose = () => {
    setViewMode('normal');
    setPosition(null);
    onClose();
  };

  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (viewMode === 'expanded') return;
    if ((e.target as HTMLElement).closest('button')) return;
    if (!windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const customPositionStyle: React.CSSProperties | undefined =
    position && viewMode !== 'expanded'
      ? { left: `${position.x}px`, top: `${position.y}px`, right: 'auto', bottom: 'auto' }
      : undefined;

  if (viewMode === 'minimized') {
    return (
      <div
        ref={windowRef}
        role="region"
        aria-label={title}
        onPointerDown={handleDragStart}
        style={customPositionStyle}
        className="fixed bottom-12 left-3 z-50 flex items-center gap-2.5 bg-[#153684] text-white px-3 py-2 rounded-2xl shadow-2xl border-2 border-[#F9C80E]/80 max-w-[90vw] cursor-grab active:cursor-grabbing select-none touch-none"
      >
        <Move className="w-3.5 h-3.5 text-[#F9C80E] shrink-0" />
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#C81D25] text-[10px] font-extrabold tracking-wide shrink-0">
          <Radio className="w-3 h-3 animate-pulse" />
          {liveLabel}
        </span>
        <span className="font-display font-bold text-xs truncate">{title}</span>

        <iframe
          src={EMBED_URL}
          title={title}
          className="w-0 h-0 opacity-0 pointer-events-none absolute"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />

        <div className="flex items-center gap-1 shrink-0 ml-1">
          <button
            type="button"
            onClick={() => setViewMode('normal')}
            title={isEs ? 'Restaurar' : 'Restore'}
            aria-label={isEs ? 'Restaurar' : 'Restore'}
            className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleClose}
            title={isEs ? 'Cerrar' : 'Close'}
            aria-label={isEs ? 'Cerrar' : 'Close'}
            className="p-1.5 rounded-lg bg-[#C81D25]/80 hover:bg-[#C81D25] transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  const isExpanded = viewMode === 'expanded';

  return (
    <div
      ref={windowRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby="live-signal-title"
      style={customPositionStyle}
      className={`fixed z-50 ${
        isExpanded
          ? 'inset-2 sm:inset-6 flex items-center justify-center'
          : position
            ? 'w-[calc(100vw-1.5rem)] sm:w-[440px] md:w-[500px]'
            : 'bottom-12 right-3 sm:right-14 w-[calc(100vw-1.5rem)] sm:w-[440px] md:w-[500px]'
      }`}
    >
      <div
        className={`w-full bg-[#E2E8F0] rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#153684]/70 overflow-hidden flex flex-col ${
          isExpanded ? 'h-full max-w-6xl max-h-[90dvh]' : ''
        }`}
      >
        {/* Barra de título arrastrable con controles: Minimizar, Agrandar/Restaurar y Cerrar */}
        <div
          onPointerDown={handleDragStart}
          title={
            isExpanded
              ? undefined
              : isEs
                ? 'Arrastra para mover la ventana'
                : 'Drag to move window'
          }
          className={`flex items-center justify-between gap-2 px-3.5 sm:px-4 py-2.5 bg-gradient-to-r from-[#153684] via-[#1E3A8A] to-[#1E293B] text-white shrink-0 select-none ${
            isExpanded ? '' : 'cursor-grab active:cursor-grabbing touch-none'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            {!isExpanded && <Move className="w-3.5 h-3.5 text-[#F9C80E] shrink-0" />}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#C81D25] text-[10px] font-extrabold tracking-wider shrink-0">
              <Radio className="w-3 h-3 animate-pulse" />
              {liveLabel}
            </span>
            <h3
              id="live-signal-title"
              className="font-display font-bold text-xs sm:text-sm truncate"
            >
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('minimized')}
              title={isEs ? 'Minimizar' : 'Minimize'}
              aria-label={isEs ? 'Minimizar' : 'Minimize'}
              className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode(isExpanded ? 'normal' : 'expanded')}
              title={
                isExpanded
                  ? isEs
                    ? 'Tamaño normal'
                    : 'Normal size'
                  : isEs
                    ? 'Agrandar'
                    : 'Expand'
              }
              aria-label={isExpanded ? 'Normal' : 'Expand'}
              className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
            >
              {isExpanded ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              type="button"
              onClick={handleClose}
              title={isEs ? 'Cerrar' : 'Close'}
              aria-label={isEs ? 'Cerrar' : 'Close'}
              className="p-1.5 rounded-lg bg-[#C81D25]/85 hover:bg-[#C81D25] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Reproductor embebido dentro de la misma página */}
        <div
          className={`w-full bg-black ${
            isExpanded ? 'flex-1 min-h-0' : 'aspect-video'
          }`}
        >
          <iframe
            src={EMBED_URL}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
