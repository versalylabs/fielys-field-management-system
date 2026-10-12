import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { Subcontractor } from '../../types';
import { 
  Building2, 
  ShieldCheck, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Star
} from 'lucide-react';

export const SubcontractorsView: React.FC = () => {
  const { subcontractors, approveSubcontractorPayout, workOrders } = useFielys();

  const [payoutSuccessMsg, setPayoutSuccessMsg] = useState<string | null>(null);

  const handlePayout = (sub: Subcontractor) => {
    if (sub.pendingPayoutKSh <= 0) return;
    const amount = sub.pendingPayoutKSh;
    approveSubcontractorPayout(sub.id, amount);
    setPayoutSuccessMsg(`Authorized payout of KSh ${amount.toLocaleString()} to ${sub.companyName}. Payment queue notified.`);
    setTimeout(() => setPayoutSuccessMsg(null), 4000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Subcontractor & Partner Crew Management</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              OUTSOURCED WORKFORCE & RATE CARDS
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Dispatch overflow installations and specialized repairs to compliant external contractors with verified rate cards and SLA scoring.
          </p>
        </div>
      </div>

      {/* Success notification banner */}
      {payoutSuccessMsg && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-800 text-emerald-300 rounded-lg text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{payoutSuccessMsg}</span>
        </div>
      )}

      {/* Subcontractor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subcontractors.map(sub => {
          return (
            <div key={sub.id} className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-xl">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
                      {sub.zone}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                      {sub.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1.5">{sub.companyName}</h3>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>Lead: {sub.contactPerson}</span>
                    <span>·</span>
                    <span className="font-mono text-cyan-400">{sub.phone}</span>
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono">
                  <span className="text-[10px] text-slate-500 block">Pending Payout</span>
                  <span className="text-base font-bold text-amber-400">
                    KSh {sub.pendingPayoutKSh.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5">
                {sub.specialties.map(spec => (
                  <span key={spec} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[11px] rounded font-mono">
                    {spec}
                  </span>
                ))}
              </div>

              {/* Compliance & Rate Card Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded font-mono border border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-500 block">Agreed Rate Card</span>
                  <span className="text-white font-bold">
                    KSh {sub.rateCardAmount.toLocaleString()} {sub.rateCardType === 'flat_per_job' ? '/ Job' : '/ Hour'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Insurance & Compliance Expiry</span>
                  <span className="text-emerald-400 font-semibold">{sub.complianceInsuranceExpiry}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">KRA Tax PIN</span>
                  <span className="text-slate-300">{sub.taxPin}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Performance Quality</span>
                  <span className="text-amber-400 font-bold">
                    ⭐ {sub.csatRating} ({sub.firstTimeFixRate}% FTFR)
                  </span>
                </div>
              </div>

              {/* Payout & Work Orders Link */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">
                  Completed: {sub.completedJobsCount} contractor work orders
                </span>

                <button
                  disabled={sub.pendingPayoutKSh <= 0}
                  onClick={() => handlePayout(sub)}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded text-xs font-bold transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Authorize Payout</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
