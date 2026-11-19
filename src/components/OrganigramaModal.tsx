import { useMemo, useState } from 'react';
import { Building2, FileText, Network, Search, User, X } from 'lucide-react';
import { ORG_HIERARCHY, OrgNode, flattenOrgNodes } from '../data/orgChartData';
import { DeviceCategory } from '../hooks/useDeviceType';
import { Language } from '../i18n/translations';

interface OrganigramaModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  device: DeviceCategory;
}

const LABELS = {
  es: {
    title: 'Estructura Organizativa y Organigrama Oficial · Fundación CENDIS',
    subtitle: 'Ministerio del Poder Popular para la Cultura · Distribución por Dependencias',
    tabGraphic: 'Organigrama Gráfico',
    tabText: 'Organigrama Textual',
    searchPlaceholder: 'Filtrar dependencia o funcionario...',
    vacant: 'CARGO VACANTE / SIN ASIGNAR',
    dependencyPrefix: 'DEPENDENCIA:',
    cargoPrefix: 'CARGO:',
    close: 'Cerrar',
  },
  en: {
    title: 'Organizational Structure & Official Org Chart · CENDIS Foundation',
    subtitle: "Ministry of People's Power for Culture · Distribution by Units",
    tabGraphic: 'Graphical Chart',
    tabText: 'Textual Structure',
    searchPlaceholder: 'Filter unit or official...',
    vacant: 'VACANT / UNASSIGNED',
    dependencyPrefix: 'UNIT:',
    cargoPrefix: 'ROLE:',
    close: 'Close',
  },
};

const LEVEL_COLORS: Record<OrgNode['level'], string> = {
  rector: 'bg-[#153684] text-white border-[#0F2761]',
  superior: 'bg-[#CBD5E1] text-[#0F172A] border-[#153684]/50',
  apoyo: 'bg-[#F1F5F9] text-[#0F172A] border-[#64748B]',
  direccion: 'bg-[#334155] text-white border-[#1E293B]',
  asesoria: 'bg-[#E2E8F0] text-[#0F172A] border-[#475569]',
  coordinacion: 'bg-[#F8FAFC] text-[#0F172A] border-[#94A3B8]',
};

function OrgNodeCard({
  node,
  language,
  compact = false,
}: {
  node: OrgNode;
  language: Language;
  compact?: boolean;
}) {
  const title = language === 'es' ? node.dependencyEs : node.dependencyEn;
  const isDark = node.level === 'rector' || node.level === 'direccion';

  return (
    <div
      className={`rounded-xl border-2 shadow-sm px-3 py-2 text-center transition-all ${
        LEVEL_COLORS[node.level]
      } ${compact ? 'text-left' : 'min-w-[170px] max-w-[240px]'}`}
    >
      <p className="font-display font-bold text-[11px] sm:text-xs leading-tight">{title}</p>
      <p
        className={`mt-1 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold ${
          node.isVacant
            ? isDark
              ? 'text-[#CBD5E1]/80'
              : 'text-[#64748B]'
            : isDark
              ? 'text-[#F9C80E]'
              : 'text-[#153684]'
        }`}
      >
        <User className="w-3 h-3 shrink-0" />
        <span>{node.holder}</span>
      </p>
    </div>
  );
}

function MobileTreeBranch({ node, language }: { node: OrgNode; language: Language }) {
  return (
    <div className="space-y-2">
      <OrgNodeCard node={node} language={language} compact />
      {node.children && node.children.length > 0 && (
        <div className="pl-3 ml-2 border-l-2 border-[#94A3B8] space-y-2">
          {node.children.map((child) => (
            <MobileTreeBranch key={child.id} node={child} language={language} />
          ))}
        </div>
      )}
    </div>
  );
}

