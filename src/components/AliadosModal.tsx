import { Building2, Handshake, X } from 'lucide-react';
import { Language } from '../i18n/translations';
import { AllyItem, CENDIS_ALLIES } from './AliadosStrip';

interface AliadosModalProps {
  selectedAlly: AllyItem | null;
  onClose: () => void;
  language: Language;
}

export function AliadosModal({ selectedAlly, onClose, language }: AliadosModalProps) {
  if (!selectedAlly) return null;

  const isEs = language === 'es';
  const title = isEs
    ? 'Aliados Institucionales · Ministerio del Poder Popular para la Cultura'
    : "Institutional Allies · Ministry of People's Power for Culture";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="aliados-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0F172A]/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90dvh] bg-[#E2E8F0] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#94A3B8]/70 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-[#94A3B8]/50 bg-[#CBD5E1]/90">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#153684] text-[#F9C80E] flex items-center justify-center shrink-0">
              <Handshake className="w-4 h-4" />
            </div>
            <h3
              id="aliados-title"
              className="font-display font-bold text-sm sm:text-base text-[#0F172A] truncate"
            >
              {title}
            </h3>
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

        <div className="p-4 sm:p-6 overflow-y-auto custom-scroll grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CENDIS_ALLIES.map((ally) => {
            const isActive = ally.id === selectedAlly.id;
            return (
              <div
                key={ally.id}
                className={`rounded-2xl p-3.5 border-2 transition-all ${
                  isActive
                    ? 'bg-white border-[#153684] shadow-md'
                    : 'bg-[#F1F5F9]/85 border-[#94A3B8]/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: ally.accent }}
                  >
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                      {ally.shortName}
                    </span>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-[#0F172A] truncate">
                      {isEs ? ally.fullNameEs : ally.fullNameEn}
                    </h4>
                  </div>
                </div>
                <p className="mt-2 text-xs text-[#334155] leading-relaxed">
                  {isEs ? ally.descEs : ally.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
