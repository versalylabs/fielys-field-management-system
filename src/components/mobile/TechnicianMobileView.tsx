import React, { useState, useRef } from 'react';
import { useFielys } from '../../context/FielysContext';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckSquare, 
  Package, 
  RotateCcw, 
  Camera, 
  PenTool, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft,
  ChevronRight,
  Wifi,
  WifiOff,
  User,
  Wrench,
  Sparkles,
  Phone,
  DollarSign
} from 'lucide-react';
import { FielysLogo } from '../common/FielysLogo';

export const TechnicianMobileView: React.FC = () => {
  const {
    activeTechnicianId,
    setActiveTechnicianId,
    technicians,
    workOrders,
    inventory,
    isOnline,
    toggleOfflineMode,
    updateWorkOrderStatus,
    updateChecklistItem,
    updateSafetyAssessment,
    addPartToWorkOrder,
    submitApproval,
    logCoreReturn,
    signOffWorkOrder,
    userRole,
    setUserRole
  } = useFielys();

  const currentTech = technicians.find(t => t.id === activeTechnicianId) || technicians[0];
  const myJobs = workOrders.filter(w => w.assignedTechnicianId === currentTech.id);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const activeJob = myJobs.find(w => w.id === selectedJobId) || myJobs.find(w => w.status === 'on_site' || w.status === 'en_route') || myJobs[0] || workOrders[0];

  const [activeStepTab, setActiveStepTab] = useState<'details' | 'safety' | 'checklist' | 'parts' | 'signature'>('details');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showCoreReturnModal, setShowCoreReturnModal] = useState(false);
  const [showPartsModal, setShowPartsModal] = useState(false);

  // Field Expense State
  const [expenseDesc, setExpenseDesc] = useState('City Council Parking & Loading Bay Access Fee');
  const [expenseAmount, setExpenseAmount] = useState('1200');
  const [expenseCategory, setExpenseCategory] = useState('Parking & Tolls');

  // Signature state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signerName, setSignerName] = useState(activeJob?.customerSignerName || 'Eng. Kennedy Omondi');
  const [rating, setRating] = useState(5);
  const [signatureSaved, setSignatureSaved] = useState(!!activeJob?.customerSignature);

  // Approval Form State
  const [extraWorkTitle, setExtraWorkTitle] = useState('Replace Damaged SPD Cartridge L2 & Line Choke');
  const [extraWorkCost, setExtraWorkCost] = useState('8500');
  const [extraWorkDesc, setExtraWorkDesc] = useState('Grid transient destroyed secondary surge suppressor.');

  // Core Return Form State
  const [removedPartName, setRemovedPartName] = useState('Dehn Surge Cartridge 40kA (Blown)');
  const [removedPartSerial, setRemovedPartSerial] = useState('DHN-2023-4410-X');
  const [removedPartCondition, setRemovedPartCondition] = useState<'burned_out' | 'repairable' | 'warranty_defect' | 'scrap'>('burned_out');

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#06b6d4'; // cyan-500
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureSaved(false);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !activeJob) return;
    const dataUrl = canvas.toDataURL();
    signOffWorkOrder(activeJob.id, dataUrl, signerName, rating, 'Work completed satisfactorily.');
    setSignatureSaved(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center pb-24">
      {/* Mobile Device Container Frame (Thumb Zone ergonomic) */}
      <div className="w-full max-w-md bg-slate-900 border-x border-slate-800 flex flex-col min-h-screen shadow-2xl">
        
        {/* Mobile Top App Bar (56px) */}
        <div className="sticky top-0 z-30 h-14 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <FielysLogo className="w-7 h-7 shrink-0" />
            <div className="w-7 h-7 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
              {currentTech.avatar}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <select
                  value={currentTech.id}
                  onChange={(e) => {
                    setActiveTechnicianId(e.target.value);
                    setSelectedJobId('');
                  }}
                  className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer truncate"
                >
                  {technicians.map(t => (
                    <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                      {t.name} ({t.employeeId})
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-[10px] text-slate-400 font-mono truncate">
                Van: {currentTech.vehiclePlate} · {currentTech.zone}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {userRole === 'technician' && (
              <button
                onClick={() => setUserRole('dispatcher')}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                title="Return to Dispatcher Console"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Console</span>
              </button>
            )}
            <button
              onClick={toggleOfflineMode}
              className={`p-1.5 rounded text-[11px] font-mono flex items-center gap-1 cursor-pointer ${
                isOnline ? 'bg-slate-800 text-emerald-400' : 'bg-rose-950 text-rose-300 border border-rose-800'
              }`}
            >
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span className="text-[10px]">{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
            </button>
          </div>
        </div>

        {/* Offline Banner if Simulated Offline */}
        {!isOnline && (
          <div className="bg-amber-950/80 border-b border-amber-800/80 px-4 py-2 text-[11px] text-amber-200 flex items-center justify-between font-mono">
            <span>Offline mode active. Edits queued for sync.</span>
            <span className="bg-amber-900 px-1.5 py-0.5 rounded text-[10px]">Queue: 2</span>
          </div>
        )}

        {/* Active Job Header Card */}
        {activeJob && (
          <div className="p-4 bg-slate-950 border-b border-slate-800">
            {myJobs.length > 1 && (
              <div className="mb-2 flex items-center gap-1.5 overflow-x-auto pb-1">
                <span className="text-[10px] font-mono text-slate-500 shrink-0">Queue ({myJobs.length}):</span>
                {myJobs.map(j => (
                  <button
                    key={j.id}
                    onClick={() => setSelectedJobId(j.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap cursor-pointer ${
                      activeJob.id === j.id
                        ? 'bg-cyan-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {j.orderNumber}
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span className="text-cyan-400 font-bold">{activeJob.orderNumber}</span>
              <span className="uppercase text-amber-400 font-semibold">{activeJob.scheduledTimeWindow}</span>
            </div>

            <h1 className="text-sm font-bold text-white leading-snug">{activeJob.title}</h1>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{activeJob.siteName} · {activeJob.siteAddress}</span>
            </p>

            {/* Quick Status Action Pill Strip */}
            <div className="mt-3 flex items-center gap-2">
              <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                activeJob.status === 'on_site' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                activeJob.status === 'en_route' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                'bg-slate-800 text-slate-300'
              }`}>
                {activeJob.status.replace('_', ' ')}
              </span>

              {/* Navigation Button */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${activeJob.coordinates.lat},${activeJob.coordinates.lng}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1 font-mono transition-colors"
              >
                <Navigation className="w-3 h-3 text-cyan-400" />
                <span>Navigate</span>
              </a>

              <a
                href="tel:+254722345678"
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1 font-mono transition-colors"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>Call Site</span>
              </a>
            </div>

            {/* Step Action Buttons (Start Travel / Arrive / Complete) */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2">
              {activeJob.status !== 'en_route' && activeJob.status !== 'on_site' && activeJob.status !== 'completed' && (
                <button
                  onClick={() => updateWorkOrderStatus(activeJob.id, 'en_route')}
                  className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Start Travel</span>
                </button>
              )}

              {activeJob.status === 'en_route' && (
                <button
                  onClick={() => updateWorkOrderStatus(activeJob.id, 'on_site')}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Arrive & GPS Check-In</span>
                </button>
              )}

              {activeJob.status === 'on_site' && (
                <div className="w-full text-center text-[11px] font-mono text-emerald-400 flex items-center justify-center gap-1 py-1 bg-emerald-950/40 rounded border border-emerald-900/60">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>GPS Verified On-Site (-1.2685, 36.8042)</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Navigation Segmented Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 text-xs font-medium px-2 py-1 overflow-x-auto">
          {[
            { id: 'details', label: 'Details' },
            { id: 'safety', label: 'Safety (JSA)' },
            { id: 'checklist', label: 'Checklist' },
            { id: 'parts', label: 'Van Parts' },
            { id: 'signature', label: 'Sign-Off' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveStepTab(tab.id as any)}
              className={`px-3 py-2 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                activeStepTab === tab.id
                  ? 'bg-slate-800 text-cyan-400 font-bold border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Section by Tab */}
        <div className="p-4 flex-1 space-y-4 text-xs">
          {/* TAB 1: DETAILS */}
          {activeStepTab === 'details' && activeJob && (
            <div className="space-y-4">
              {/* Site Access & Gate Code */}
              <div className="p-3 bg-slate-800/60 border border-slate-700/80 rounded-lg space-y-1.5">
                <div className="text-[11px] font-mono uppercase text-slate-400 flex items-center justify-between">
                  <span>Site Access Instructions</span>
                  <span className="text-cyan-400 font-bold">Gate: GATE-B-4491</span>
                </div>
                <p className="text-xs text-slate-200">
                  Security check at Gate 2. Service lift access card issued at basement concierge. High-vis vest mandatory.
                </p>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-700/50 flex items-center justify-between">
                  <span>Contact: Eng. Kennedy Omondi</span>
                  <span className="font-mono text-cyan-300">+254 722 345 678</span>
                </div>
              </div>

              {/* Symptom Scope */}
              <div className="space-y-1">
                <div className="font-semibold text-slate-200">Fault Description</div>
                <p className="text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed">
                  {activeJob.description}
                </p>
              </div>

              {/* Installed Asset Profile */}
              <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-lg space-y-2">
                <div className="font-semibold text-white flex items-center justify-between">
                  <span>Target Equipment</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    QR: QR-VIC-501
                  </span>
                </div>
                <div className="text-slate-300 font-medium">Victron Quattro 15kVA Solar Inverter</div>
                <div className="text-[11px] font-mono text-slate-400">
                  S/N: VIC-4815-9921-KE · Under Warranty until April 2027
                </div>
              </div>

              {/* Action Buttons: Extra Work & Field Expense */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShowApprovalModal(true)}
                  className="py-2.5 px-2 bg-amber-950/70 border border-amber-800 text-amber-200 rounded-lg font-medium flex items-center justify-center gap-1.5 cursor-pointer hover:bg-amber-900/60 transition-colors text-[11px]"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Escalate Extra Work</span>
                </button>

                <button
                  onClick={() => setShowExpenseModal(true)}
                  className="py-2.5 px-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg font-medium flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-700 transition-colors text-[11px]"
                >
                  <Package className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Log Field Expense</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SAFETY JSA */}
          {activeStepTab === 'safety' && activeJob && (
            <div className="space-y-3">
              <div className="text-slate-300 text-xs font-medium">
                Mandatory Job Safety Analysis (JSA) before opening live solar or high-voltage equipment.
              </div>

              <div className="space-y-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
                {[
                  { key: 'ppeChecked', label: 'PPE Worn: Class 0 Insulated Gloves & Steel-Toe Boots' },
                  { key: 'lockoutTagoutDone', label: 'Lockout/Tagout (LOTO) Verified on DC Isolator' },
                  { key: 'voltageZeroConfirmed', label: 'Voltage Zero Tested with Calibrated Multimeter' },
                  { key: 'ladderSecured', label: 'Ladder / Working at Heights Harness Clipped' },
                  { key: 'customerNotifiedOfHazards', label: 'Customer Notified of Hazardous Testing Zone' }
                ].map((item) => {
                  const isChecked = (activeJob.safetyAssessment as any)[item.key];
                  return (
                    <label
                      key={item.key}
                      onClick={() => updateSafetyAssessment(activeJob.id, { [item.key]: !isChecked })}
                      className="flex items-start gap-3 p-2 rounded hover:bg-slate-900 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked || false}
                        readOnly
                        className="mt-0.5 w-4 h-4 rounded text-cyan-600 bg-slate-800 border-slate-700"
                      />
                      <span className={`text-xs ${isChecked ? 'text-white font-medium' : 'text-slate-400'}`}>
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-lg text-emerald-300 text-[11px] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Safety protocol locked with timestamp and GPS coordinate.</span>
              </div>
            </div>
          )}

          {/* TAB 3: CHECKLIST */}
          {activeStepTab === 'checklist' && activeJob && (
            <div className="space-y-3">
              <div className="text-slate-300 text-xs font-semibold flex items-center justify-between">
                <span>Field Diagnostics Checklist</span>
                <span className="text-[10px] font-mono text-cyan-400">Solar Diagnostics Spec</span>
              </div>

              <div className="space-y-3">
                {activeJob.checklist.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-medium text-slate-200">{item.label}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        item.isPass ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}>
                        {item.isPass ? 'PASS' : 'FAIL'}
                      </span>
                    </div>

                    {item.type === 'number' && (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={typeof item.value === 'number' ? item.value : ''}
                          onChange={(e) => updateChecklistItem(activeJob.id, item.id, parseFloat(e.target.value) || 0)}
                          className="w-32 bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
                        />
                        {item.thresholdMin !== undefined && (
                          <span className="text-[11px] text-slate-400 font-mono">
                            (Target: {item.thresholdMin} - {item.thresholdMax})
                          </span>
                        )}
                      </div>
                    )}

                    {item.type === 'boolean' && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateChecklistItem(activeJob.id, item.id, true)}
                          className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                            item.value === true ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Normal / Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => updateChecklistItem(activeJob.id, item.id, false)}
                          className={`px-3 py-1 rounded text-xs font-mono cursor-pointer ${
                            item.value === false ? 'bg-rose-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Defect / No
                        </button>
                      </div>
                    )}

                    {item.notes && (
                      <div className="text-[11px] text-amber-300 font-mono pt-1">
                        Note: {item.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PARTS & CORE RETURN */}
          {activeStepTab === 'parts' && activeJob && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">Parts Installed from Van</span>
                <button
                  onClick={() => setShowPartsModal(true)}
                  className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-mono cursor-pointer"
                >
                  + Add Van Part
                </button>
              </div>

              {activeJob.partsUsed.length === 0 ? (
                <div className="p-4 text-center text-slate-500 bg-slate-950 rounded border border-slate-800 text-xs">
                  No parts consumed yet. Tap "+ Add Van Part" to log installed items.
                </div>
              ) : (
                <div className="space-y-2">
                  {activeJob.partsUsed.map(p => (
                    <div key={p.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-200">{p.partName}</div>
                        <div className="text-[11px] font-mono text-slate-400">
                          SKU: {p.partSku} · Qty: {p.quantity} · {p.isBillable ? 'Billable' : 'Warranty Covered'}
                        </div>
                      </div>
                      <div className="font-mono text-right text-cyan-300 font-semibold">
                        KSh {(p.unitPrice * p.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Old Core Return Card */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-400 flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Removed Core / Faulty Part</span>
                  </span>
                  <button
                    onClick={() => setShowCoreReturnModal(true)}
                    className="px-2 py-1 bg-amber-950/70 border border-amber-800 hover:bg-amber-900 text-amber-200 rounded text-xs font-mono cursor-pointer"
                  >
                    Log Faulty Core
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Closed-loop return compliance: Old serialized part must be logged and quarantined in van for store return.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: SIGNATURE & SIGN-OFF */}
          {activeStepTab === 'signature' && activeJob && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-300">Customer Signer Name</label>
                <input
                  type="text"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Star Rating Selection */}
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-300">Customer CSAT Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-lg p-1 transition-transform cursor-pointer ${
                        rating >= star ? 'text-amber-400 scale-110' : 'text-slate-600'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs font-mono font-bold text-amber-400 ml-2">{rating}.0 / 5.0</span>
                </div>
              </div>

              {/* Signature Canvas */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Sign on screen below (Touch or Stylus):</span>
                  <button onClick={clearCanvas} className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer">
                    Clear Pad
                  </button>
                </div>
                <div className="border border-slate-700 rounded-lg bg-slate-950 overflow-hidden touch-none">
                  <canvas
                    ref={canvasRef}
                    width={380}
                    height={140}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full bg-slate-950 cursor-crosshair"
                  />
                </div>
              </div>

              <button
                onClick={saveSignature}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-lg"
              >
                {signatureSaved ? '✓ Customer Signature Confirmed' : 'Sign Off & Complete Work Order'}
              </button>
            </div>
          )}
        </div>

        {/* Modal: Escalate Extra Work */}
        {showApprovalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-sm p-4 space-y-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Request Extra Work Approval</span>
              </h2>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-slate-300 font-medium">Extra Work Title</label>
                  <input
                    type="text"
                    value={extraWorkTitle}
                    onChange={(e) => setExtraWorkTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Estimated Extra Cost (KSh)</label>
                  <input
                    type="number"
                    value={extraWorkCost}
                    onChange={(e) => setExtraWorkCost(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Justification & Findings</label>
                  <textarea
                    rows={2}
                    value={extraWorkDesc}
                    onChange={(e) => setExtraWorkDesc(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="flex-1 py-1.5 bg-slate-800 text-slate-300 rounded text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    submitApproval({
                      type: 'additional_work',
                      workOrderId: activeJob.id,
                      orderNumber: activeJob.orderNumber,
                      requestedByTechnicianId: currentTech.id,
                      technicianName: currentTech.name,
                      customerName: activeJob.customerName,
                      siteName: activeJob.siteName,
                      title: extraWorkTitle,
                      description: extraWorkDesc,
                      estimatedCost: parseFloat(extraWorkCost) || 0
                    });
                    setShowApprovalModal(false);
                  }}
                  className="flex-1 py-1.5 bg-amber-600 text-white rounded text-xs font-bold cursor-pointer"
                >
                  Send to Dispatcher
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Log Core Return */}
        {showCoreReturnModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-sm p-4 space-y-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>Log Removed Faulty Core Part</span>
              </h2>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-slate-300 font-medium">Removed Part Name</label>
                  <input
                    type="text"
                    value={removedPartName}
                    onChange={(e) => setRemovedPartName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Removed Unit Serial Number</label>
                  <input
                    type="text"
                    value={removedPartSerial}
                    onChange={(e) => setRemovedPartSerial(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Condition</label>
                  <select
                    value={removedPartCondition}
                    onChange={(e) => setRemovedPartCondition(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1 capitalize"
                  >
                    <option value="burned_out">Burned Out / Lightning Damage</option>
                    <option value="repairable">Repairable / Refurbishable</option>
                    <option value="warranty_defect">Warranty Defect (RMA to Supplier)</option>
                    <option value="scrap">Beyond Repair / Scrap</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowCoreReturnModal(false)}
                  className="flex-1 py-1.5 bg-slate-800 text-slate-300 rounded text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    logCoreReturn({
                      workOrderId: activeJob.id,
                      orderNumber: activeJob.orderNumber,
                      technicianId: currentTech.id,
                      technicianName: currentTech.name,
                      customerId: activeJob.customerId,
                      customerName: activeJob.customerName,
                      partName: removedPartName,
                      serialNumber: removedPartSerial,
                      condition: removedPartCondition
                    });
                    setShowCoreReturnModal(false);
                  }}
                  className="flex-1 py-1.5 bg-cyan-600 text-white rounded text-xs font-bold cursor-pointer"
                >
                  Lock into Van Quarantine
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Select Van Stock Part */}
        {showPartsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-sm p-4 space-y-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>Install Part from Van Stock</span>
              </h2>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {inventory.map(part => {
                  const vanQty = part.vanStock[currentTech.id] || 0;
                  return (
                    <div 
                      key={part.id} 
                      className="p-2.5 bg-slate-800 border border-slate-700 rounded flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-white">{part.name}</div>
                        <div className="text-[11px] font-mono text-slate-400">
                          SKU: {part.sku} · Van Stock: <span className="text-cyan-400 font-bold">{vanQty}</span>
                        </div>
                      </div>
                      <button
                        disabled={vanQty <= 0}
                        onClick={() => {
                          addPartToWorkOrder(activeJob.id, part.id, 1, true);
                          setShowPartsModal(false);
                        }}
                        className="px-2 py-1 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white rounded text-xs font-mono cursor-pointer"
                      >
                        Install
                      </button>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => setShowPartsModal(false)}
                className="w-full py-1.5 bg-slate-800 text-slate-300 rounded text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal: Log Field Expense */}
        {showExpenseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-sm p-4 space-y-3">
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-cyan-400" />
                <span>Log Job Field Expense Claim</span>
              </h2>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-slate-300 font-medium">Expense Category</label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1 font-mono text-xs"
                  >
                    <option value="Parking & Tolls">Parking & Road Tolls</option>
                    <option value="Local Hardware Purchase">Emergency Local Hardware / Conduits</option>
                    <option value="Casual Labor">Site Casual Helper Labor</option>
                    <option value="Transport / Fuel">Emergency Transport / Fuel</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Claim Amount (KSh)</label>
                  <input
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Description / Receipt Note</label>
                  <textarea
                    rows={2}
                    value={expenseDesc}
                    onChange={(e) => setExpenseDesc(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowExpenseModal(false)}
                  className="flex-1 py-1.5 bg-slate-800 text-slate-300 rounded text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    submitApproval({
                      type: 'field_expense',
                      workOrderId: activeJob.id,
                      orderNumber: activeJob.orderNumber,
                      requestedByTechnicianId: currentTech.id,
                      technicianName: currentTech.name,
                      customerName: activeJob.customerName,
                      siteName: activeJob.siteName,
                      title: `Expense Claim: ${expenseCategory} (KSh ${expenseAmount})`,
                      description: expenseDesc,
                      estimatedCost: parseFloat(expenseAmount) || 0
                    });
                    setShowExpenseModal(false);
                  }}
                  className="flex-1 py-1.5 bg-cyan-600 text-white rounded text-xs font-bold cursor-pointer"
                >
                  Submit Claim
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
