import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { ServiceReportTemplate, WorkOrder } from '../../types';
import { 
  FileText, 
  Printer, 
  Download, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Calendar, 
  Sliders, 
  X,
  Camera,
  Star
} from 'lucide-react';

export const ServiceReportsView: React.FC = () => {
  const { templates, updateTemplate, workOrders } = useFielys();

  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id || 'tpl-01');
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState(workOrders[0]?.id || '');
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const activeTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];
  const activeOrder = workOrders.find(w => w.id === selectedWorkOrderId) || workOrders[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Configurable Service Report Templates</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              ZERO-CODE CUSTOMIZATION
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Build industry-specific job cards for Solar, HVAC, ISP, Security, or Cleaning with dynamic section visibility and print-ready PDF generation.
          </p>
        </div>

        <button
          onClick={() => setShowPreviewModal(true)}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
        >
          <Eye className="w-4 h-4" />
          <span>Preview Job Card PDF</span>
        </button>
      </div>

      {/* Main Grid: Template Configurator vs Available Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Template Selector & Config Toggles (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white uppercase tracking-wider block">
              Active Template
            </label>
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 font-mono"
            >
              {templates.map(t => (
                <option key={t.id} value={t.id}>{t.name} ({t.industry})</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white uppercase tracking-wider block">
              Sample Work Order to Render
            </label>
            <select
              value={selectedWorkOrderId}
              onChange={(e) => setSelectedWorkOrderId(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 font-mono"
            >
              {workOrders.map(wo => (
                <option key={wo.id} value={wo.id}>
                  {wo.orderNumber} - {wo.customerName} ({wo.status})
                </option>
              ))}
            </select>
          </div>

          {/* Section Visibility Toggles */}
          <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
              Report Section Visibility Controls
            </span>

            {[
              { key: 'showChecklist', label: 'Include Technical Diagnostics Checklist' },
              { key: 'showPricing', label: 'Show Financial Pricing & Labor Costs (Hide for AMC)' },
              { key: 'showBeforeAfterPhotos', label: 'Show Before & After Photo Gallery' },
              { key: 'showAssetSerials', label: 'Include Serialized Equipment QR / S/N Tags' },
              { key: 'showSafetySignoff', label: 'Include Safety Risk JSA & Customer Sign-Off' }
            ].map(item => {
              const isChecked = (activeTemplate as any)[item.key];
              return (
                <label 
                  key={item.key}
                  onClick={() => updateTemplate(activeTemplate.id, { [item.key]: !isChecked })}
                  className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800 cursor-pointer hover:bg-slate-800/40"
                >
                  <span className="text-slate-300 pr-2">{item.label}</span>
                  <div className={`w-8 h-4 rounded-full transition-colors relative ${isChecked ? 'bg-cyan-600' : 'bg-slate-800'}`}>
                    <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${isChecked ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                </label>
              );
            })}
          </div>

          {/* Custom Header Notes */}
          <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
            <label className="text-slate-300 font-medium block">Regulatory / Header Subtitle</label>
            <input
              type="text"
              value={activeTemplate.customHeaderNote}
              onChange={(e) => updateTemplate(activeTemplate.id, { customHeaderNote: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs"
            />
          </div>
        </div>

        {/* Right: Real-time Live Document Preview (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 shadow-2xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Live Customer Report Preview</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">A4 Printable Format</span>
          </div>

          {/* Simulated White Paper / Digital Sheet */}
          <div className="bg-white text-slate-900 rounded-lg p-6 space-y-5 shadow-2xl text-xs font-sans selection:bg-cyan-100 selection:text-cyan-900">
            {/* Report Header */}
            <div className="flex items-start justify-between border-b pb-4 border-slate-200">
              <div>
                <div className="text-base font-extrabold tracking-tight text-slate-900">VERSALY FIELYS</div>
                <div className="text-[11px] font-mono text-slate-600 font-semibold uppercase tracking-wider">
                  Field Service Management OS · Kenya
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  EPRA & NCA Certified Engineering Support · Support: +254 722 000 000
                </div>
              </div>

              <div className="text-right font-mono">
                <div className="text-sm font-bold text-slate-900">{activeOrder.orderNumber}</div>
                <div className="text-[11px] text-cyan-700 font-bold uppercase">{activeTemplate.name}</div>
                <div className="text-[10px] text-slate-500">Date: {activeOrder.scheduledDate}</div>
              </div>
            </div>

            {/* Customer & Site Details Grid */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Customer</span>
                <span className="font-bold text-slate-900">{activeOrder.customerName}</span>
                <span className="text-[11px] text-slate-600 block mt-0.5">{activeOrder.siteAddress}</span>
              </div>
              <div className="font-mono">
                <span className="text-[10px] uppercase text-slate-500 block">Lead Field Engineer</span>
                <span className="font-bold text-slate-900">{activeOrder.assignedTechnicianName || 'Brian Mwangi'}</span>
                <span className="text-[11px] text-slate-600 block mt-0.5">Time: {activeOrder.scheduledTimeWindow}</span>
              </div>
            </div>

            {/* Scope / Instructions */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Scope & Findings</span>
              <p className="text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-200 leading-relaxed text-[11px]">
                {activeOrder.technicianNotes || activeOrder.description}
              </p>
            </div>

            {/* Checklist Section (Conditional) */}
            {activeTemplate.showChecklist && activeOrder.checklist.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                  Diagnostic Checklist Readings
                </span>
                <div className="border border-slate-200 rounded divide-y divide-slate-200 text-[11px]">
                  {activeOrder.checklist.map(chk => (
                    <div key={chk.id} className="p-2 flex items-center justify-between">
                      <span className="text-slate-800">{chk.label}</span>
                      <span className={`font-mono font-bold text-[10px] px-1.5 py-0.2 rounded uppercase ${
                        chk.isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {chk.isPass ? 'Pass' : 'Defect'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Parts Used Section */}
            {activeOrder.partsUsed.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                  Components Installed on Premise
                </span>
                <div className="border border-slate-200 rounded divide-y divide-slate-200 text-[11px]">
                  {activeOrder.partsUsed.map(part => (
                    <div key={part.id} className="p-2 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-slate-900">{part.partName}</span>
                        <span className="text-[10px] font-mono text-slate-500 block">SKU: {part.partSku} (Qty: {part.quantity})</span>
                      </div>
                      {activeTemplate.showPricing && (
                        <span className="font-mono font-bold text-slate-900">
                          KSh {(part.unitPrice * part.quantity).toLocaleString()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Before & After Photo Gallery */}
            {activeTemplate.showBeforeAfterPhotos && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                  Photographic Proof of Service (Before & After)
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 block">Initial Diagnostic State</span>
                    <div className="relative h-28 rounded border border-slate-200 bg-slate-100 overflow-hidden flex items-center justify-center">
                      {activeOrder.beforePhotos.length > 0 ? (
                        <img 
                          src={activeOrder.beforePhotos[0]} 
                          alt="Before Service Diagnostic" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="text-[10px] text-slate-400 font-mono">Photo Attached [Diagnostic State]</div>
                      )}
                      <span className="absolute bottom-1 left-1 bg-black/70 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                        BEFORE
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 block">Post-Execution Rectified State</span>
                    <div className="relative h-28 rounded border border-slate-200 bg-slate-100 overflow-hidden flex items-center justify-center">
                      {activeOrder.afterPhotos.length > 0 ? (
                        <img 
                          src={activeOrder.afterPhotos[0]} 
                          alt="After Service Rectification" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="text-[10px] text-slate-400 font-mono">Photo Attached [Completed State]</div>
                      )}
                      <span className="absolute bottom-1 left-1 bg-emerald-900/90 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                        AFTER (CLEANED & TESTED)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Sign-off & Finger Signature */}
            {activeTemplate.showSafetySignoff && (
              <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-4 items-end">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Client Acknowledgment</span>
                  <div className="text-slate-900 font-bold mt-1">{activeOrder.customerSignerName || 'Eng. Kennedy Omondi'}</div>
                  <div className="text-[10px] text-slate-500 font-mono">Customer Rating: 5.0 / 5.0 ★</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Digital Signature Verified</span>
                  <div className="font-mono text-xs italic text-cyan-800 font-bold mt-1">
                    ✓ [Digitally Signed on Screen]
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">GPS: -1.2685, 36.8042</div>
                </div>
              </div>
            )}

            {/* Footer Terms */}
            <div className="pt-2 border-t border-slate-200 text-[9px] text-slate-500 font-mono leading-tight">
              {activeTemplate.termsAndConditions}
            </div>
          </div>

          {/* Print & Export Bar */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Job Card</span>
            </button>
            <button
              onClick={() => alert(`Report for ${activeOrder.orderNumber} generated in PDF format!`)}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Signed PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-3xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Full Service Report Preview</h3>
              <button onClick={() => setShowPreviewModal(false)}>
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>
            
            <div className="bg-white text-slate-900 p-8 rounded-lg space-y-6 shadow-xl text-xs">
              <div className="flex justify-between border-b pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">FIELYS SERVICE REPORT</h2>
                  <p className="text-slate-600 text-[11px] font-mono">Job Card: {activeOrder.orderNumber}</p>
                </div>
                <div className="text-right font-mono">
                  <div className="font-bold">{activeOrder.scheduledDate}</div>
                  <div className="text-slate-600 text-[11px]">{activeOrder.siteName}</div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900">Work Performed:</span>
                <p className="text-slate-700 bg-slate-50 p-3 rounded border leading-relaxed">
                  {activeOrder.description}
                </p>
              </div>

              <div className="flex justify-between pt-4 border-t text-[11px] text-slate-600">
                <span>Verified by Lead Tech: {activeOrder.assignedTechnicianName}</span>
                <span>Client Signer: {activeOrder.customerSignerName}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded text-xs"
              >
                Close
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-cyan-600 text-white rounded text-xs font-bold"
              >
                Print Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
