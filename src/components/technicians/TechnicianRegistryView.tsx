import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { TechnicianStatus } from '../../types';
import { 
  Users, 
  Plus, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Truck, 
  ShieldCheck, 
  Smartphone, 
  Star, 
  Wrench,
  CheckCircle2,
  X
} from 'lucide-react';

export const TechnicianRegistryView: React.FC = () => {
  const { 
    technicians, 
    workOrders, 
    createTechnician, 
    updateTechnicianStatus, 
    setActiveTechnicianId, 
    setActiveTab, 
    setSelectedWorkOrderId 
  } = useFielys();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Add technician form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+254 7');
  const [email, setEmail] = useState('');
  const [zone, setZone] = useState('Westlands & Parklands');
  const [vehiclePlate, setVehiclePlate] = useState('KDG 882M');
  const [vehicleModel, setVehicleModel] = useState('Toyota Hilux Double Cab');
  const [skillInput, setSkillInput] = useState('High-Voltage Solar (EPRA Class T3), Commercial HVAC VRV');

  const filteredTechs = technicians.filter(t => {
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesSearch = 
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      t.zone.toLowerCase().includes(search.toLowerCase()) ||
      t.vehiclePlate.toLowerCase().includes(search.toLowerCase()) ||
      t.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleAddTech = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    createTechnician({
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@fielys.co.ke`,
      zone,
      vehiclePlate,
      vehicleModel,
      skills: skillInput.split(',').map(s => s.trim()).filter(Boolean)
    });
    setName('');
    setPhone('+254 7');
    setEmail('');
    setShowAddModal(false);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex flex-wrap items-center gap-2">
            <span>Field Technician & Engineering Crew Registry</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              EPRA & NCA CERTIFIED ROSTER
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage field engineering crews, certification validity, service van assignments, and real-time availability.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Field Technician</span>
        </button>
      </div>

      {/* Search & Status Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search name, ID, skill, van plate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-8 pl-8 pr-3 text-xs bg-slate-800 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-mono">
          {['all', 'on_site', 'en_route', 'available', 'on_break'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1 rounded capitalize whitespace-nowrap cursor-pointer transition-colors ${
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

      {/* Technician Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTechs.map(tech => {
          const activeOrders = workOrders.filter(w => w.assignedTechnicianId === tech.id);

          return (
            <div key={tech.id} className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-400 text-sm">
                        {tech.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${
                        tech.status === 'on_site' ? 'bg-emerald-400' :
                        tech.status === 'en_route' ? 'bg-cyan-400' :
                        tech.status === 'available' ? 'bg-amber-400' : 'bg-slate-500'
                      }`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-bold text-white truncate">{tech.name}</h3>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">
                          {tech.employeeId}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{tech.zone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Switcher */}
                  <select
                    value={tech.status}
                    onChange={(e) => updateTechnicianStatus(tech.id, e.target.value as TechnicianStatus)}
                    className={`text-[10px] font-mono uppercase px-2 py-1 rounded font-bold border cursor-pointer focus:outline-none ${
                      tech.status === 'on_site' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                      tech.status === 'en_route' ? 'bg-cyan-950 text-cyan-400 border-cyan-800' :
                      'bg-slate-800 text-slate-200 border-slate-700'
                    }`}
                  >
                    <option value="available">AVAILABLE</option>
                    <option value="en_route">EN ROUTE</option>
                    <option value="on_site">ON SITE</option>
                    <option value="on_break">ON BREAK</option>
                    <option value="off_duty">OFF DUTY</option>
                  </select>
                </div>

                {/* Vehicle & Performance Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs bg-slate-950 p-3 rounded-lg font-mono border border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Assigned Van</span>
                    <span className="text-slate-200 font-bold">{tech.vehiclePlate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">First-Time Fix</span>
                    <span className="text-emerald-400 font-bold">{tech.firstTimeFixRate}% FTFR</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500 block">CSAT & Volume</span>
                    <span className="text-amber-400 font-bold">⭐ {tech.csatRating} ({tech.completedJobsThisMonth} jobs)</span>
                  </div>
                </div>

                {/* Skills & Certifications */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Verified Skills & Licenses</span>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.skills.map(skill => (
                      <span key={skill} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[11px] font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 mt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <a
                  href={`tel:${tech.phone}`}
                  className="text-slate-400 hover:text-cyan-400 font-mono text-[11px] flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>{tech.phone}</span>
                </a>

                <div className="flex items-center gap-2">
                  {activeOrders.length > 0 && (
                    <button
                      onClick={() => {
                        setSelectedWorkOrderId(activeOrders[0].id);
                        setActiveTab('work-orders');
                      }}
                      className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-mono cursor-pointer transition-colors"
                    >
                      Jobs ({activeOrders.length})
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setActiveTechnicianId(tech.id);
                      setActiveTab('mobile-field');
                    }}
                    className="px-2.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Smartphone className="w-3 h-3" />
                    <span>Open Tech PWA</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Technician Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-5 space-y-4 text-xs shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-white">Register New Field Engineer</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTech} className="space-y-3">
              <div>
                <label className="text-slate-300 font-medium block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eng. Samuel Kiprop"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Service Corridor</label>
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200"
                  >
                    <option value="Westlands & Parklands">Westlands & Parklands</option>
                    <option value="Nairobi Central & Upper Hill">Nairobi Central & Upper Hill</option>
                    <option value="Industrial Area & Mombasa Rd">Industrial Area & Mombasa Rd</option>
                    <option value="Kilimani & Ngong Rd">Kilimani & Ngong Rd</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Assigned Van Plate</label>
                  <input
                    type="text"
                    required
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium block mb-1">Vehicle Model</label>
                  <input
                    type="text"
                    required
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium block mb-1">Skills & Certifications (comma-separated)</label>
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200"
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
                  Register Technician
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
