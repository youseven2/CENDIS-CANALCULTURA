import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BarChart3, Disc3, Link2, Search, X } from 'lucide-react';
import { TranslationBundle, TranslatedLink } from '../i18n/translations';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationBundle;
  onSelectSlide: (slideIndex: number) => void;
  onSelectLink: (link: TranslatedLink) => void;
}

interface SearchResult {
  id: string;
  type: 'slide' | 'link' | 'report';
  title: string;
  subtitle: string;
  slideIndex?: number;
  link?: TranslatedLink;
}

export function SearchOverlay({
  isOpen,
  onClose,
  t,
  onSelectSlide,
  onSelectLink,
}: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      window.setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const allItems = useMemo<SearchResult[]>(() => {
    const slides: SearchResult[] = t.carousel.slides.map((s, idx) => ({
      id: `s-${s.id}`,
      type: 'slide',
      title: s.title,
      subtitle: s.subtitle,
      slideIndex: idx,
    }));

    const links: SearchResult[] = t.linksPanel.links.map((l) => ({
      id: `l-${l.id}`,
      type: 'link',
      title: l.title,
      subtitle: l.description,
      link: l,
    }));

    const reportsLink = t.linksPanel.links.find((l) => l.modalType === 'reports');
    const reports: SearchResult[] = t.modal.reports.map((r) => ({
      id: `r-${r.id}`,
      type: 'report',
      title: `${r.area} · ${r.indicador}`,
      subtitle: `${r.periodo} — ${r.valor} (${r.estado})`,
      link: reportsLink,
    }));

    return [...links, ...slides, ...reports];
  }, [t]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems.slice(0, 8);
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  if (!isOpen) return null;

  const handleChoose = (item: SearchResult) => {
    if (item.type === 'slide' && typeof item.slideIndex === 'number') {
      onSelectSlide(item.slideIndex);
      onClose();
      return;
    }
    if (item.link) {
      onSelectLink(item.link);
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.search.title}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-3 sm:px-6 bg-[#111827]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra de entrada de búsqueda */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-gray-200 bg-[#F8F9FB]">
          <Search className="w-5 h-5 text-[#C81D25] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full bg-transparent text-sm sm:text-base text-[#111827] placeholder:text-gray-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t.search.close}
            className="p-1.5 rounded-lg text-gray-500 hover:text-[#C81D25] hover:bg-gray-200/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resultados dentro de la misma página */}
        <div className="max-h-[60dvh] overflow-y-auto custom-scroll p-2.5 sm:p-3 space-y-1.5">
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-8">{t.search.noResults}</p>
          ) : (
            filtered.map((item) => {
              const badgeLabel =
                item.type === 'slide'
                  ? t.search.typeSlide
                  : item.type === 'report'
                    ? t.search.typeReport
                    : t.search.typeLink;
              const Icon =
                item.type === 'slide'
                  ? Disc3
                  : item.type === 'report'
                    ? BarChart3
                    : Link2;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleChoose(item)}
                  className="w-full text-left flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-[#F8F9FB] border border-transparent hover:border-gray-200 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#153684]/10 text-[#153684] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-[#111827] truncate group-hover:text-[#C81D25]">
                        {item.title}
                      </span>
                      <span className="shrink-0 px-1.5 py-0.5 rounded bg-[#F9C80E]/30 text-[#111827] text-[10px] font-bold uppercase">
                        {badgeLabel}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{item.subtitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#C81D25] shrink-0" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
