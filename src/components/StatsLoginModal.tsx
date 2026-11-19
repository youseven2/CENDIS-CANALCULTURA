import { useEffect, useState } from 'react';
import { Lock, LogIn, User, X } from 'lucide-react';
import { Language } from '../i18n/translations';

interface StatsLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  language: Language;
}

const LABELS = {
  es: {
    title: 'Acceso Administrativo · Estadísticas',
    subtitle: 'Ingresa tus credenciales para consultar las métricas del portal',
    userLabel: 'Usuario',
    userPlaceholder: 'Ingresa el usuario',
    passLabel: 'Clave',
    passPlaceholder: 'Ingresa la clave',
    submit: 'Ingresar',
    error: 'Usuario o clave incorrectos.',
    close: 'Cerrar',
  },
  en: {
    title: 'Admin Access · Statistics',
    subtitle: 'Enter your credentials to view portal metrics',
    userLabel: 'Username',
    userPlaceholder: 'Enter username',
    passLabel: 'Password',
    passPlaceholder: 'Enter password',
    submit: 'Sign In',
    error: 'Invalid username or password.',
    close: 'Close',
  },
};

export function StatsLoginModal({
  isOpen,
  onClose,
  onSuccess,
  language,
}: StatsLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;
  const t = LABELS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'Qwerty123.') {
      setError('');
      onSuccess();
      return;
    }
    setError(t.error);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0F172A]/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#E2E8F0] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#94A3B8]/70 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[#94A3B8]/50 bg-[#CBD5E1]/90">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#153684] text-[#F9C80E] flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3
                id="login-modal-title"
                className="font-display font-bold text-sm sm:text-base text-[#0F172A] truncate"
              >
                {t.title}
              </h3>
              <p className="text-[11px] text-[#334155] truncate">{t.subtitle}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            className="p-1.5 rounded-xl bg-[#E2E8F0] border border-[#94A3B8]/60 text-[#334155] hover:text-[#153684] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="stats-user"
              className="block text-xs font-display font-bold text-[#1E293B]"
            >
              {t.userLabel}
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F1F5F9] border border-[#94A3B8]/70 focus-within:border-[#153684]">
              <User className="w-4 h-4 text-[#153684] shrink-0" />
              <input
                id="stats-user"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t.userPlaceholder}
                className="w-full bg-transparent text-sm text-[#0F172A] placeholder:text-[#64748B] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="stats-pass"
              className="block text-xs font-display font-bold text-[#1E293B]"
            >
              {t.passLabel}
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F1F5F9] border border-[#94A3B8]/70 focus-within:border-[#153684]">
              <Lock className="w-4 h-4 text-[#153684] shrink-0" />
              <input
                id="stats-pass"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t.passPlaceholder}
                className="w-full bg-transparent text-sm text-[#0F172A] placeholder:text-[#64748B] focus:outline-none"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-xs font-semibold text-[#B12722] bg-[#C81D25]/10 border border-[#C81D25]/30 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#153684] hover:bg-[#0F2761] active:scale-[0.99] text-white font-display font-bold text-sm shadow-md transition-all"
          >
            <LogIn className="w-4 h-4 text-[#F9C80E]" />
            <span>{t.submit}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
