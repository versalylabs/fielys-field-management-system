import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { 
  Settings, 
  Layers, 
  MapPin, 
  Key, 
  ShieldCheck, 
  CheckCircle2, 
  Link2, 
  Building, 
  DollarSign, 
  Bell,
  RefreshCw,
  Lock,
  Sun,
  Moon
} from 'lucide-react';

export const SystemSettingsAndIntegrations: React.FC = () => {
  const { userRole, resetToMockData, theme, setTheme, toggleTheme } = useFielys();

  const [activeTabSub, setActiveTabSub] = useState<'integrations' | 'territories' | 'rbac' | 'appearance'>('integrations');

  // Integrations state
  const [vensureConnected, setVensureConnected] = useState(true);
  const [fleesioConnected, setFleesioConnected] = useState(true);
  const [darajaConnected, setDarajaConnected] = useState(true);
  const [smsGatewayConnected, setSmsGatewayConnected] = useState(true);

  // Territories
  const territories = [
    { id: 'zone-01', name: 'Westlands & Parklands', branch: 'Nairobi North Hub', activeTechs: 6, openJobs: 11 },
    { id: 'zone-02', name: 'Nairobi Central & Upper Hill', branch: 'CBD Engineering Center', activeTechs: 5, openJobs: 8 },
    { id: 'zone-03', name: 'Industrial Area & Mombasa Rd', branch: 'South Regional Depot', activeTechs: 5, openJobs: 6 },
    { id: 'zone-04', name: 'Kilimani, Karen & Ngong Rd', branch: 'West Sub-Hub', activeTechs: 4, openJobs: 3 }
  ];

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>System Administration & Ecosystem Integrations</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              VERSALY ENTERPRISE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure appearance theme, regional service territories, Versaly native system hooks (Vensure & Fleesio), and M-Pesa payment gateways.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Switch to Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span>Switch to Dark Mode</span>
              </>
            )}
          </button>

          <button
            onClick={resetToMockData}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Simulation State</span>
          </button>
        </div>
      </div>

      {/* Appearance & Theme Banner (Always Accessible in Settings) */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
            {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Interface Theme & Display Mode</h3>
            <p className="text-xs text-slate-400">
              Choose between high-contrast Dark Operations Mode or daylight-friendly Light Mode.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setTheme('light')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
              theme === 'light'
                ? 'bg-cyan-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Light Mode</span>
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
              theme === 'dark'
                ? 'bg-cyan-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>Dark Mode</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-xs font-mono overflow-x-auto">
        <button
          onClick={() => setActiveTabSub('integrations')}
          className={`py-2 px-3 border-b-2 font-semibold cursor-pointer transition-colors whitespace-nowrap ${
            activeTabSub === 'integrations' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          API Integrations & Versaly Hooks
        </button>
        <button
          onClick={() => setActiveTabSub('territories')}
          className={`py-2 px-3 border-b-2 font-semibold cursor-pointer transition-colors whitespace-nowrap ${
            activeTabSub === 'territories' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Branches & Service Territories
        </button>
        <button
          onClick={() => setActiveTabSub('rbac')}
          className={`py-2 px-3 border-b-2 font-semibold cursor-pointer transition-colors whitespace-nowrap ${
            activeTabSub === 'rbac' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          RBAC Security Matrix
        </button>
      </div>

      {/* Tab 1: Integrations */}
      {activeTabSub === 'integrations' && (
        <div className="space-y-4">
          {/* Versaly Vensure Hook */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center font-bold text-cyan-400 font-mono text-sm">
                  VN
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Versaly Vensure Procurement Hook</h3>
                  <p className="text-xs text-slate-400">
                    Auto-forwards Fielys stock replenishment requests into Vensure Purchase Requisitions.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                  {vensureConnected ? 'SYNCED' : 'DISCONNECTED'}
                </span>
                <button
                  onClick={() => setVensureConnected(!vensureConnected)}
                  className="px-2.5 py-1 bg-slate-800 text-slate-300 hover:text-white rounded text-xs font-mono cursor-pointer"
                >
                  {vensureConnected ? 'Pause' : 'Connect'}
                </button>
              </div>
            </div>
            <div className="p-2.5 bg-slate-950 rounded font-mono text-[11px] text-slate-400 border border-slate-800/80 flex items-center justify-between">
              <span>Webhook Endpoint: https://api.vensure.versaly.com/v1/requisitions/fielys</span>
              <span className="text-emerald-400">Handshake Latency: 42ms</span>
            </div>
          </div>

          {/* Versaly Fleesio Fleet Hook */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center font-bold text-indigo-400 font-mono text-sm">
                  FL
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Versaly Fleesio Fleet & Mileage Bridge</h3>
                  <p className="text-xs text-slate-400">
                    Sync technician service vans, fuel consumption logs, and GPS odometer readings directly.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                  {fleesioConnected ? 'SYNCED' : 'DISCONNECTED'}
                </span>
                <button
                  onClick={() => setFleesioConnected(!fleesioConnected)}
                  className="px-2.5 py-1 bg-slate-800 text-slate-300 hover:text-white rounded text-xs font-mono cursor-pointer"
                >
                  {fleesioConnected ? 'Pause' : 'Connect'}
                </button>
              </div>
            </div>
            <div className="p-2.5 bg-slate-950 rounded font-mono text-[11px] text-slate-400 border border-slate-800/80 flex items-center justify-between">
              <span>Vans Tracked: 20 Active Field Support Vehicles</span>
              <span className="text-emerald-400">Odometer Sync: Real-Time</span>
            </div>
          </div>

          {/* M-Pesa Daraja 2.0 API */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center font-bold text-emerald-400 font-mono text-sm">
                  MP
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Safaricom M-Pesa Daraja 2.0 STK Gateway</h3>
                  <p className="text-xs text-slate-400">
                    Instant customer PIN push on job completion with live C2B / Lipa Na M-Pesa reconciliation.
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                ACTIVE
              </span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded font-mono text-[11px] text-slate-400 border border-slate-800/80 flex items-center justify-between">
              <span>Shortcode: 174379 · Passkey: Encrypted in AI Studio Secrets</span>
              <span className="text-cyan-400">Auto-Reconcile Enabled</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Branches & Territories */}
      {activeTabSub === 'territories' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {territories.map(t => (
              <div key={t.id} className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-3 shadow-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">{t.name}</h3>
                    <div className="text-xs text-slate-400 font-mono mt-0.5">{t.branch}</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold">
                    {t.openJobs} Active Jobs
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-2.5 rounded font-mono border border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block">Assigned Crews</span>
                    <span className="text-white font-bold">{t.activeTechs} Technicians</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">SLA Compliance</span>
                    <span className="text-emerald-400 font-bold">96.8% Met</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: RBAC Security Matrix */}
      {activeTabSub === 'rbac' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3 text-xs">
          <h3 className="text-sm font-bold text-white">Role-Based Access Control (RBAC) Permissions</h3>
          <p className="text-slate-400">Strict least-privilege matrix across operational tiers.</p>
          
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left font-mono text-[11px]">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">MODULE</th>
                  <th className="p-2.5">DISPATCHER</th>
                  <th className="p-2.5">TECHNICIAN</th>
                  <th className="p-2.5">STOREKEEPER</th>
                  <th className="p-2.5">FINANCE</th>
                  <th className="p-2.5">CUSTOMER</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  { mod: 'Work Order Dispatch', d: 'Full', t: 'Assigned', s: 'Read', f: 'Read', c: 'None' },
                  { mod: 'Diagnostic Checklists', d: 'Full', t: 'Execute', s: 'None', f: 'Read', c: 'View Final' },
                  { mod: 'Van Stock & Core Return', d: 'Read', t: 'Log Consumed', s: 'Full Store', f: 'Read', c: 'None' },
                  { mod: 'Invoicing & Payments', d: 'Approve', t: 'Collect STK', s: 'None', f: 'Full Admin', c: 'Pay / View' },
                  { mod: 'Customer Asset Registry', d: 'Full', t: 'Scan & View', s: 'Read', f: 'Read', c: 'Own Assets' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="p-2.5 text-white font-sans font-medium">{row.mod}</td>
                    <td className="p-2.5 text-emerald-400">{row.d}</td>
                    <td className="p-2.5 text-cyan-400">{row.t}</td>
                    <td className="p-2.5 text-amber-400">{row.s}</td>
                    <td className="p-2.5 text-indigo-400">{row.f}</td>
                    <td className="p-2.5 text-slate-400">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
