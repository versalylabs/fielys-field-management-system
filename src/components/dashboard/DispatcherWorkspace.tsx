import React from 'react';
import { useFielys } from '../../context/FielysContext';
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Truck,
  Wrench,
  DollarSign
} from 'lucide-react';

export const DispatcherWorkspace: React.FC = () => {
  const { 
    workOrders, 
    technicians, 
    tickets, 
    approvals, 
    metrics, 
    setSelectedWorkOrderId, 
    setActiveTab, 
    assignTechnicianToWorkOrder 
  } = useFielys();

  const unassignedOrders = workOrders.filter(w => !w.assignedTechnicianId || w.status === 'unassigned' || w.status === 'draft');
  const activeOrders = workOrders.filter(w => w.status === 'on_site' || w.status === 'en_route');
  const slaTickets = tickets.filter(t => t.isSlaAtRisk || t.priority === 'critical');
  const pendingApprovals = approvals.filter(a => a.status === 'pending');

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* View Header with live sync */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Dispatcher Live Operations Center</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              LIVE RADAR ACTIVE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-crew orchestration across Westlands, Mombasa Rd, Industrial Area, and Central Nairobi.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button 
            onClick={() => setActiveTab('schedule-board')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            Switch to Gantt Board
          </button>
        </div>
      </div>

      {/* Top Urgent Incident Row: SLA Risks & Pending Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* SLA At-Risk Alerts */}
        <div className="bg-slate-900 border border-rose-900/40 rounded-lg p-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
              <ShieldAlert className="w-4 h-4 text-rose-500 animate-pulse" />
              <span>SLA At-Risk Queue ({slaTickets.length})</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Auto-Escalation Engine</span>
          </div>

          <div className="divide-y divide-slate-800/80 mt-2 space-y-2">
            {slaTickets.map(ticket => (
              <div key={ticket.id} className="pt-2 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white">{ticket.ticketNumber}</span>
                    <span className="text-slate-400 truncate max-w-[240px] font-medium">{ticket.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>{ticket.customerName}</span>
                    <span>·</span>
                    <span className="text-rose-400 font-mono font-medium">Resolution Window &lt; 2h</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedWorkOrderId(ticket.assignedWorkOrderId || 'wo-2026-088');
                    setActiveTab('work-orders');
                  }}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-mono shrink-0 cursor-pointer"
                >
                  Triage Job
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Field Approvals */}
        <div className="bg-slate-900 border border-amber-900/40 rounded-lg p-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Pending Field Authorizations ({pendingApprovals.length})</span>
            </div>
            <button 
              onClick={() => setActiveTab('approvals')}
              className="text-[11px] text-cyan-400 hover:underline font-mono"
            >
              View All Approvals →
            </button>
          </div>

          <div className="divide-y divide-slate-800/80 mt-2 space-y-2">
            {pendingApprovals.map(appr => (
              <div key={appr.id} className="pt-2 flex items-start justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="font-medium text-slate-200 flex items-center gap-2">
                    <span>{appr.title}</span>
                    <span className="text-amber-400 font-mono font-bold">KSh {appr.estimatedCost.toLocaleString()}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>Requested by {appr.technicianName}</span>
                    <span>·</span>
                    <span>{appr.siteName}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('approvals')}
                  className="px-2.5 py-1 bg-amber-900/40 border border-amber-800 hover:bg-amber-800 text-amber-200 rounded text-[11px] font-medium shrink-0 cursor-pointer"
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Unassigned Queue vs Active Fleet Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Unassigned Work Orders (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-sm font-semibold text-white">Unassigned Queue</h2>
              <p className="text-[11px] text-slate-400">Match technician by zone & skill</p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 px-2 py-0.5 bg-amber-950/60 rounded border border-amber-800/50">
              {unassignedOrders.length} Pending
            </span>
          </div>

          <div className="divide-y divide-slate-800/80 mt-3 space-y-3 flex-1 overflow-y-auto">
            {unassignedOrders.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">All work orders dispatched!</div>
            ) : (
              unassignedOrders.map(wo => (
                <div key={wo.id} className="pt-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">{wo.orderNumber}</span>
                      <h3 className="text-xs font-semibold text-white mt-0.5">{wo.title}</h3>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>{wo.siteName} ({wo.zone})</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {wo.type}
                    </span>
                  </div>

                  {/* Skills required */}
                  <div className="flex flex-wrap gap-1 text-[10px] text-slate-400">
                    {wo.requiredSkills.map(s => (
                      <span key={s} className="bg-slate-800 px-1.5 py-0.5 rounded font-mono text-[10px] text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Quick Dispatch Assignment Dropdown */}
                  <div className="flex items-center gap-2 pt-1">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          assignTechnicianToWorkOrder(wo.id, e.target.value);
                        }
                      }}
                      className="w-full text-[11px] bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="">-- Quick Assign Tech --</option>
                      {technicians.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.status.toUpperCase()} · {t.zone})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2 & 3: Active Fleet & Jobs in Progress (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Work Orders In Progress */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-sm font-semibold text-white">Active Jobs On Site / En Route</h2>
                <p className="text-[11px] text-slate-400">GPS verified check-ins and live progress tracking</p>
              </div>
              <button 
                onClick={() => setActiveTab('work-orders')}
                className="text-xs text-cyan-400 hover:underline font-mono"
              >
                View Full Table →
              </button>
            </div>

            <div className="divide-y divide-slate-800 mt-3 space-y-3">
              {activeOrders.map(wo => (
                <div 
                  key={wo.id}
                  onClick={() => {
                    setSelectedWorkOrderId(wo.id);
                    setActiveTab('work-orders');
                  }}
                  className="pt-3 p-2 rounded hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-400 text-xs">{wo.orderNumber}</span>
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                          wo.status === 'on_site' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                        }`}>
                          {wo.status === 'on_site' ? 'ON SITE (GPS CHECKED)' : 'EN ROUTE'}
                        </span>
                        <span className="text-xs font-semibold text-white">{wo.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-3">
                        <span>{wo.customerName}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {wo.siteAddress}
                        </span>
                        <span>·</span>
                        <span className="font-mono text-cyan-300">Lead: {wo.assignedTechnicianName}</span>
                      </div>
                    </div>

                    <div className="text-right sm:shrink-0 font-mono text-xs">
                      <div className="text-slate-300 font-semibold">KSh {wo.billableTotal.toLocaleString()}</div>
                      <div className="text-[11px] text-slate-500">{wo.scheduledTimeWindow}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technician Fleet Live Status Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-sm font-semibold text-white">Technician Fleet Live Status</h2>
                <p className="text-[11px] text-slate-400">Current location, zone, and first-time fix rate</p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                15 On Site · 3 En Route · 2 Available
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {technicians.map(tech => (
                <div key={tech.id} className="p-3 bg-slate-950/60 border border-slate-800 rounded-md flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-xs">
                        {tech.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${
                        tech.status === 'on_site' ? 'bg-emerald-400' : tech.status === 'en_route' ? 'bg-cyan-400' : 'bg-slate-400'
                      }`} />
                    </div>

                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate flex items-center gap-1.5">
                        <span>{tech.name}</span>
                        <span className="text-[10px] font-mono text-slate-400 font-normal">({tech.employeeId})</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate flex items-center gap-1.5">
                        <span className="capitalize text-slate-300 font-mono text-[10px]">{tech.status.replace('_', ' ')}</span>
                        <span>·</span>
                        <span>{tech.zone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 font-mono">
                    <div className="text-[11px] text-emerald-400 font-semibold">{tech.firstTimeFixRate}% FTFR</div>
                    <div className="text-[10px] text-slate-500">⭐ {tech.csatRating}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
