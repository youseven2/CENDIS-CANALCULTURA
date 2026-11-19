import { Home, Monitor, Smartphone, Tablet } from 'lucide-react';
import { DeviceInfo } from '../hooks/useDeviceType';

interface CintilloHeaderProps {
  deviceInfo: DeviceInfo;
  onGoHome: () => void;
}

export function CintilloHeader({ deviceInfo, onGoHome }: CintilloHeaderProps) {
  const { device, label } = deviceInfo;

  const DeviceIcon =
    device === 'mobile' ? Smartphone : device === 'tablet' ? Tablet : Monitor;

  return (
    <header className="w-full shrink-0 bg-white border-b border-gray-200/80 shadow-sm z-30">
      {/* Cintillo tricolor superior inspirado en los colores oficiales */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#F9C80E]" />
        <div className="flex-1 bg-[#153684]" />
        <div className="flex-1 bg-[#C81D25]" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Logos Institucionales */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none group"
          title="Ir al inicio"
        >
          <div className="flex items-center gap-1.5 sm:gap-2.5 bg-gray-50 border border-gray-200/80 rounded-xl px-2 py-1 group-hover:border-[#C81D25]/40 transition-colors">
            <img
              src="/logos/cultura-venezuela.jpg"
              alt="Cultura Venezuela"
              className="h-8 sm:h-10 w-auto object-contain rounded-md"
            />
            <div className="h-6 w-px bg-gray-300" />
            <img
              src="/logos/cendis.jpg"
              alt="Centro Nacional del Disco - CENDIS"
              className="h-7 sm:h-9 w-auto object-contain rounded-md"
            />
          </div>

          {device !== 'mobile' && (
            <div className="hidden md:flex flex-col leading-tight">
              <span className="font-display font-bold text-sm text-[#111827] tracking-tight">
                CENDIS · Canal Cultura
              </span>
              <span className="text-[11px] font-medium text-gray-500">
                Ministerio del Poder Popular para la Cultura
              </span>
            </div>
          )}
        </button>

        {/* Cintillo de navegación: Únicamente Home + Indicador de dispositivo */}
        <nav aria-label="Navegación principal" className="flex items-center gap-2 sm:gap-3">
          <div
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border border-gray-200"
            title={`Resolución actual: ${deviceInfo.width}×${deviceInfo.height}`}
          >
            <DeviceIcon className="w-3.5 h-3.5 text-[#153684]" />
            <span>{label}</span>
          </div>

          <button
            type="button"
            onClick={onGoHome}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#C81D25] hover:bg-[#B12722] active:scale-[0.98] text-white font-display font-semibold text-xs sm:text-sm shadow-sm shadow-[#C81D25]/25 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
