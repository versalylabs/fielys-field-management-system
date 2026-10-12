import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { WorkOrderStatus } from '../../types';
import { 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  User, 
  Search,
  CheckSquare,
  ShieldCheck,
  Package,
  ArrowLeft,
  Navigation
} from 'lucide-react';

export const WorkOrderListAndDetail: React.FC = () => {
  const { 
    workOrders, 
    selectedWorkOrderId, 
    setSelectedWorkOrderId, 
    updateWorkOrderStatus, 
    assignTechnicianToWorkOrder,
    updateChecklistItem,
    generateWorkOrderInvoice,
    setActiveTab,
    technicians 
  } = useFielys();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [mobilePane, setMobilePane] = useState<'list' | 'detail'>('list');

  const filteredOrders = workOrders.filter(wo => {
    const matchesStatus = statusFilter === 'all' || wo.status === statusFilter;
    const matchesSearch = 
      wo.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      wo.title.toLowerCase().includes(search.toLowerCase()) ||
      wo.customerName.toLowerCase().includes(search.toLowerCase()) ||
      wo.siteName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const selectedOrder = workOrders.find(w => w.id === selectedWorkOrderId) || workOrders[0];

  const handleSelectOrder = (id: string) => {
    setSelectedWorkOrderId(id);
    setMobilePane('detail');
  };

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile Pane Switcher Header (< lg) */}
      <div className="lg:hidden shrink-0 bg-slate-900 border-b border-slate-800 px-3 py-2 flex items-center gap-2 text-xs font-mono">
        <button
          onClick={() => setMobilePane('list')}
          className={`flex-1 py-1.5 px-3 rounded-md font-semibold transition-colors cursor-pointer ${
            mobilePane === 'list' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
          }`}
        >
          Work Orders List ({filteredOrders.length})
        </button>
        <button
          onClick={() => setMobilePane('detail')}
          className={`flex-1 py-1.5 px-3 rounded-md font-semibold transition-colors cursor-pointer truncate ${
            mobilePane === 'detail' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
          }`}
        >
          Details: {selectedOrder?.orderNumber || 'Select'}
        </button>
      </div>

      {/* Left List Pane (45% on desktop, toggled on mobile) */}
      <div
        className={`w-full lg:w-5/12 border-r border-slate-800 bg-slate-900/60 flex-col flex-1 lg:h-full overflow-hidden ${
          mobilePane === 'list' ? 'flex' : 'hidden lg:flex'
        }`}
      >
        {/* Filter & Search Header */}
        <div className="p-3 border-b border-slate-800 space-y-2 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Work Orders ({filteredOrders.length})
            </span>
            <div className="text-[11px] font-mono text-cyan-400">
              Sorted by Priority & Schedule
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search WO#, client, title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 pl-8 pr-3 text-xs bg-slate-800 border border-slate-700 rounded text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Status Filter Chips */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-mono">
            {['all', 'on_site', 'en_route', 'scheduled', 'unassigned', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2 py-0.5 rounded capitalize whitespace-nowrap cursor-pointer transition-colors ${
                  statusFilter === status
                    ? 'bg-cyan-600 text-white font-bold'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Work Order List */}
        <div className="flex-1 overflow-y-auto min-h-0 divide-y divide-slate-800/80">
          {filteredOrders.map(wo => {
            const isSelected = selectedOrder?.id === wo.id;
            return (
              <div
                key={wo.id}
                onClick={() => handleSelectOrder(wo.id)}
                className={`p-3 cursor-pointer transition-colors text-xs ${
                  isSelected ? 'bg-cyan-950/40 border-l-3 border-cyan-400' : 'hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono font-bold text-cyan-400">{wo.orderNumber}</span>
                      <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded font-bold ${
                        wo.priority === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                        wo.priority === 'high' ? 'bg-amber-950 text-amber-300' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {wo.priority}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{wo.type}</span>
                    </div>
                    <div className="font-semibold text-white mt-1 line-clamp-1">{wo.title}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">{wo.customerName} · {wo.siteName}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 font-mono">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                      wo.status === 'completed' ? 'bg-emerald-950 text-emerald-400' :
                      wo.status === 'on_site' ? 'bg-cyan-950 text-cyan-300' :
                      wo.status === 'en_route' ? 'bg-indigo-950 text-indigo-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {wo.status.replace('_', ' ')}
                    </span>
                    <div className="text-[11px] text-slate-300 font-bold mt-1.5">
                      KSh {wo.billableTotal.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-500" />
                    <span>{wo.assignedTechnicianName || 'Unassigned'}</span>
                  </span>
                  <span className="font-mono text-slate-500">{wo.scheduledTimeWindow}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Detail Pane (55% on desktop, toggled on mobile) */}
      <div
        className={`w-full lg:w-7/12 bg-slate-950 overflow-y-auto flex-1 lg:h-full p-4 sm:p-6 space-y-6 ${
          mobilePane === 'detail' ? 'block' : 'hidden lg:block'
        }`}
      >
        {selectedOrder ? (
          <>
            {/* Mobile Back Button */}
            <button
              onClick={() => setMobilePane('list')}
              className="lg:hidden inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Work Orders List</span>
            </button>

            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-mono font-bold text-cyan-400">{selectedOrder.orderNumber}</span>
                  <span className="text-xs uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {selectedOrder.type}
                  </span>
                  <span className={`text-xs uppercase px-2 py-0.5 rounded font-mono font-bold ${
                    selectedOrder.status === 'completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-cyan-950 text-cyan-400'
                  }`}>
                    {selectedOrder.status.replace('_', ' ')}
                  </span>
                </div>
                <h1 className="text-base sm:text-lg font-bold text-white">{selectedOrder.title}</h1>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{selectedOrder.customerName} · {selectedOrder.siteAddress} ({selectedOrder.zone})</span>
                </p>
              </div>

              {/* Status Update & Invoicing Actions */}
              <div className="flex flex-wrap items-center gap-2 sm:shrink-0 font-mono text-xs">
                {selectedOrder.status !== 'en_route' && selectedOrder.status !== 'on_site' && selectedOrder.status !== 'completed' && (
                  <button
                    onClick={() => updateWorkOrderStatus(selectedOrder.id, 'en_route')}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 rounded font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Dispatch En Route</span>
                  </button>
                )}
                {selectedOrder.status === 'en_route' && (
                  <button
                    onClick={() => updateWorkOrderStatus(selectedOrder.id, 'on_site')}
                    className="px-2.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Mark On Site</span>
                  </button>
                )}
                {selectedOrder.status !== 'completed' ? (
                  <button
                    onClick={() => updateWorkOrderStatus(selectedOrder.id, 'completed')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Complete</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      generateWorkOrderInvoice(selectedOrder.id);
                      setActiveTab('invoicing');
                    }}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Generate Invoice</span>
                  </button>
                )}
              </div>
            </div>

            {/* Timestamps & Field Tracking Data */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-slate-900 p-3 rounded-lg border border-slate-800">
              <div>
                <span className="text-slate-500 text-[11px] block mb-1">Lead Technician</span>
                <select
                  value={selectedOrder.assignedTechnicianId || ''}
                  onChange={(e) => {
                    if (e.target.value) {
                      assignTechnicianToWorkOrder(selectedOrder.id, e.target.value);
                    }
                  }}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white font-medium focus:outline-none focus:border-cyan-500"
                >
                  <option value="">-- Unassigned --</option>
                  {technicians.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Scheduled Window</span>
                <span className="font-mono text-slate-200 mt-1 block">{selectedOrder.scheduledTimeWindow}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">GPS Check-In</span>
                <span className="font-mono text-emerald-400 mt-1 block">
                  {selectedOrder.checkInCoordinates ? `${selectedOrder.checkInCoordinates.lat.toFixed(4)}, ${selectedOrder.checkInCoordinates.lng.toFixed(4)}` : 'Pending Site Arrival'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[11px] block">Job Profitability</span>
                <span className="font-mono text-cyan-400 font-bold mt-1 block">
                  KSh {selectedOrder.billableTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Scope / Instructions */}
            <div className="space-y-1 text-xs">
              <h3 className="font-semibold text-slate-200">Scope of Work & Symptoms</h3>
              <p className="text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                {selectedOrder.description || 'Routine scheduled inspection and maintenance per contract terms.'}
              </p>
            </div>

            {/* Checklists & Safety JSA */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <h3 className="font-semibold text-white flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-cyan-400" />
                  <span>Technical Diagnostics Checklist</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  {selectedOrder.checklist.filter(c => c.isPass).length} / {selectedOrder.checklist.length} Passed
                </span>
              </div>

              {selectedOrder.checklist.length === 0 ? (
                <div className="text-slate-500 text-xs italic">No checklist items configured for this work order type.</div>
              ) : (
                <div className="space-y-2">
                  {selectedOrder.checklist.map(item => (
                    <div key={item.id} className="p-2.5 bg-slate-900 border border-slate-800 rounded flex items-center justify-between gap-2">
                      <div>
                        <div className="font-medium text-slate-200">{item.label}</div>
                        {item.notes && <div className="text-[11px] text-amber-300 font-mono mt-0.5">{item.notes}</div>}
                      </div>
                      <button
                        onClick={() => updateChecklistItem(selectedOrder.id, item.id, !item.isPass)}
                        title="Click to toggle Pass/Fail"
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase shrink-0 cursor-pointer ${
                          item.isPass ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                      >
                        {item.isPass ? 'PASS' : 'FAIL'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Parts Installed on this Job */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <h3 className="font-semibold text-white flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-cyan-400" />
                  <span>Parts & Consumables Consumed</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  Total Parts: KSh {selectedOrder.partsCost.toLocaleString()}
                </span>
              </div>

              {selectedOrder.partsUsed.length === 0 ? (
                <div className="text-slate-500 text-xs italic">No inventory parts consumed on this visit.</div>
              ) : (
                <div className="space-y-2">
                  {selectedOrder.partsUsed.map(part => (
                    <div key={part.id} className="p-2.5 bg-slate-900 border border-slate-800 rounded flex items-center justify-between gap-2">
                      <div>
                        <div className="font-semibold text-white">{part.partName}</div>
                        <div className="text-[11px] font-mono text-slate-400">
                          SKU: {part.partSku} · Qty: {part.quantity} · {part.isBillable ? 'Billable' : 'Warranty Zero-Rated'}
                        </div>
                      </div>
                      <div className="font-mono text-right text-cyan-300 font-semibold shrink-0">
                        KSh {(part.unitPrice * part.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Proof of Service & Customer Sign-off */}
            {selectedOrder.customerSignerName && (
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 text-xs">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Proof of Service Sign-Off Verified</span>
                  </span>
                  <span className="font-mono text-amber-400 font-bold">
                    Rating: {selectedOrder.customerRating || 5}.0 / 5.0 ★
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <span>Signer: {selectedOrder.customerSignerName}</span>
                  <span className="font-mono">{selectedOrder.completedAt?.split('T')[0] || 'Today'}</span>
                </div>

                {selectedOrder.customerFeedback && (
                  <p className="italic text-slate-300 text-[11px]">"{selectedOrder.customerFeedback}"</p>
                )}
              </div>
            )}

            {/* Financial Job Profitability Breakdown */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2 text-xs">
              <h3 className="font-semibold text-white flex flex-wrap items-center justify-between gap-2">
                <span>Job Costing & Profitability</span>
                <span className="text-emerald-400 font-mono font-bold">
                  Net Margin: KSh {(selectedOrder.billableTotal - (selectedOrder.laborCost + selectedOrder.partsCost + selectedOrder.travelMileageCost)).toLocaleString()}
                </span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800 font-mono text-[11px]">
                <div>
                  <span className="text-slate-500 block">Total Revenue</span>
                  <span className="text-white font-bold">KSh {selectedOrder.billableTotal.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Tech Labor Cost</span>
                  <span className="text-slate-300">KSh {selectedOrder.laborCost.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Parts Direct Cost</span>
                  <span className="text-slate-300">KSh {selectedOrder.partsCost.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Travel / Mileage</span>
                  <span className="text-slate-300">KSh {selectedOrder.travelMileageCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-xs">
            Select a work order from the list to view its complete audit lifecycle.
          </div>
        )}
      </div>
    </div>
  );
};
