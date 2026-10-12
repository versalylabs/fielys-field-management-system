import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { ServiceTicket } from '../../types';
import { 
  Layers, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  MapPin, 
  User, 
  ShieldAlert, 
  ArrowRight,
  Filter
} from 'lucide-react';

export const ServiceTicketsView: React.FC = () => {
  const { tickets, customers, convertTicketToWorkOrder, createTicket, setActiveTab, setSelectedWorkOrderId } = useFielys();

  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || 'cust-1');
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketPriority, setTicketPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [ticketSource, setTicketSource] = useState<'portal' | 'phone' | 'whatsapp' | 'amc_trigger'>('phone');

  const filteredTickets = tickets.filter(t => {
    return filterPriority === 'all' || t.priority === filterPriority;
  });

  const handleConvert = (ticketId: string) => {
    const wo = convertTicketToWorkOrder(ticketId);
    if (wo) {
      setSelectedWorkOrderId(wo.id);
      setActiveTab('work-orders');
    }
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === selectedCustomerId) || customers[0];
    createTicket({
      customerId: cust.id,
      customerName: cust.name,
      siteId: cust.sites[0]?.id || 'site-1',
      siteName: cust.sites[0]?.name || 'Main Premise',
      title: ticketTitle || 'Urgent Field Service Request',
      description: ticketDesc || 'Customer reported equipment fault requiring technician dispatch.',
      priority: ticketPriority,
      source: ticketSource,
    });
    setTicketTitle('');
    setTicketDesc('');
    setShowLogModal(false);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex flex-wrap items-center gap-2">
            <span>Service Requests & Ticketing Funnel</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
              SLA ENFORCEMENT ENGINE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Multi-channel request intake from customer portal, AMC triggers, and call center with countdown timers.
          </p>
        </div>

        {/* Priority Filter & New Ticket Action */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Priority:</span>
          {['all', 'critical', 'high', 'medium', 'low'].map(p => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-2 py-1 rounded capitalize cursor-pointer transition-colors ${
                filterPriority === p ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setShowLogModal(true)}
            className="ml-auto sm:ml-2 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md text-xs font-sans font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Service Ticket</span>
          </button>
        </div>
      </div>

      {/* Ticket Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTickets.map(ticket => {
          const isAtRisk = ticket.isSlaAtRisk || ticket.priority === 'critical';
          const isConverted = ticket.status === 'converted';

          return (
            <div 
              key={ticket.id} 
              className={`p-5 bg-slate-900 border rounded-xl space-y-4 shadow-xl transition-all ${
                isAtRisk && !isConverted ? 'border-rose-800/80 bg-slate-900/90' : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">{ticket.ticketNumber}</span>
                    <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded font-bold ${
                      ticket.priority === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      ticket.priority === 'high' ? 'bg-amber-950 text-amber-300' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {ticket.priority}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">{ticket.source}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1.5 line-clamp-1">{ticket.title}</h3>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                    <span className="truncate">{ticket.customerName} · {ticket.siteName}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold shrink-0 ${
                  isConverted ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-300'
                }`}>
                  {ticket.status}
                </span>
              </div>

              {/* Description */}
              <div className="p-2.5 bg-slate-950 rounded text-xs text-slate-300 line-clamp-2 leading-relaxed border border-slate-800/80">
                {ticket.description}
              </div>

              {/* SLA Timers & Deadlines */}
              <div className="p-2.5 bg-slate-950/80 rounded font-mono text-[11px] border border-slate-800/80 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">SLA Response Window:</span>
                  <span className={isAtRisk && !isConverted ? 'text-rose-400 font-bold flex items-center gap-1 animate-pulse' : 'text-slate-300'}>
                    <Clock className="w-3 h-3" />
                    <span>&lt; 30 mins</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Resolution Deadline:</span>
                  <span className="text-slate-300">Within 6 Hours</span>
                </div>
                {ticket.assetName && (
                  <div className="pt-1 border-t border-slate-800 text-[10px] text-cyan-300 truncate">
                    Asset: {ticket.assetName}
                  </div>
                )}
              </div>

              {/* Triage / Conversion Button */}
              <div className="pt-1 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">
                  Reported: {ticket.reportedAt.split('T')[1]?.slice(0, 5) || '09:00'} EAT
                </span>

                {!isConverted ? (
                  <button
                    onClick={() => handleConvert(ticket.id)}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-semibold cursor-pointer shadow-md flex items-center gap-1.5 transition-colors"
                  >
                    <span>Triage ➔ Convert to WO</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedWorkOrderId(ticket.assignedWorkOrderId || 'wo-2026-088');
                      setActiveTab('work-orders');
                    }}
                    className="text-cyan-400 text-xs font-mono hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Work Order</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Log New Service Ticket Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-5 space-y-4 text-xs shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Log New Service Request Ticket</span>
            </h2>
            <form onSubmit={handleCreateTicket} className="space-y-3">
              <div>
                <label className="text-slate-300 font-medium">Customer Account</label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => setSelectedCustomerId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                >
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.type})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium">Issue Summary</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chiller Compressor High Pressure Trip"
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium">Priority</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  >
                    <option value="critical">Critical (1h SLA)</option>
                    <option value="high">High (4h SLA)</option>
                    <option value="medium">Medium (24h SLA)</option>
                    <option value="low">Low (48h SLA)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Intake Channel</label>
                  <select
                    value={ticketSource}
                    onChange={(e) => setTicketSource(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  >
                    <option value="phone">Call Center / Phone</option>
                    <option value="whatsapp">WhatsApp Business</option>
                    <option value="portal">Client Self-Service Portal</option>
                    <option value="amc_trigger">AMC Automated Trigger</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium">Fault & Symptom Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter error codes, affected floor/wing, or site contact notes..."
                  value={ticketDesc}
                  onChange={(e) => setTicketDesc(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-2 bg-slate-800 text-slate-300 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold cursor-pointer"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
