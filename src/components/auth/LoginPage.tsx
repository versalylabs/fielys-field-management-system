import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Sun, 
  Moon,
  AlertCircle,
  CheckCircle2,
  Truck
} from 'lucide-react';
import { FielysLogo } from '../common/FielysLogo';

export const LoginPage: React.FC = () => {
  const { login, theme, toggleTheme } = useFielys();
  const [email, setEmail] = useState('versalylabs@gmail.com');
  const [password, setPassword] = useState('labversaly-16');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const success = login(email, password);
    if (!success) {
      setError('Invalid credentials. Please use the demo email (versalylabs@gmail.com) and password (labversaly-16).');
    }
  };

  const handleFillDemo = () => {
    setEmail('versalylabs@gmail.com');
    setPassword('labversaly-16');
    setError(null);
    setCopiedField('filled');
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans relative overflow-hidden">
      {/* Top Bar with Brand & Theme Toggle */}
      <header className="relative z-10 h-16 px-6 lg:px-10 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <FielysLogo className="w-8 h-8 shrink-0" />
          <div className="flex items-baseline gap-2">
            <span className="text-lg tracking-wider font-extrabold text-cyan-400">FIELYS</span>
            <span className="text-xs font-mono text-slate-400">FSM OS · v1.0.4</span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="h-9 px-3 rounded-lg bg-slate-800 border border-slate-700 hover:border-cyan-500/60 text-xs font-mono text-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Left Column: Operational Telemetry & Overview */}
          <div className="lg:col-span-5 p-8 bg-slate-950/70 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/90 border border-cyan-800/70 text-[11px] font-mono text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>VERSALY ENTERPRISE FSM</span>
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Field Service Management & Dispatch Engine
                </h1>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Unified command center for multi-crew dispatch, SLA triage, van stock inventory, and instant M-Pesa Daraja 2.0 billing across East Africa.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                  <Activity className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Real-Time Gantt & SLA Dispatch</div>
                    <div className="text-[11px] text-slate-400">20 active field crews across Nairobi & regional hubs</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                  <Truck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Offline-First Technician PWA</div>
                    <div className="text-[11px] text-slate-400">Safety LOTO checklists, core RMA & van stock sync</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-white">Versaly Ecosystem Native</div>
                    <div className="text-[11px] text-slate-400">Connected to Vensure Procurement & Fleesio Fleet</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Kenya & East Africa Corridor</span>
              <span className="text-emerald-400">99.98% Uptime</span>
            </div>
          </div>

          {/* Right Column: Login Form & Demo Credentials */}
          <div className="lg:col-span-7 p-8 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Sign in to Fielys Console</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Enter your Versaly operator credentials to access the live workspace.
                </p>
              </div>

              {/* Demo Credentials Box */}
              <div className="p-3.5 rounded-xl bg-cyan-950/50 border border-cyan-800/70 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Demo Access Credentials</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-mono font-semibold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    {copiedField === 'filled' ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Filled!</span>
                      </>
                    ) : (
                      <span>Auto-Fill Demo</span>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px]">EMAIL</span>
                    <span className="text-white font-semibold select-all">versalylabs@gmail.com</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">PASSWORD</span>
                    <span className="text-cyan-400 font-semibold select-all">labversaly-16</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-xs text-rose-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Operator Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="versalylabs@gmail.com"
                      className="w-full h-10 pl-9 pr-3 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="•••••••••••••"
                      className="w-full h-10 pl-9 pr-10 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-10 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer mt-2"
                >
                  <span>Sign In to Fielys OS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-6 text-center text-[11px] font-mono text-slate-500 border-t border-slate-800/60">
        VERSALY LABS · FIELYS FIELD SERVICE MANAGEMENT SYSTEM · EAST AFRICA
      </footer>
    </div>
  );
};