export function OrganigramaModal({
  isOpen,
  onClose,
  language,
  device,
}: OrganigramaModalProps) {
  const [activeTab, setActiveTab] = useState<'graphic' | 'text'>('graphic');
  const [filter, setFilter] = useState('');

  const t = LABELS[language];
  const flatList = useMemo(() => flattenOrgNodes(ORG_HIERARCHY), []);

  const filteredList = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return flatList;
    return flatList.filter(
      (item) =>
        item.dependencyEs.toLowerCase().includes(q) ||
        item.dependencyEn.toLowerCase().includes(q) ||
        item.entries.some((e) => e.holder.toLowerCase().includes(q))
    );
  }, [flatList, filter]);

  if (!isOpen) return null;

  // Desestructuración jerárquica fiel al organigrama gráfico del PDF
  const consejo = ORG_HIERARCHY.children?.[0];
  const apoyoNodes = consejo?.children?.filter((c) => c.level === 'apoyo') ?? [];
  const presidencia = consejo?.children?.find((c) => c.id === 'presidencia');
  const dirEjecutiva = presidencia?.children?.[0];
  const asesoriaNodes =
    dirEjecutiva?.children?.filter((c) => c.level === 'asesoria') ?? [];
  const coordGenerales =
    dirEjecutiva?.children?.filter((c) => c.level === 'coordinacion') ?? [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="org-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#0F172A]/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl max-h-[92dvh] bg-[#E2E8F0] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#94A3B8]/70 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[#94A3B8]/60 bg-[#CBD5E1]/90">
          <div className="min-w-0">
            <h3
              id="org-title"
              className="font-display font-bold text-sm sm:text-lg text-[#0F172A] truncate"
            >
              {t.title}
            </h3>
            <p className="text-[11px] sm:text-xs text-[#334155] truncate">{t.subtitle}</p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            {/* Selector Vista Gráfica / Vista Textual */}
            <div className="inline-flex rounded-xl bg-[#E2E8F0] p-0.5 border border-[#94A3B8]/70">
              <button
                type="button"
                onClick={() => setActiveTab('graphic')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-display font-bold transition-all ${
                  activeTab === 'graphic'
                    ? 'bg-[#153684] text-white shadow-sm'
                    : 'text-[#334155] hover:text-[#0F172A]'
                }`}
              >
                <Network className="w-3.5 h-3.5" />
                <span>{t.tabGraphic}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-display font-bold transition-all ${
                  activeTab === 'text'
                    ? 'bg-[#153684] text-white shadow-sm'
                    : 'text-[#334155] hover:text-[#0F172A]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.tabText}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label={t.close}
              className="p-2 rounded-xl bg-[#E2E8F0] border border-[#94A3B8]/60 text-[#334155] hover:text-[#153684] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-3 sm:p-5 overflow-y-auto custom-scroll flex-1">
          {activeTab === 'graphic' ? (
            device === 'mobile' ? (
              <MobileTreeBranch node={ORG_HIERARCHY} language={language} />
            ) : (
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[820px] flex flex-col items-center gap-3">
                  {/* Nivel 1: Ministerio */}
                  <OrgNodeCard node={ORG_HIERARCHY} language={language} />
                  <div className="w-0.5 h-4 bg-[#64748B]" />

                  {/* Nivel 2: Consejo Directivo */}
                  {consejo && <OrgNodeCard node={consejo} language={language} />}
                  <div className="w-0.5 h-4 bg-[#64748B]" />

                  {/* Nivel 3: Apoyo lateral + Presidencia */}
                  <div className="grid grid-cols-3 gap-4 items-center w-full max-w-3xl">
                    <div className="flex justify-end">
                      {apoyoNodes[0] && <OrgNodeCard node={apoyoNodes[0]} language={language} />}
                    </div>
                    <div className="flex flex-col items-center">
                      {presidencia && <OrgNodeCard node={presidencia} language={language} />}
                    </div>
                    <div className="flex justify-start">
                      {apoyoNodes[1] && <OrgNodeCard node={apoyoNodes[1]} language={language} />}
                    </div>
                  </div>

                  <div className="w-0.5 h-4 bg-[#64748B]" />

                  {/* Nivel 4: Dirección Ejecutiva */}
                  {dirEjecutiva && <OrgNodeCard node={dirEjecutiva} language={language} />}
                  <div className="w-0.5 h-4 bg-[#64748B]" />

                  {/* Nivel 5: Asesoría y Comunicación */}
                  <div className="flex flex-wrap justify-center gap-3 w-full">
                    {asesoriaNodes.map((n) => (
                      <OrgNodeCard key={n.id} node={n} language={language} />
                    ))}
                  </div>

                  <div className="w-full h-px bg-[#94A3B8] my-1" />

                  {/* Nivel 6: Coordinaciones Generales y sus dependencias */}
                  <div className="grid grid-cols-3 gap-4 w-full items-start">
                    {coordGenerales.map((cg) => (
                      <div
                        key={cg.id}
                        className="flex flex-col items-center gap-2.5 bg-[#CBD5E1]/50 rounded-2xl p-3 border border-[#94A3B8]/50"
                      >
                        <OrgNodeCard node={cg} language={language} />
                        {cg.children && cg.children.length > 0 && (
                          <>
                            <div className="w-0.5 h-3 bg-[#64748B]" />
                            <div className="flex flex-col items-center gap-2 w-full">
                              {cg.children.map((sub) => (
                                <OrgNodeCard key={sub.id} node={sub} language={language} />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="space-y-3">
              {/* Filtro textual */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F1F5F9] border border-[#94A3B8]/60">
                <Search className="w-4 h-4 text-[#153684] shrink-0" />
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-transparent text-xs sm:text-sm text-[#0F172A] placeholder:text-[#64748B] focus:outline-none"
                />
              </div>

              {/* Lista Textual Oficial */}
              <div className="space-y-2.5">
                {filteredList.map((dep) => {
                  const depName = language === 'es' ? dep.dependencyEs : dep.dependencyEn;
                  return (
                    <div
                      key={dep.id}
                      className="rounded-xl bg-[#F1F5F9]/90 border border-[#94A3B8]/60 p-3 sm:p-3.5 shadow-sm"
                    >
                      <div className="flex items-center gap-2 text-[#153684] font-display font-bold text-xs sm:text-sm">
                        <Building2 className="w-4 h-4 shrink-0" />
                        <span>
                          {t.dependencyPrefix} {depName}
                        </span>
                      </div>
                      <div className="mt-2 space-y-1">
                        {dep.entries.map((entry, idx) => {
                          const cargo = language === 'es' ? entry.cargoEs : entry.cargoEn;
                          return (
                            <div
                              key={idx}
                              className="px-3 py-1.5 rounded-lg bg-[#CBD5E1]/60 border border-[#94A3B8]/40 text-xs text-[#0F172A] flex flex-wrap items-center justify-between gap-2"
                            >
                              <span>
                                <strong>
                                  {t.cargoPrefix} ({cargo}):
                                </strong>{' '}
                                {depName}
                              </span>
                              <span
                                className={`font-bold ${
                                  entry.isVacant ? 'text-[#475569]' : 'text-[#153684]'
                                }`}
                              >
                                {entry.holder}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
