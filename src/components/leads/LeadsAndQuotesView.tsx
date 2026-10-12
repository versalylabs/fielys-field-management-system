import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { Lead, Quotation } from '../../types';
import { 
  FileText, 
  Plus, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  User, 
  DollarSign, 
  ArrowRight, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

export const LeadsAndQuotesView: React.FC = () => {
  const { 
    leads, 
    quotations, 
    technicians, 
    createLead, 
    convertLeadToCustomerAndWorkOrder, 
    approveQuotation, 
    setActiveTab, 
    setSelectedWorkOrderId 
  } = useFielys();

  const [activeTabSub, setActiveTabSub] = useState<'leads' | 'quotes'>('leads');
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('+254 7');
  const [email, setEmail] = useState('');
  const [serviceRequested, setServiceRequested] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [zone, setZone] = useState('Westlands & Parklands');
  const [surveyDate, setSurveyDate] = useState('2026-10-06');
  const [assignedSurveyorId, setAssignedSurveyorId] = useState('tech-1');
  const [budget, setBudget] = useState('950000');

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    const surveyor = technicians.find(t => t.id === assignedSurveyorId);
    createLead({
      companyName,
      contactName,
      phone,
      email,
      serviceRequested,
      siteAddress,
      zone,
      surveyDate,
      assignedSurveyorId,
      assignedSurveyorName: surveyor?.name,
      estimatedBudgetKSh: parseFloat(budget) || 500000,
      status: 'survey_scheduled'
    });
    setShowNewLeadModal(false);
  };

  const handleConvertLead = (leadId: string) => {
    const res = convertLeadToCustomerAndWorkOrder(leadId);
    if (res) {
      setSelectedWorkOrderId(res.workOrder.id);
      setActiveTab('work-orders');
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Lead Intake, Site Surveys & Quotations</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              LIGHTWEIGHT CRM TO WORK ORDER
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Bridge new business inquiries, schedule site assessments, produce repair quotes, and convert Won deals into active work orders with zero bloat.
          </p>
        </div>

        <button
          onClick={() => setShowNewLeadModal(true)}
          className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Lead / Survey Intake</span>
        </button>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-xs font-mono">
        <button
          onClick={() => setActiveTabSub('leads')}
          className={`py-2 px-3 border-b-2 font-semibold cursor-pointer transition-colors ${
            activeTabSub === 'leads' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Prospects & Site Surveys ({leads.length})
        </button>
        <button
          onClick={() => setActiveTabSub('quotes')}
          className={`py-2 px-3 border-b-2 font-semibold cursor-pointer transition-colors ${
            activeTabSub === 'quotes' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Detailed Quotations & Estimates ({quotations.length})
        </button>
      </div>

      {/* View 1: Leads & Site Surveys */}
      {activeTabSub === 'leads' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leads.map(lead => {
              const isWon = lead.status === 'won';

              return (
                <div key={lead.id} className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                          isWon ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                          lead.status === 'quoted' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                          'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {lead.status.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{lead.zone}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1.5">{lead.companyName}</h3>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>Contact: {lead.contactName}</span>
                        <span>·</span>
                        <span className="font-mono text-cyan-400">{lead.phone}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 font-mono">
                      <span className="text-[10px] text-slate-500 block">Estimated Budget</span>
                      <span className="text-sm font-bold text-white">
                        KSh {lead.estimatedBudgetKSh.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1">
                    <div className="text-slate-300 font-medium">Service Needed:</div>
                    <div className="text-slate-400 leading-relaxed">{lead.serviceRequested}</div>
                    {lead.surveyNotes && (
                      <div className="text-[11px] text-amber-300 font-mono pt-1 border-t border-slate-800/80">
                        Survey Notes: {lead.surveyNotes}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950/60 p-2.5 rounded font-mono border border-slate-800/80">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Site Assessment Date</span>
                      <span className="text-slate-200">{lead.surveyDate || 'Pending Schedule'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Assigned Surveyor</span>
                      <span className="text-cyan-300">{lead.assignedSurveyorName || 'Brian Mwangi'}</span>
                    </div>
                  </div>

                  {/* One-Click Won Conversion Action */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    <span className="text-[11px] text-slate-400">
                      Premise: {lead.siteAddress}
                    </span>

                    {!isWon ? (
                      <button
                        onClick={() => handleConvertLead(lead.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Won deal ➔ Convert to Work Order</span>
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Active Customer & Dispatched WO</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: Quotations & Estimates */}
      {activeTabSub === 'quotes' && (
        <div className="space-y-4">
          {quotations.map(quote => (
            <div key={quote.id} className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">{quote.quoteNumber}</span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                      quote.status === 'approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {quote.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{quote.title}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {quote.customerName} · {quote.siteName}
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono">
                  <span className="text-xs text-slate-500 block">Total Quotation Value</span>
                  <span className="text-lg font-bold text-cyan-400">
                    KSh {quote.total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Items Table */}
              <div className="bg-slate-950 rounded-lg border border-slate-800 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/60 text-slate-400 font-mono text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">ITEM DESCRIPTION</th>
                      <th className="py-2.5 px-3">CATEGORY</th>
                      <th className="py-2.5 px-3">QTY</th>
                      <th className="py-2.5 px-3">UNIT PRICE</th>
                      <th className="py-2.5 px-3">AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    {quote.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="py-2.5 px-3 font-sans font-medium text-slate-200">{item.description}</td>
                        <td className="py-2.5 px-3 text-slate-400 capitalize">{item.category}</td>
                        <td className="py-2.5 px-3 text-slate-300">{item.quantity}</td>
                        <td className="py-2.5 px-3 text-slate-300">KSh {item.unitPrice.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-white font-bold">KSh {item.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals & Approval Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="text-xs text-slate-400 font-mono">
                  Valid until: {quote.validUntil} · {quote.notes}
                </div>

                <div className="flex items-center gap-3">
                  {quote.status !== 'approved' ? (
                    <button
                      onClick={() => approveQuotation(quote.id)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Quote & Convert</span>
                    </button>
                  ) : (
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Quote Approved by Client</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Lead Modal */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-lg p-5 space-y-4 text-xs shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-sm font-bold text-white">Log Prospect & Schedule Site Survey</h2>
            <form onSubmit={handleCreateLead} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium">Company / Estate Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Serena Hotel or Karen Estate"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Primary Contact</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eng. Mwangi"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium">Phone</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium">Requested Service & Requirements</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. 15kVA Solar Inverter backup or Chiller retrofitting..."
                  value={serviceRequested}
                  onChange={(e) => setServiceRequested(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium">Physical Address</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Waiyaki Way, Westlands"
                    value={siteAddress}
                    onChange={(e) => setSiteAddress(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Service Corridor / Zone</label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  >
                    <option value="Westlands & Parklands">Westlands & Parklands</option>
                    <option value="Nairobi Central & Upper Hill">Nairobi Central & Upper Hill</option>
                    <option value="Industrial Area & Mombasa Rd">Industrial Area & Mombasa Rd</option>
                    <option value="Kilimani & Ngong Rd">Kilimani & Ngong Rd</option>
                    <option value="Rift Valley Corridor">Rift Valley Corridor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="text-slate-300 font-medium">Survey Assessment Date</label>
                  <input
                    type="date"
                    value={surveyDate}
                    onChange={(e) => setSurveyDate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Estimated Client Budget (KSh)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="flex-1 py-2 bg-slate-800 text-slate-300 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-cyan-600 text-white rounded font-bold cursor-pointer"
                >
                  Create & Schedule Survey
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
