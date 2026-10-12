import React from 'react';
import { useFielys } from '../../context/FielysContext';
import { CheckSquare, Calendar, RefreshCw, ShieldCheck, Clock, FileText } from 'lucide-react';

export const ServiceContractsView: React.FC = () => {
  const { contracts, createWorkOrder, setActiveTab } = useFielys();

  const handleGeneratePM = (contract: any) => {
    createWorkOrder({
      customerId: contract.customerId,
      customerName: contract.customerName,
      type: 'preventive',
      priority: 'medium',
      title: `Scheduled AMC Preventive Inspection - ${contract.title}`,
      description: `Automated recurring preventative maintenance visit generated under contract ${contract.contractNumber}. Complete diagnostic checklist and cleaning.`,
      contractId: contract.id,
      isWarrantyWork: true
    });
    setActiveTab('work-orders');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Service Contracts, AMCs & Preventative Maintenance</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              RECURRING PM ENGINE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automate recurring maintenance work orders, track SLA quotas, and manage enterprise service level agreements.
          </p>
        </div>
      </div>

      {/* Contract Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contracts.map(contract => {
          const visitsLeft = contract.includedVisitsPerYear - contract.visitsCompleted;

          return (
            <div key={contract.id} className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-xl">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
                    {contract.tier}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5">{contract.title}</h3>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {contract.customerName} · {contract.contractNumber}
                  </div>
                </div>

                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                  contract.status === 'active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-300'
                }`}>
                  {contract.status.replace('_', ' ')}
                </span>
              </div>

              {/* Progress & Quota Bar */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Preventive Visits Completed</span>
                  <span className="text-cyan-400 font-bold">{contract.visitsCompleted} / {contract.includedVisitsPerYear}</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-cyan-500 h-full rounded-full transition-all"
                    style={{ width: `${(contract.visitsCompleted / contract.includedVisitsPerYear) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>{visitsLeft} scheduled visits remaining</span>
                  <span>Emergency Calls: {contract.emergencyCallsUsed} / {contract.includedEmergencyCalls}</span>
                </div>
              </div>

              {/* Contract Terms Box */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded font-mono border border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-500 block">Annual Agreement Value</span>
                  <span className="text-white font-bold">KSh {contract.annualValue.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Billing Cadence</span>
                  <span className="text-slate-200 capitalize">{contract.billingCadence}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Contract Period</span>
                  <span className="text-slate-300 text-[11px]">{contract.startDate} to {contract.endDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Next Auto-PM Batch</span>
                  <span className="text-emerald-400 font-semibold">{contract.nextScheduledGenerationDate}</span>
                </div>
              </div>

              {/* Action Button: Trigger PM Generation */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  Recurrence: Every 30 Days
                </span>
                <button
                  onClick={() => handleGeneratePM(contract)}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Generate PM Work Order</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
