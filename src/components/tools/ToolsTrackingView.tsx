import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { Wrench, AlertTriangle, CheckCircle2, ShieldAlert, User, Calendar, Plus } from 'lucide-react';

export const ToolsTrackingView: React.FC = () => {
  const { tools, technicians, calibrateTool, createTool } = useFielys();

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toolName, setToolName] = useState('');
  const [toolCode, setToolCode] = useState('TL-NEW-05');
  const [serialNumber, setSerialNumber] = useState('SN-8821-KE');
  const [category, setCategory] = useState<'Testing Meter' | 'Fusion Splicer' | 'Refrigerant Gauges' | 'Safety Harness' | 'Power Tool'>('Testing Meter');
  const [custodyTechId, setCustodyTechId] = useState(technicians[0]?.id || '');
  const [replacementCost, setReplacementCost] = useState('145000');

  const handleCalibrate = (toolId: string, name: string) => {
    calibrateTool(toolId);
    setToastMsg(`Calibration logged & certified for ${name} (Valid +1 Year).`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateTool = (e: React.FormEvent) => {
    e.preventDefault();
    const tech = technicians.find(t => t.id === custodyTechId);
    createTool({
      name: toolName || 'Fluke 376 FC True-RMS Clamp Meter',
      toolCode,
      serialNumber,
      category,
      assignedToTechnicianId: custodyTechId || undefined,
      assignedTechnicianName: tech?.name || 'Store Crib',
      lastInspectionDate: '2026-10-05',
      calibrationDueDate: '2027-10-05',
      isCalibrationOverdue: false,
      replacementCost: parseFloat(replacementCost) || 85000,
    });
    setToolName('');
    setShowAddModal(false);
    setToastMsg('New specialized tool registered in custody log.');
    setTimeout(() => setToastMsg(null), 3500);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex flex-wrap items-center gap-2">
            <span>Specialized Tools & Calibration Registry</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
              SAFETY & PRECISION AUDIT
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track high-value field tools, fusion splicers, test meters, calibration due dates, and crew custody.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Tool</span>
        </button>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-950/90 border border-emerald-700 rounded-lg flex items-center gap-2 text-xs text-emerald-200 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map(tool => (
          <div 
            key={tool.id} 
            className={`p-5 bg-slate-900 border rounded-xl space-y-3 shadow-xl transition-colors ${
              tool.isCalibrationOverdue ? 'border-rose-800/80 bg-slate-900/90' : 'border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">{tool.toolCode}</span>
                <h3 className="font-bold text-white text-sm mt-0.5">{tool.name}</h3>
                <div className="text-[11px] font-mono text-slate-400">S/N: {tool.serialNumber}</div>
              </div>

              {tool.isCalibrationOverdue ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>OVERDUE</span>
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>CALIBRATED</span>
                </span>
              )}
            </div>

            <div className="p-3 bg-slate-950 rounded font-mono text-xs border border-slate-800/80 space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Category:</span>
                <span className="text-slate-200">{tool.category}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Assigned Custody:</span>
                <span className="text-cyan-300 font-bold">{tool.assignedTechnicianName || 'Store Crib'}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Calibration Expiry:</span>
                <span className={tool.isCalibrationOverdue ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                  {tool.calibrationDueDate}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                <span>Replacement Value:</span>
                <span className="text-white font-bold">KSh {tool.replacementCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-1 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 font-mono">Last Inspected: {tool.lastInspectionDate}</span>
              <button
                onClick={() => handleCalibrate(tool.id, tool.name)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer transition-colors ${
                  tool.isCalibrationOverdue
                    ? 'bg-cyan-600 hover:bg-cyan-500 text-white font-bold'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {tool.isCalibrationOverdue ? 'Certify Calibration Now' : 'Log Calibration'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Register New Tool Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-5 space-y-4 text-xs shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-400" />
              <span>Register Specialized Field Tool</span>
            </h2>
            <form onSubmit={handleCreateTool} className="space-y-3">
              <div>
                <label className="text-slate-300 font-medium">Tool Name & Model</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fluke 1587 FC Insulation Multimeter"
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium">Tool Asset Code</label>
                  <input
                    type="text"
                    required
                    value={toolCode}
                    onChange={(e) => setToolCode(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Serial Number</label>
                  <input
                    type="text"
                    required
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  >
                    <option value="Testing Meter">Testing Meter</option>
                    <option value="Fusion Splicer">Fusion Splicer</option>
                    <option value="Refrigerant Gauges">Refrigerant Gauges</option>
                    <option value="Safety Harness">Safety Harness</option>
                    <option value="Power Tool">Power Tool</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Assigned Custody</label>
                  <select
                    value={custodyTechId}
                    onChange={(e) => setCustodyTechId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  >
                    <option value="">Central Store Crib</option>
                    {technicians.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-slate-300 font-medium">Replacement Value (KSh)</label>
                <input
                  type="number"
                  required
                  value={replacementCost}
                  onChange={(e) => setReplacementCost(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                />
              </div>
              <div className="flex gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 bg-slate-800 text-slate-300 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold cursor-pointer"
                >
                  Save Tool Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
