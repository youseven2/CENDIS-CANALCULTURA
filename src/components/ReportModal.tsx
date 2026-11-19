import { BarChart3, CheckCircle2, Disc3, Monitor, Radio, Smartphone, Tablet, X } from 'lucide-react';
import { INSTITUTIONAL_REPORTS, PortalLink } from '../data/portalData';
import { DeviceInfo } from '../hooks/useDeviceType';

interface ReportModalProps {
  activeLink: PortalLink | null;
  deviceInfo: DeviceInfo;
  onClose: () => void;
}

export function ReportModal({ activeLink, deviceInfo, onClose }: ReportModalProps) {
  if (!activeLink) return null;

  const { device, label, width, height } = deviceInfo;
  const DeviceIcon =
    device === 'mobile' ? Smartphone : device === 'tablet' ? Tablet : Monitor;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-[#111827]/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90dvh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-200 bg-[#F8F9FB]">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-3 h-8 rounded-full shrink-0"
              style={{ backgroundColor: activeLink.accent }}
            />
            <div className="min-w-0">
              <h3
                id="modal-title"
                className="font-display font-bold text-base sm:text-lg text-[#111827] truncate"
              >
                {activeLink.title}
              </h3>
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <DeviceIcon className="w-3.5 h-3.5 text-[#153684]" />
                <span>
                  Vista adaptada a <strong>{label}</strong> ({width}×{height}px)
                </span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#C81D25] hover:border-[#C81D25]/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cuerpo Adaptativo */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scroll space-y-4">
          {activeLink.modalType === 'reports' ? (
            <>
              {/* Tarjetas resumen */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#153684]/5 border border-[#153684]/15">
                  <p className="text-xs font-semibold text-[#153684]">Obras CENDIS</p>
                  <p className="font-display font-extrabold text-2xl text-[#111827] mt-1">148</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#C81D25]/5 border border-[#C81D25]/15">
                  <p className="text-xs font-semibold text-[#C81D25]">Horas Canal Cultura</p>
                  <p className="font-display font-extrabold text-2xl text-[#111827] mt-1">1,920</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F9C80E]/15 border border-[#F9C80E]/40">
                  <p className="text-xs font-semibold text-[#111827]">Cobertura Nacional</p>
                  <p className="font-display font-extrabold text-2xl text-[#111827] mt-1">
                    24 Estados
                  </p>
                </div>
              </div>

              {/* Renderizado adaptativo: Tarjetas en Celular, Tabla completa en Tablet/Computadora */}
              {device === 'mobile' ? (
                <div className="space-y-2.5">
                  {INSTITUTIONAL_REPORTS.map((row) => (
                    <div
                      key={row.id}
                      className="p-3.5 rounded-xl border border-gray-200 bg-[#F8F9FB] space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#153684]">{row.area}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F9C80E]/30 text-[#111827]">
                          {row.estado}
                        </span>
                      </div>
                      <p className="font-display font-bold text-sm text-[#111827]">
                        {row.indicador}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-600 pt-1 border-t border-gray-200/70">
                        <span>{row.periodo}</span>
                        <strong className="text-[#C81D25]">{row.valor}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-[#153684] text-white font-display">
                        <th className="py-3 px-4 font-semibold">Código</th>
                        <th className="py-3 px-4 font-semibold">Ente / Área</th>
                        <th className="py-3 px-4 font-semibold">Indicador</th>
                        <th className="py-3 px-4 font-semibold">Periodo</th>
                        <th className="py-3 px-4 font-semibold">Resultado</th>
                        <th className="py-3 px-4 font-semibold">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {INSTITUTIONAL_REPORTS.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 font-mono text-xs text-gray-500">{row.id}</td>
                          <td className="py-3 px-4 font-semibold text-[#153684]">{row.area}</td>
                          <td className="py-3 px-4 text-[#111827]">{row.indicador}</td>
                          <td className="py-3 px-4 text-gray-600">{row.periodo}</td>
                          <td className="py-3 px-4 font-bold text-[#C81D25]">{row.valor}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F9C80E]/25 text-[#111827]">
                              <CheckCircle2 className="w-3 h-3 text-[#153684]" />
                              {row.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-[#F8F9FB] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
                style={{ backgroundColor: activeLink.accent }}
              >
                {activeLink.category === 'canal' ? (
                  <Radio className="w-6 h-6" />
                ) : activeLink.category === 'cendis' ? (
                  <Disc3 className="w-6 h-6" />
                ) : (
                  <BarChart3 className="w-6 h-6" />
                )}
              </div>
              <div className="space-y-1.5">
                <h4 className="font-display font-bold text-base text-[#111827]">
                  Módulo listo para enlazar: {activeLink.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {activeLink.description} Puedes conectar este acceso directo a tu URL oficial de
                  transmisión, catálogo discográfico o sistema interno en{' '}
                  <code className="px-1.5 py-0.5 rounded bg-gray-200 text-xs font-mono">
                    src/data/portalData.ts
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
