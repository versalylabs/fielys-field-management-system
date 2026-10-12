import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Download, 
  Calendar,
  CheckCircle2,
  Clock,
  Wrench,
  Percent
} from 'lucide-react';

export const ExecutiveAnalyticsView: React.FC = () => {
  const { workOrders, technicians, invoices, contracts, coreReturns, metrics } = useFielys();

  const [dateRange, setDateRange] = useState('Today');

  // Profitability calculations
  const totalBilled = invoices.reduce((acc, inv) => acc + inv.total, 0);
  const totalMargin = invoices.reduce((acc, inv) => acc + (inv.jobProfitability?.netMargin || 0), 0);
  const avgMarginPercentage = totalBilled > 0 ? Math.round((totalMargin / totalBilled) * 100) : 41;

  // FTFR
  const avgFTFR = Math.round(
    technicians.reduce((acc, t) => acc + t.firstTimeFixRate, 0) / technicians.length
  );

  // Asset breakdown frequency
  const breakdownStats = [
    { model: 'Victron Quattro 15kVA Solar Inverter', category: 'Solar', faults: 6, mttrHours: 2.1, status: 'Grid surge sensitive' },
    { model: 'Daikin VRV IV-X Heat Pump Chiller', category: 'HVAC', faults: 5, mttrHours: 3.4, status: 'Condenser dust clogging' },
    { model: 'Huawei SmartAX EA5800 OLT', category: 'ISP', faults: 3, mttrHours: 1.8, status: 'Optical power loss' },
    { model: 'Hikvision 4K IP DarkFighter NVR', category: 'Security', faults: 2, mttrHours: 1.2, status: 'Power board spikes' }
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "WorkOrder,Customer,Technician,Status,Revenue,LaborCost,PartsCost,Margin\n" +
      workOrders.map(w => `${w.orderNumber},${w.customerName},${w.assignedTechnicianName || 'Unassigned'},${w.status},${w.billableTotal},${w.laborCost},${w.partsCost},${w.billableTotal - (w.laborCost + w.partsCost)}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fielys_executive_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Executive Reporting & Profitability Analytics</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              BOARDROOM INTELLIGENCE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time workforce utilization, First-Time Fix Rates, contract margins, and equipment reliability logs.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="Today">Today (Oct 4, 2026)</option>
            <option value="This Week">This Week (Q4 Kickoff)</option>
            <option value="This Month">This Month (October)</option>
            <option value="Year to Date">Year to Date (2026)</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top Level Metric KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <span className="text-[11px] text-slate-400 uppercase">Gross Revenue Run-Rate</span>
          <div className="text-2xl font-bold text-white">
            KSh {metrics.revenueTodayKSh.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.2% vs previous period
          </span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <span className="text-[11px] text-slate-400 uppercase">First-Time Fix Rate (FTFR)</span>
          <div className="text-2xl font-bold text-emerald-400">
            {avgFTFR}%
          </div>
          <span className="text-[10px] text-slate-500">Benchmark target: &gt; 90%</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <span className="text-[11px] text-slate-400 uppercase">True Net Job Margin</span>
          <div className="text-2xl font-bold text-cyan-400">
            {avgMarginPercentage}%
          </div>
          <span className="text-[10px] text-slate-500">After internal labor, parts & fuel</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <span className="text-[11px] text-slate-400 uppercase">Client CSAT Average</span>
          <div className="text-2xl font-bold text-amber-400">
            {metrics.avgCustomerRating.toFixed(1)} / 5.0
          </div>
          <span className="text-[10px] text-slate-500">Verified digital sign-offs</span>
        </div>
      </div>

      {/* Deep-Dive Grid: Technician Productivity vs Equipment Breakdown Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Technician Productivity Scorecard */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Technician Productivity Scorecard</span>
              </h3>
              <p className="text-[11px] text-slate-400">First-Time Fix Rate, completed jobs & customer ratings</p>
            </div>
            <span className="text-xs font-mono text-cyan-400">Fleet Rank</span>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            {technicians.map((tech, idx) => (
              <div key={tech.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-slate-300 text-xs shrink-0">
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <span>{tech.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">({tech.employeeId})</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {tech.zone} · {tech.completedJobsThisMonth} jobs completed
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono shrink-0">
                  <div className="text-emerald-400 font-bold">{tech.firstTimeFixRate}% FTFR</div>
                  <div className="text-amber-400 text-[11px]">⭐ {tech.csatRating} CSAT</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Asset Reliability & Breakdown Frequency */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>Equipment Reliability & Fault Analysis</span>
              </h3>
              <p className="text-[11px] text-slate-400">Most frequent breakdown models & Mean Time to Repair (MTTR)</p>
            </div>
            <span className="text-xs font-mono text-amber-400">MTTR Index</span>
          </div>

          <div className="space-y-3 text-xs">
            {breakdownStats.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-slate-800 text-cyan-400 font-bold">
                      {item.category}
                    </span>
                    <h4 className="font-semibold text-white text-xs mt-1">{item.model}</h4>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-rose-400 font-bold">{item.faults} Incidents</span>
                    <span className="text-slate-400 text-[10px] block">Avg MTTR: {item.mttrHours}h</span>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Primary root cause: <span className="text-slate-300">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Contract Profitability & Revenue Leakage Prevention */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>AMC Maintenance Contract Profitability</span>
            </h3>
            <p className="text-[11px] text-slate-400">Contract annual value vs. parts consumed and labor expenditure</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">Consolidated Margins</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {contracts.map(contract => (
            <div key={contract.id} className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white font-sans">{contract.title}</h4>
                  <div className="text-[11px] text-slate-400">{contract.customerName}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px]">
                  44.6% NET MARGIN
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                <div>
                  <span className="text-slate-500 block">Annual Value</span>
                  <span className="text-white font-bold">KSh {contract.annualValue.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Visits Used</span>
                  <span className="text-slate-300">{contract.visitsCompleted} of {contract.includedVisitsPerYear}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Parts Consumed</span>
                  <span className="text-rose-400 font-semibold">KSh 48,000</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
