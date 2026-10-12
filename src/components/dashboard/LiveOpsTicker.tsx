import React from 'react';
import { useFielys } from '../../context/FielysContext';

export const LiveOpsTicker: React.FC = () => {
  const { metrics, setActiveTab } = useFielys();

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-3 sm:px-4 py-2 text-xs text-slate-300">
      <div className="flex items-center justify-between gap-x-5 overflow-x-auto whitespace-nowrap pb-1 sm:pb-0 sm:flex-wrap sm:whitespace-normal">
        {/* Metric Group 1: Work Orders */}
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={() => setActiveTab('work-orders')}
            className="font-medium text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            🛠️ <span className="font-mono tabular-nums font-bold text-white">{metrics.workOrdersToday}</span> Work Orders Today
          </button>
          <span className="text-slate-600">·</span>
          <span className="text-emerald-400 font-medium">
            🟢 <span className="font-mono tabular-nums font-bold">{metrics.completed}</span> Completed
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-cyan-400 font-medium">
            🚚 <span className="font-mono tabular-nums font-bold">{metrics.inProgress}</span> In Progress
          </span>
          <span className="text-slate-600">·</span>
          <button 
            onClick={() => setActiveTab('dispatcher-workspace')}
            className="text-amber-400 font-medium hover:underline cursor-pointer"
          >
            ⏳ <span className="font-mono tabular-nums font-bold">{metrics.unassigned}</span> Unassigned
          </button>
        </div>

        {/* Metric Group 2: Fleet Status */}
        <div className="flex items-center gap-2 shrink-0 text-slate-300">
          <button 
            onClick={() => setActiveTab('technicians')}
            className="font-medium hover:text-white transition-colors cursor-pointer"
          >
            👷 <span className="font-mono tabular-nums font-bold text-white">{metrics.totalTechnicians}</span> Technicians
          </button>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">
            📍 <span className="font-mono tabular-nums font-bold text-emerald-400">{metrics.onSite}</span> On Site
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">
            🚗 <span className="font-mono tabular-nums font-bold text-cyan-400">{metrics.enRoute}</span> En Route
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300">
            ⚪ <span className="font-mono tabular-nums font-bold text-slate-400">{metrics.available}</span> Available
          </span>
        </div>

        {/* Metric Group 3: Financial & CSAT */}
        <div className="flex items-center gap-3 text-xs font-mono shrink-0 ml-auto">
          <button
            onClick={() => setActiveTab('invoicing')}
            className="text-slate-300 font-semibold hover:text-cyan-400 transition-colors cursor-pointer"
          >
            💰 Today: <span className="text-white">KSh {(metrics.revenueTodayKSh / 1000).toFixed(0)}K</span>
          </button>
          <span className="text-slate-600">·</span>
          <span className="text-amber-400 font-semibold">
            ⭐ <span className="tabular-nums">{metrics.avgCustomerRating.toFixed(1)}</span> / 5.0
          </span>
        </div>
      </div>

      {/* Sub-bar: Warning & Action Indicators */}
      <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 flex items-center gap-x-4 overflow-x-auto whitespace-nowrap sm:flex-wrap sm:whitespace-normal gap-y-1 text-[11px] text-slate-400">
        <button 
          onClick={() => setActiveTab('tickets')}
          className="hover:text-rose-300 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span className="text-rose-400 font-bold">⚠️ {metrics.slaBreachRiskCount} SLA Risks</span>
        </button>
        <span className="text-slate-700 shrink-0">|</span>

        <button 
          onClick={() => setActiveTab('contracts')}
          className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>🔁 <span className="font-mono tabular-nums text-slate-200 font-medium">{metrics.amcVisitsDueThisWeek}</span> AMC Due This Week</span>
        </button>
        <span className="text-slate-700 shrink-0">|</span>

        <button 
          onClick={() => setActiveTab('inventory')}
          className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>📦 <span className="font-mono tabular-nums text-amber-300 font-medium">{metrics.vanStockAlertsCount}</span> Van Stock Alerts</span>
        </button>
        <span className="text-slate-700 shrink-0">|</span>

        <button 
          onClick={() => setActiveTab('tools')}
          className="hover:text-rose-300 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>🧰 <span className="font-mono tabular-nums text-rose-400 font-medium">{metrics.toolsOverdueCount}</span> Tools Overdue</span>
        </button>
        <span className="text-slate-700 shrink-0">|</span>

        <button 
          onClick={() => setActiveTab('core-returns')}
          className="hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>🔄 <span className="font-mono tabular-nums text-slate-200 font-medium">{metrics.faultyCoresPendingReturn}</span> Cores Pending Return</span>
        </button>
        <span className="text-slate-700 shrink-0">|</span>

        <button 
          onClick={() => setActiveTab('approvals')}
          className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>✋ <span className="font-mono tabular-nums text-amber-400 font-medium">{metrics.approvalsPendingCount}</span> Approvals Pending</span>
        </button>
      </div>
    </div>
  );
};
