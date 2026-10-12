import React from 'react';
import { useFielys } from '../../context/FielysContext';
import { HelpCircle, CheckCircle2, XCircle, Clock, AlertTriangle, User } from 'lucide-react';

export const ApprovalsView: React.FC = () => {
  const { approvals, reviewApproval } = useFielys();

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <span>Escalation & Field Authorization Queue</span>
          <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
            WORKFLOW GOVERNANCE
          </span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Approve or decline on-site additional work, high-value part requisitions, and field expense claims.
        </p>
      </div>

      <div className="space-y-4">
        {approvals.map(appr => (
          <div key={appr.id} className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-bold">
                    {appr.orderNumber}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-semibold">
                    {appr.type.replace('_', ' ')}
                  </span>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                    appr.status === 'approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                    appr.status === 'rejected' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                    'bg-slate-800 text-amber-400'
                  }`}>
                    {appr.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-1.5">{appr.title}</h3>
                <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                  <span>{appr.customerName}</span>
                  <span>·</span>
                  <span>{appr.siteName}</span>
                  <span>·</span>
                  <span className="text-cyan-400 font-mono">Tech: {appr.technicianName}</span>
                </div>
              </div>

              <div className="text-right shrink-0 font-mono">
                <span className="text-slate-400 text-xs block">Estimated Cost</span>
                <span className="text-base font-bold text-amber-400">
                  KSh {appr.estimatedCost.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {appr.description}
            </div>

            {appr.status === 'pending' ? (
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                <button
                  onClick={() => reviewApproval(appr.id, 'rejected', 'Declined by operations manager')}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
                <button
                  onClick={() => reviewApproval(appr.id, 'approved')}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold cursor-pointer transition-colors shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Authorize Request</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Decision logged: {appr.approvedBy || 'Operations Admin'}</span>
                <span>{appr.approvedAt ? new Date(appr.approvedAt).toLocaleDateString() : 'Today'}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
