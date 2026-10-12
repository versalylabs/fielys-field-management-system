import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { WorkOrderType, PriorityLevel } from '../../types';
import { X, Calendar, Clock, MapPin, User, Wrench, AlertCircle } from 'lucide-react';

interface NewWorkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewWorkOrderModal: React.FC<NewWorkOrderModalProps> = ({ isOpen, onClose }) => {
  const { customers, technicians, createWorkOrder, setSelectedWorkOrderId, setActiveTab } = useFielys();

  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const selectedCustomer = customers.find(c => c.id === customerId);
  const [siteId, setSiteId] = useState(selectedCustomer?.sites[0]?.id || '');
  const [type, setType] = useState<WorkOrderType>('corrective');
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTechnicianId, setAssignedTechnicianId] = useState('');
  const [scheduledDate, setScheduledDate] = useState(new Date().toISOString().split('T')[0]);
  const [scheduledTimeWindow, setScheduledTimeWindow] = useState('10:00 AM - 01:00 PM');
  const [estimatedDurationHours, setEstimatedDurationHours] = useState(2.5);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const site = selectedCustomer?.sites.find(s => s.id === siteId) || selectedCustomer?.sites[0];
    const tech = technicians.find(t => t.id === assignedTechnicianId);

    const newWo = createWorkOrder({
      customerId,
      customerName: selectedCustomer?.name || 'Walk-in Client',
      siteId: site?.id || 'site-default',
      siteName: site?.name || 'Main Premise',
      siteAddress: site?.address || 'Nairobi',
      zone: site?.zone || 'Westlands & Parklands',
      coordinates: site?.coordinates || { lat: -1.2685, lng: 36.8042 },
      type,
      priority,
      title,
      description,
      assignedTechnicianId: tech ? tech.id : undefined,
      assignedTechnicianName: tech ? tech.name : undefined,
      scheduledDate,
      scheduledTimeWindow,
      estimatedDurationHours,
      laborCost: estimatedDurationHours * 4500,
      billableTotal: estimatedDurationHours * 4500
    });

    setSelectedWorkOrderId(newWo.id);
    setActiveTab('work-orders');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div>
            <h2 className="text-base font-semibold text-white">Create New Work Order</h2>
            <p className="text-xs text-slate-400 mt-0.5">Dispatch field technician, schedule service, and set SLA priority.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Customer & Site Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Customer / Organization</label>
              <select
                value={customerId}
                onChange={(e) => {
                  setCustomerId(e.target.value);
                  const cust = customers.find(c => c.id === e.target.value);
                  if (cust && cust.sites.length > 0) {
                    setSiteId(cust.sites[0].id);
                  }
                }}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.type})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Service Site / Location</label>
              <select
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                {selectedCustomer?.sites.map(s => (
                  <option key={s.id} value={s.id}>{s.name} - {s.zone}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Job Type & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Work Order Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as WorkOrderType)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 capitalize"
              >
                <option value="corrective">Corrective / Breakdown Repair</option>
                <option value="preventive">Preventive Maintenance (PM)</option>
                <option value="installation">New Equipment Installation</option>
                <option value="site_survey">Site Survey & Assessment</option>
                <option value="decommissioning">Decommissioning / Removal</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">SLA Priority Tier</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 capitalize"
              >
                <option value="low">Low (Standard 48-hr SLA)</option>
                <option value="medium">Medium (24-hr SLA)</option>
                <option value="high">High (4-hr SLA)</option>
                <option value="critical">Critical / Emergency (1-hr SLA)</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium text-slate-300 mb-1">Job Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Inverter Overvoltage Tripping / Chiller Refrigerant Leak"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-slate-300 mb-1">Symptoms, Scope & Access Instructions</label>
            <textarea
              rows={3}
              placeholder="Detail client symptom description, diagnostic warnings, access gate codes, or PPE requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Technician Assignment & Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-slate-800">
            <div>
              <label className="block font-medium text-slate-300 mb-1">Assign Lead Technician</label>
              <select
                value={assignedTechnicianId}
                onChange={(e) => setAssignedTechnicianId(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="">-- Leave in Unassigned Queue --</option>
                {technicians.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.status.toUpperCase()} · {t.zone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Scheduled Date</label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-300 mb-1">Time Slot Window</label>
              <select
                value={scheduledTimeWindow}
                onChange={(e) => setScheduledTimeWindow(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="08:00 AM - 10:30 AM">08:00 AM - 10:30 AM</option>
                <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                <option value="01:30 PM - 04:00 PM">01:30 PM - 04:00 PM</option>
                <option value="04:00 PM - 07:00 PM">04:00 PM - 07:00 PM</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md font-medium transition-colors shadow-md cursor-pointer"
            >
              Create & Dispatch Work Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
