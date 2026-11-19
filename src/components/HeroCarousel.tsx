import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Disc3, Radio } from 'lucide-react';
import { DeviceCategory } from '../hooks/useDeviceType';
import { TranslatedSlide, TranslationBundle } from '../i18n/translations';

interface HeroCarouselProps {
  t: TranslationBundle['carousel'];
  activeIndex: number;
  onChangeIndex: (index: number) => void;
  onSelectSlideAction: (targetLinkId: string) => void;
  device: DeviceCategory;
}

const ACCENT_STYLES: Record<
  TranslatedSlide['accentColor'],
  {
    bg: string;
    badgeBg: string;
    badgeText: string;
    buttonBg: string;
    decorCircle1: string;
    decorCircle2: string;
  }
> = {
  red: {
    bg: 'from-[#1E293B] via-[#153684] to-[#0F2761]',
    badgeBg: 'bg-[#F9C80E]',
    badgeText: 'text-[#0F172A]',
    buttonBg: 'bg-[#F9C80E] text-[#0F172A] hover:bg-white hover:text-[#153684]',
    decorCircle1: 'bg-[#F9C80E]/25',
    decorCircle2: 'bg-[#C81D25]/30',
  },
  blue: {
    bg: 'from-[#153684] via-[#1D4ED8] to-[#1E293B]',
    badgeBg: 'bg-[#F9C80E]',
    badgeText: 'text-[#0F172A]',
    buttonBg: 'bg-[#CBD5E1] text-[#0F172A] hover:bg-[#F9C80E] hover:text-[#0F172A]',
    decorCircle1: 'bg-[#F9C80E]/25',
    decorCircle2: 'bg-[#CBD5E1]/20',
  },
  yellow: {
    bg: 'from-[#CBD5E1] via-[#E2E8F0] to-[#94A3B8]',
    badgeBg: 'bg-[#C81D25]',
    badgeText: 'text-white',
    buttonBg: 'bg-[#153684] text-white hover:bg-[#C81D25]',
    decorCircle1: 'bg-[#F9C80E]/35',
    decorCircle2: 'bg-[#153684]/20',
  },
};

export function HeroCarousel({
  t,
  activeIndex,
  onChangeIndex,
  onSelectSlideAction,
  device,
}: HeroCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const slides = t.slides;

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      onChangeIndex((activeIndex + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [activeIndex, isPaused, onChangeIndex, slides.length]);

  const currentSlide = slides[activeIndex] ?? slides[0];
  const style = ACCENT_STYLES[currentSlide.accentColor];
  const isLightBg = currentSlide.accentColor === 'yellow';

  const handlePrev = () => {
    onChangeIndex((activeIndex - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    onChangeIndex((activeIndex + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      aria-label={t.ariaLabel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br ${style.bg} border border-[#94A3B8]/50 shadow-lg transition-all duration-500 flex flex-col justify-between p-3.5 sm:p-5 lg:p-6`}
    >
      <div
        className={`pointer-events-none absolute -right-12 -top-12 w-44 h-44 sm:w-64 sm:h-64 rounded-full blur-2xl ${style.decorCircle1} transition-colors duration-500`}
      />
      <div
        className={`pointer-events-none absolute -left-10 -bottom-12 w-40 h-40 sm:w-56 sm:h-56 rounded-full blur-2xl ${style.decorCircle2} transition-colors duration-500`}
      />

      {/* Motivo gráfico metálico/institucional */}
      <div className="pointer-events-none absolute right-4 top-4 sm:right-6 sm:top-6 flex items-center gap-1.5 opacity-90">
        <span className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-[#CBD5E1] shadow-sm" />
        <span className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-[#153684] shadow-sm" />
        <span className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-[#F9C80E] shadow-sm" />
      </div>

      {/* Badge superior */}
      <div className="relative z-10 flex items-center gap-2 pr-14">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-sm ${style.badgeBg} ${style.badgeText}`}
        >
          {currentSlide.accentColor === 'blue' ? (
            <Radio className="w-3.5 h-3.5" />
          ) : (
            <Disc3 className="w-3.5 h-3.5" />
          )}
          {currentSlide.badge}
        </span>
      </div>

      {/* Contenido central */}
      <div className="relative z-10 my-auto py-2 sm:py-4 max-w-2xl">
        <p
          className={`text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-1.5 ${
            isLightBg ? 'text-[#334155]' : 'text-[#CBD5E1]'
          }`}
        >
          {currentSlide.tag}
        </p>
        <h1
          className={`font-display font-extrabold tracking-tight leading-[1.1] ${
            device === 'mobile'
              ? 'text-xl sm:text-2xl'
              : device === 'tablet'
                ? 'text-2xl sm:text-3xl'
                : 'text-3xl lg:text-4xl'
          } ${isLightBg ? 'text-[#0F172A]' : 'text-white'}`}
        >
          {currentSlide.title}
        </h1>
        <p
          className={`mt-2 sm:mt-3 leading-relaxed ${
            device === 'mobile' ? 'text-xs line-clamp-2' : 'text-sm sm:text-base'
          } ${isLightBg ? 'text-[#1E293B]' : 'text-[#E2E8F0]'}`}
        >
          {currentSlide.subtitle}
        </p>

        <div className="mt-3 sm:mt-5">
          <button
            type="button"
            onClick={() => onSelectSlideAction(currentSlide.targetLinkId)}
            className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] ${style.buttonBg}`}
          >
            <span>{currentSlide.actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Controles del carrusel */}
      <div className="relative z-10 flex items-center justify-between gap-3 pt-2 border-t border-[#94A3B8]/25">
        <div className="flex items-center gap-1.5 sm:gap-2" role="tablist">
          {slides.map((slide, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={slide.title}
                onClick={() => onChangeIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active
                    ? isLightBg
                      ? 'w-7 bg-[#153684]'
                      : 'w-7 bg-[#CBD5E1]'
                    : isLightBg
                      ? 'w-2 bg-[#475569]/35 hover:bg-[#475569]/60'
                      : 'w-2 bg-white/35 hover:bg-white/65'
                }`}
              />
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label={t.prevSlide}
            className={`p-1.5 sm:p-2 rounded-xl transition-colors ${
              isLightBg
                ? 'bg-[#334155]/15 hover:bg-[#334155]/25 text-[#0F172A]'
                : 'bg-white/15 hover:bg-white/25 text-white'
            }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label={t.nextSlide}
            className={`p-1.5 sm:p-2 rounded-xl transition-colors ${
              isLightBg
                ? 'bg-[#334155]/15 hover:bg-[#334155]/25 text-[#0F172A]'
                : 'bg-white/15 hover:bg-white/25 text-white'
            }`}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
