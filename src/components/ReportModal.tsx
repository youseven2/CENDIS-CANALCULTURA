import {
  BarChart3,
  Clock,
  Disc3,
  Eye,
  Flame,
  Globe2,
  Mic,
  Monitor,
  Music,
  Newspaper,
  Radio,
  Smartphone,
  Tablet,
  Timer,
  X,
} from 'lucide-react';
import { DeviceInfo } from '../hooks/useDeviceType';
import { PortalStatsState, formatDuration } from '../hooks/usePortalStats';
import { Language, TranslatedLink, TranslationBundle } from '../i18n/translations';

interface ReportModalProps {
  activeLink: TranslatedLink | null;
  deviceInfo: DeviceInfo;
  deviceLabel: string;
  language: Language;
  stats: PortalStatsState;
  t: TranslationBundle['modal'];
  onClose: () => void;
}

export function ReportModal({
  activeLink,
  deviceInfo,
  deviceLabel,
  language,
  stats,
  t,
  onClose,
}: ReportModalProps) {
  if (!activeLink) return null;

  const { device, width, height } = deviceInfo;
  const DeviceIcon =
    device === 'mobile' ? Smartphone : device === 'tablet' ? Tablet : Monitor;

  const maxContentViews = stats.topContent[0]?.views || 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-[#0F172A]/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90dvh] bg-[#E2E8F0] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#94A3B8]/70 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#94A3B8]/50 bg-[#CBD5E1]/85">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-3 h-8 rounded-full shrink-0"
              style={{ backgroundColor: activeLink.accent }}
            />
            <div className="min-w-0">
              <h3
                id="modal-title"
                className="font-display font-bold text-base sm:text-lg text-[#0F172A] truncate"
              >
                {activeLink.title}
              </h3>
              <p className="text-xs text-[#334155] flex items-center gap-1.5">
                <DeviceIcon className="w-3.5 h-3.5 text-[#153684]" />
                <span>
                  {t.adaptedTo} <strong>{deviceLabel}</strong> ({width}×{height}px)
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="p-2 rounded-xl bg-[#E2E8F0] border border-[#94A3B8]/60 text-[#334155] hover:text-[#153684] hover:border-[#153684]/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo Adaptativo */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scroll space-y-4">
          {activeLink.modalType === 'reports' ? (
            <>
              {/* 4 KPIs Principales: Visitas, Tiempo en página, Promedio, Región */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="p-3.5 rounded-2xl bg-[#153684] text-white shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#CBD5E1]">
                    <Eye className="w-3.5 h-3.5 text-[#F9C80E]" />
                    <span>{t.totalVisitsLabel}</span>
                  </div>
                  <p className="font-display font-extrabold text-xl sm:text-2xl mt-1">
                    {stats.totalVisits.toLocaleString()}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#CBD5E1] border border-[#94A3B8] text-[#0F172A] shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#153684]">
                    <Timer className="w-3.5 h-3.5" />
                    <span>{t.viewingTimeLabel}</span>
                  </div>
                  <p className="font-display font-extrabold text-xl sm:text-2xl mt-1 text-[#B12722]">
                    {formatDuration(stats.sessionSeconds)}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#CBD5E1] border border-[#94A3B8] text-[#0F172A] shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#334155]">
                    <Clock className="w-3.5 h-3.5 text-[#153684]" />
                    <span>{t.avgTimeLabel}</span>
                  </div>
                  <p className="font-display font-extrabold text-xl sm:text-2xl mt-1">
                    {stats.avgViewTime}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#334155] text-white shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#CBD5E1]">
                    <Globe2 className="w-3.5 h-3.5 text-[#F9C80E]" />
                    <span>{t.detectedCountryLabel}</span>
                  </div>
                  <p className="font-display font-bold text-sm sm:text-base mt-1.5 truncate text-[#F9C80E]">
                    {stats.currentVisitorRegion}
                  </p>
                </div>
              </div>

              {/* Desglose por País y Contenido Más Visto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Visitas por País */}
                <div className="rounded-2xl bg-[#F1F5F9]/90 border border-[#94A3B8]/60 p-4 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 font-display font-bold text-sm sm:text-base text-[#0F172A]">
                    <Globe2 className="w-4 h-4 text-[#153684]" />
                    <h4>{t.countriesTitle}</h4>
                  </div>

                  <div className="space-y-2.5">
                    {stats.countries.map((c) => {
                      const name = language === 'es' ? c.countryEs : c.countryEn;
                      return (
                        <div key={c.code} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-semibold text-[#1E293B]">
                            <span>
                              {name}{' '}
                              <span className="text-[10px] font-mono text-[#64748B]">
                                ({c.code})
                              </span>
                            </span>
                            <span>
                              {c.visits.toLocaleString()} ·{' '}
                              <strong className="text-[#153684]">{c.percent}%</strong>
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-[#CBD5E1] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#153684] to-[#1D4ED8]"
                              style={{ width: `${c.percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Contenido Más Visto */}
                <div className="rounded-2xl bg-[#F1F5F9]/90 border border-[#94A3B8]/60 p-4 space-y-3 shadow-sm">
                  <div className="flex items-center gap-2 font-display font-bold text-sm sm:text-base text-[#0F172A]">
                    <Flame className="w-4 h-4 text-[#B12722]" />
                    <h4>{t.mostViewedTitle}</h4>
                  </div>

                  <div className="space-y-2.5">
                    {stats.topContent.map((item, idx) => {
                      const title = language === 'es' ? item.titleEs : item.titleEn;
                      const pct = Math.round((item.views / maxContentViews) * 100);
                      return (
                        <div
                          key={item.id}
                          className="p-2.5 rounded-xl bg-[#CBD5E1]/55 border border-[#94A3B8]/40 space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="font-display font-bold text-[#0F172A] truncate">
                              #{idx + 1} {title}
                            </span>
                            <span className="shrink-0 font-bold text-[#B12722]">
                              {item.views.toLocaleString()} {t.viewsUnit}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 flex-1 rounded-full bg-[#E2E8F0] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-[#B12722] to-[#F9C80E]"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-medium text-[#475569] shrink-0">
                              {item.avgTime}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-[#94A3B8]/60 bg-[#F1F5F9]/90 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
                style={{ backgroundColor: activeLink.accent }}
              >
                {activeLink.category === 'canal' ? (
                  <Radio className="w-6 h-6" />
                ) : activeLink.category === 'cendis' ? (
                  <Disc3 className="w-6 h-6" />
                ) : activeLink.category === 'concerts' ? (
                  <Music className="w-6 h-6" />
                ) : activeLink.category === 'podcast' ? (
                  <Mic className="w-6 h-6" />
                ) : activeLink.category === 'news' ? (
                  <Newspaper className="w-6 h-6" />
                ) : (
                  <BarChart3 className="w-6 h-6" />
                )}
              </div>
              <div className="space-y-1.5">
                <h4 className="font-display font-bold text-base text-[#0F172A]">
                  {t.moduleReadyTitle} {activeLink.title}
                </h4>
                <p className="text-sm text-[#334155] leading-relaxed">
                  {activeLink.description} {t.moduleReadyBody}{' '}
                  <code className="px-1.5 py-0.5 rounded bg-[#CBD5E1] text-xs font-mono">
                    src/i18n/translations.ts
                  </code>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
