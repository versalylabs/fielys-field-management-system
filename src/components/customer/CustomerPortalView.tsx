import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { ShieldCheck, User, MapPin, Clock, Plus, CheckCircle2, FileText, Smartphone, Star, Printer, Download, X, ArrowLeft } from 'lucide-react';
import { WorkOrder } from '../../types';
import { FielysLogo } from '../common/FielysLogo';

export const CustomerPortalView: React.FC = () => {
  const { customers, assets, workOrders, createTicket, approvals, reviewApproval, userRole, setUserRole } = useFielys();

  const customer = customers[0]; // Apex Commercial Hub
  const customerAssets = assets.filter(a => a.customerId === customer.id);
  const customerJobs = workOrders.filter(w => w.customerId === customer.id);
  const activeJob = customerJobs.find(w => w.status === 'on_site' || w.status === 'en_route');
  const pendingApprovals = approvals.filter(a => a.customerName.includes('Apex') && a.status === 'pending');

  const [showLogTicketModal, setShowLogTicketModal] = useState(false);
  const [selectedReportJob, setSelectedReportJob] = useState<WorkOrder | null>(null);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketPriority, setTicketPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('high');

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-5xl mx-auto">
      {/* Customer Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3.5">
          <FielysLogo className="w-10 h-10 shrink-0 mt-1" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                CLIENT SELF-SERVICE PORTAL
              </span>
              {userRole === 'customer' && (
                <button
                  onClick={() => setUserRole('dispatcher')}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Exit to Dispatcher Console</span>
                </button>
              )}
            </div>
            <h1 className="text-xl font-bold text-white mt-1">{customer.name}</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Head Office: {customer.headOfficeAddress} · Active AMC: Gold Enterprise
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowLogTicketModal(true)}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Service Request</span>
        </button>
      </div>

      {/* Live Dispatched Technician Tracker Card */}
      {activeJob && (
        <div className="p-5 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-800/80 rounded-xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>LIVE TECHNICIAN EN ROUTE / ON SITE</span>
            </span>
            <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2.5 py-0.5 rounded">
              {activeJob.orderNumber}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-lg border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white text-base shrink-0">
                BM
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Brian Mwangi</h3>
                <div className="text-xs text-slate-400 font-mono">
                  Employee ID: TECH-001 · Class T3 Solar PV Specialist
                </div>
                <div className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Verified Organization Badge & Security Cleared</span>
                </div>
              </div>
            </div>

            <div className="sm:text-right font-mono text-xs space-y-1">
              <div className="text-slate-300 font-bold">{activeJob.siteName}</div>
              <div className="text-cyan-400 font-semibold">{activeJob.scheduledTimeWindow}</div>
              <div className="text-[11px] text-slate-500">Service Van: KDF 289T</div>
            </div>
          </div>
        </div>
      )}

      {/* Pending Customer Approvals (Extra work discovered on-site) */}
      {pendingApprovals.length > 0 && (
        <div className="p-5 bg-amber-950/40 border border-amber-800/80 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <span>Authorization Requested for On-Site Extra Work ({pendingApprovals.length})</span>
            </h3>
            <span className="text-xs font-mono text-amber-400">Action Required</span>
          </div>

          <div className="space-y-3">
            {pendingApprovals.map(appr => (
              <div key={appr.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-bold text-white text-sm">{appr.title}</div>
                  <p className="text-slate-400 text-xs mt-1">{appr.description}</p>
                  <div className="text-amber-400 font-mono font-bold mt-1 text-xs">
                    Estimated Cost: KSh {appr.estimatedCost.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => reviewApproval(appr.id, 'approved')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-colors cursor-pointer"
                  >
                    Approve Work
                  </button>
                  <button
                    onClick={() => reviewApproval(appr.id, 'rejected')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors cursor-pointer"
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Customer Registered Assets */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center justify-between">
          <span>Registered Premises Equipment ({customerAssets.length})</span>
          <span className="text-xs font-mono text-slate-400">All Covered under AMC</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customerAssets.map(asset => (
            <div key={asset.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2 text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-semibold">{asset.category}</span>
                  <h3 className="font-bold text-white text-sm mt-0.5">{asset.name}</h3>
                  <div className="text-slate-400 font-mono text-[11px]">S/N: {asset.serialNumber}</div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold uppercase">
                  {asset.status}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Warranty: {asset.warrantyEndDate}</span>
                <span>Next Service: {asset.nextScheduledServiceDate || 'Nov 2026'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Completed Jobs & Downloadable Service Reports */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-white flex items-center justify-between">
          <span>Service History & Signed Digital Reports ({customerJobs.length})</span>
          <span className="text-xs font-mono text-cyan-400">PDF Job Cards Ready</span>
        </h2>

        <div className="space-y-2">
          {customerJobs.map(job => (
            <div key={job.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-cyan-400">{job.orderNumber}</span>
                  <span className="uppercase text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                    {job.type}
                  </span>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                    job.status === 'completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {job.status.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="font-semibold text-white text-xs">{job.title}</h4>
                <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-2">
                  <span>Site: {job.siteName}</span>
                  <span>·</span>
                  <span>Date: {job.scheduledDate}</span>
                  <span>·</span>
                  <span>Engineer: {job.assignedTechnicianName || 'Brian Mwangi'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto shrink-0 font-mono">
                <span className="text-slate-300 font-bold">KSh {job.billableTotal.toLocaleString()}</span>
                <button
                  onClick={() => setSelectedReportJob(job)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Signed Report PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Signed Service Report Preview & Download Modal */}
      {selectedReportJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-xl p-5 space-y-4 text-xs shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">FIELYS DIGITAL JOB CARD & CERTIFICATE</span>
                <h3 className="text-sm font-bold text-white mt-0.5">{selectedReportJob.orderNumber} — {selectedReportJob.title}</h3>
              </div>
              <button onClick={() => setSelectedReportJob(null)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3 font-mono text-[11px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 block">Client Organization:</span>
                  <span className="text-white font-bold">{selectedReportJob.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Site & Scheduled Window:</span>
                  <span className="text-slate-200">{selectedReportJob.siteName} ({selectedReportJob.scheduledDate})</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Lead Field Engineer:</span>
                  <span className="text-cyan-400">{selectedReportJob.assignedTechnicianName || 'Brian Mwangi'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">GPS Verification Stamp:</span>
                  <span className="text-emerald-400">Verified (-1.2685, 36.8042)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-500 block mb-1">Technical Checklist Summary:</span>
                <div className="space-y-1">
                  {selectedReportJob.checklist.map(item => (
                    <div key={item.id} className="flex items-center justify-between text-slate-300">
                      <span>• {item.label}</span>
                      <span className={item.isPass ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {String(item.value)} ({item.isPass ? 'PASS' : 'CHECK'})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 block">Signed Off By Client Representative:</span>
                  <span className="text-white font-bold">{selectedReportJob.customerSignerName || 'Eng. Kennedy Omondi'}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Total Billable Value:</span>
                  <span className="text-sm font-bold text-cyan-400">KSh {selectedReportJob.billableTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-cyan-400" />
                <span>Print Job Card</span>
              </button>
              <button
                onClick={() => {
                  const blob = new Blob(
                    [`FIELYS SIGNED SERVICE REPORT\nOrder: ${selectedReportJob.orderNumber}\nTitle: ${selectedReportJob.title}\nClient: ${selectedReportJob.customerName}\nSite: ${selectedReportJob.siteName}\nEngineer: ${selectedReportJob.assignedTechnicianName}\nTotal: KSh ${selectedReportJob.billableTotal.toLocaleString()}\nStatus: Digitally Signed & Verified`],
                    { type: 'text/plain;charset=utf-8' }
                  );
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${selectedReportJob.orderNumber}-Signed-Report.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                  setSelectedReportJob(null);
                }}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report File</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log Ticket Modal */}
      {showLogTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-5 space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <h2 className="text-sm font-bold text-white">Submit New Service Ticket</h2>
            <div className="space-y-3">
              <div>
                <label className="text-slate-300 font-medium">Issue Summary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solar inverter tripped / High battery discharge"
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 mt-1"
                />
              </div>

              <div>
                <label className="text-slate-300 font-medium">Priority Level</label>
                <select
                  value={ticketPriority}
                  onChange={(e) => setTicketPriority(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 mt-1 font-mono"
                >
                  <option value="low">Low (Standard Scheduling)</option>
                  <option value="medium">Medium (Within 24 Hours)</option>
                  <option value="high">High (Within 4 Hours)</option>
                  <option value="critical">Critical / Outage (Within 1 Hour)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium">Detailed Symptom Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe error code, breaker tripped, or observed behavior..."
                  value={ticketDesc}
                  onChange={(e) => setTicketDesc(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 mt-1"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowLogTicketModal(false)}
                className="flex-1 py-2 bg-slate-800 text-slate-300 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  createTicket({
                    customerId: customer.id,
                    customerName: customer.name,
                    siteId: customer.sites[0].id,
                    siteName: customer.sites[0].name,
                    title: ticketTitle || 'Service Request',
                    description: ticketDesc,
                    priority: ticketPriority,
                    source: 'portal'
                  });
                  setTicketTitle('');
                  setTicketDesc('');
                  setShowLogTicketModal(false);
                }}
                className="flex-1 py-2 bg-cyan-600 text-white rounded font-bold cursor-pointer"
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
