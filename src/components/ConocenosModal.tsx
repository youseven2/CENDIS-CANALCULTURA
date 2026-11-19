import { Building2, Layers, X } from 'lucide-react';
import { Language } from '../i18n/translations';

interface ConocenosModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const CONTENT = {
  es: {
    badge: 'Ministerio del Poder Popular para la Cultura',
    title: '¡Conócenos! · CENDIS y Canal Cultura',
    intro:
      'Somos una plataforma institucional híbrida adscrita al Ministerio del Poder Popular para la Cultura, creada para unir la preservación sonora nacional con la difusión audiovisual de nuestra identidad cultural.',
    cendisTitle: 'CENTRO NACIONAL DEL DISCO (CENDIS)',
    cendisTag: 'Patrimonio Sonoro y Producción Musical',
    cendisBody:
      'Ente adscrito al Ministerio del Poder Popular para la Cultura encargado de fomentar, producir, digitalizar y resguardar el patrimonio sonoro y discográfico de las cultoras, cultores y agrupaciones musicales de Venezuela.',
    canalTitle: 'CANAL CULTURA VENEZUELA',
    canalTag: 'Señal Audiovisual y Difusión Cultural',
    canalBody:
      'Señal y plataforma audiovisual adscrita al Ministerio del Poder Popular para la Cultura dedicada a proyectar la programación cultural, conciertos, documentales, cine nacional y festivales en todo el territorio.',
    hybridTitle: 'VISIÓN HÍBRIDA INSTITUCIONAL',
    hybridBody:
      'La integración de CENDIS y Canal Cultura permite que la música grabada, los archivos históricos y las presentaciones en vivo lleguen de forma directa, moderna y adaptable a cualquier dispositivo.',
    close: 'Cerrar',
  },
  en: {
    badge: "Ministry of People's Power for Culture",
    title: 'About Us! · CENDIS & Canal Cultura',
    intro:
      "We are a hybrid institutional platform attached to the Ministry of People's Power for Culture, created to unite national sound preservation with the audiovisual broadcast of our cultural identity.",
    cendisTitle: 'NATIONAL DISC CENTER (CENDIS)',
    cendisTag: 'Sound Heritage & Music Production',
    cendisBody:
      "An agency attached to the Ministry of People's Power for Culture responsible for promoting, producing, digitizing, and safeguarding the sound and discographic heritage of Venezuelan musicians and cultural creators.",
    canalTitle: 'CANAL CULTURA VENEZUELA',
    canalTag: 'Audiovisual Signal & Cultural Broadcast',
    canalBody:
      "An audiovisual broadcast and platform attached to the Ministry of People's Power for Culture dedicated to showcasing cultural programming, concerts, documentaries, national cinema, and festivals nationwide.",
    hybridTitle: 'HYBRID INSTITUTIONAL VISION',
    hybridBody:
      'Integrating CENDIS and Canal Cultura allows recorded music, historical archives, and live performances to reach citizens directly through a modern interface adaptable to any device.',
    close: 'Close',
  },
};

export function ConocenosModal({ isOpen, onClose, language }: ConocenosModalProps) {
  if (!isOpen) return null;
  const t = CONTENT[language];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="conocenos-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-[#0F172A]/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90dvh] bg-[#E2E8F0] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#94A3B8]/70 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera llamativa */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#94A3B8]/50 bg-gradient-to-r from-[#CBD5E1] via-[#E2E8F0] to-[#CBD5E1]">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#153684] text-[#F9C80E] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm">
              <Building2 className="w-3.5 h-3.5" />
              {t.badge}
            </span>
            <h3
              id="conocenos-title"
              className="font-display font-extrabold text-lg sm:text-2xl text-[#0F172A] tracking-tight mt-1 truncate"
            >
              {t.title}
            </h3>
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

        <div className="p-4 sm:p-6 overflow-y-auto custom-scroll space-y-4">
          <p className="text-sm sm:text-base text-[#1E293B] leading-relaxed bg-[#F1F5F9]/85 border-l-4 border-[#153684] rounded-2xl p-4 shadow-sm">
            {t.intro}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tarjeta Centro Nacional del Disco con su logo al lado */}
            <div className="rounded-2xl bg-[#CBD5E1]/75 border-2 border-[#C81D25]/40 p-4 space-y-3 shadow-sm">
              <div className="flex items-center gap-3 pb-2.5 border-b border-[#94A3B8]/50">
                <div className="bg-white rounded-xl p-1.5 border border-[#94A3B8]/70 shadow-sm shrink-0">
                  <img
                    src="/logos/cendis.jpg"
                    alt="Logo CENDIS"
                    className="h-9 sm:h-10 w-auto object-contain rounded"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-display font-extrabold text-sm sm:text-base text-[#B12722] tracking-tight leading-snug">
                    {t.cendisTitle}
                  </h4>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#334155]">
                    {t.cendisTag}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed">{t.cendisBody}</p>
            </div>

            {/* Tarjeta Canal Cultura con su logo al lado */}
            <div className="rounded-2xl bg-[#CBD5E1]/75 border-2 border-[#153684]/40 p-4 space-y-3 shadow-sm">
              <div className="flex items-center gap-3 pb-2.5 border-b border-[#94A3B8]/50">
                <div className="bg-white rounded-xl p-1.5 border border-[#94A3B8]/70 shadow-sm shrink-0">
                  <img
                    src="/logos/cultura-venezuela.jpg"
                    alt="Logo Canal Cultura"
                    className="h-9 sm:h-10 w-auto object-contain rounded"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-display font-extrabold text-sm sm:text-base text-[#153684] tracking-tight leading-snug">
                    {t.canalTitle}
                  </h4>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#334155]">
                    {t.canalTag}
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed">{t.canalBody}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-[#153684] via-[#1D4ED8] to-[#1E293B] text-white p-4 sm:p-5 flex items-start gap-3.5 shadow-md">
            <div className="w-10 h-10 rounded-xl bg-[#F9C80E] text-[#0F172A] flex items-center justify-center shrink-0 shadow-sm">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-extrabold text-sm sm:text-base tracking-wide text-[#F9C80E]">
                {t.hybridTitle}
              </h4>
              <p className="text-xs sm:text-sm text-[#E2E8F0] leading-relaxed mt-1">
                {t.hybridBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
