import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { 
  MapPin, 
  ExternalLink
} from 'lucide-react';

export const RouteTravelMap: React.FC = () => {
  const { technicians } = useFielys();

  const [selectedTechId, setSelectedTechId] = useState(technicians[0]?.id || 'tech-1');
  const activeTech = technicians.find(t => t.id === selectedTechId) || technicians[0];

  const stops = [
    {
      stopNumber: 1,
      title: 'Stop 1: Apex Kilimani Logistics Center',
      address: 'Argwings Kodhek Rd, Kilimani',
      lat: -1.2921,
      lng: 36.7865,
      time: '07:05 AM - 09:12 AM',
      type: 'Completed (Cleaned 48 Panels)',
      distanceKm: 12.4,
      travelTimeMin: 22,
      status: 'completed'
    },
    {
      stopNumber: 2,
      title: `Stop 2: ${activeTech.zone} Primary Site`,
      address: 'Plot 44 Waiyaki Way, Westlands',
      lat: -1.2685,
      lng: 36.8042,
      time: '09:28 AM - 12:30 PM',
      type: 'On Site (Inverter Overvoltage Repair)',
      distanceKm: 8.6,
      travelTimeMin: 18,
      status: 'active'
    },
    {
      stopNumber: 3,
      title: 'Stop 3: Karen Executive Headquarters',
      address: 'Karen Roundabout, Marula Lane',
      lat: -1.3218,
      lng: 36.7124,
      time: '02:00 PM - 05:30 PM',
      type: 'Next Stop (Solar Battery Commissioning)',
      distanceKm: 18.2,
      travelTimeMin: 34,
      status: 'upcoming'
    }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex flex-wrap items-center gap-2">
            <span>Route & Travel Management Engine</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              WRENCH TIME VS. DRIVE TIME
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Treat travel time and road mileage as a first-class operational cost with multi-stop route sequencing.
          </p>
        </div>

        {/* Technician Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-mono shrink-0">Crew Lead:</label>
          <select
            value={selectedTechId}
            onChange={(e) => setSelectedTechId(e.target.value)}
            className="w-full sm:w-auto text-xs bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
          >
            {technicians.map(t => (
              <option key={t.id} value={t.id}>{t.name} ({t.vehiclePlate} · {t.zone})</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards: Travel vs Wrench Efficiency */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1 font-mono">
          <span className="text-[11px] text-slate-400 uppercase block">Today's Distance</span>
          <div className="text-lg sm:text-xl font-bold text-white">39.2 km</div>
          <span className="text-[10px] text-slate-500 block truncate">{activeTech.vehicleModel} · {activeTech.vehiclePlate}</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1 font-mono">
          <span className="text-[11px] text-slate-400 uppercase block">Drive Time Elapsed</span>
          <div className="text-lg sm:text-xl font-bold text-cyan-400">1h 14m</div>
          <span className="text-[10px] text-slate-500 block">Traffic adherence: 94%</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1 font-mono">
          <span className="text-[11px] text-slate-400 uppercase block">On-Site Wrench Time</span>
          <div className="text-lg sm:text-xl font-bold text-emerald-400">4h 20m</div>
          <span className="text-[10px] text-slate-500 block">Billable client on-site ratio</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1 font-mono">
          <span className="text-[11px] text-slate-400 uppercase block">Efficiency Ratio</span>
          <div className="text-lg sm:text-xl font-bold text-amber-400">{activeTech.firstTimeFixRate - 14}%</div>
          <span className="text-[10px] text-slate-500 block">Target benchmark: &gt; 70%</span>
        </div>
      </div>

      {/* Interactive Map Radar & Stops Sequence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Sequence of Stops (1 Col) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
            <span className="font-bold text-white">Daily Multi-Stop Route</span>
            <span className="font-mono text-cyan-400">3 Planned Stops</span>
          </div>

          <div className="space-y-3">
            {stops.map((stop) => (
              <div 
                key={stop.stopNumber}
                className={`p-4 bg-slate-900 border rounded-xl space-y-2 text-xs transition-colors ${
                  stop.status === 'active' ? 'border-cyan-600 bg-cyan-950/20' : 'border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      stop.status === 'completed' ? 'bg-emerald-950 text-emerald-400' :
                      stop.status === 'active' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      Stop #{stop.stopNumber} · {stop.status}
                    </span>
                    <h3 className="font-bold text-white text-sm mt-1">{stop.title}</h3>
                    <p className="text-slate-400 text-xs flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>{stop.address}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-slate-950 p-2 rounded border border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block">Distance:</span>
                    <span className="text-slate-200">{stop.distanceKm} km</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Drive Time:</span>
                    <span className="text-slate-200">{stop.travelTimeMin} mins</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-slate-500">{stop.time}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline text-[11px] font-mono flex items-center gap-1 shrink-0"
                  >
                    <span>Launch GPS Navigation</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Simulated Geographic Corridor Radar Map (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 z-10 gap-2">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Nairobi Service Corridor Radar</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-xs text-slate-400">Kilimani ➔ {activeTech.zone} ➔ Karen Corridor</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold shrink-0">
              GPS LAT/LNG LIVE
            </span>
          </div>

          {/* Responsive SVG Map Canvas with percentage-based pins */}
          <div className="relative h-72 sm:h-80 my-4 bg-slate-950 rounded-lg border border-slate-800/80 flex items-center justify-center overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

            {/* Connecting Route Lines (Responsive viewBox) */}
            <svg
              viewBox="0 0 640 320"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <path
                d="M 115 220 Q 220 130, 330 100 T 525 245"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="opacity-70"
              />
            </svg>

            {/* Stop 1 Pin: Kilimani (18% left, 68% top) */}
            <div className="absolute left-[18%] top-[68%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow-lg">
                1
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-white bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700 mt-1 whitespace-nowrap">
                Kilimani (Done)
              </span>
            </div>

            {/* Stop 2 Pin: Active Technician Location (52% left, 32% top) */}
            <div className="absolute left-[52%] top-[32%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-cyan-500 border-2 border-white flex items-center justify-center text-white font-bold text-xs shadow-xl animate-pulse">
                  2
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 flex items-center justify-center text-[9px] text-slate-950 font-bold">
                  ✓
                </div>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-cyan-800 mt-1 font-bold whitespace-nowrap shadow-md">
                {activeTech.name} ({activeTech.status.replace('_', ' ')})
              </span>
            </div>

            {/* Stop 3 Pin: Karen (82% left, 76% top) */}
            <div className="absolute left-[82%] top-[76%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-700 border-2 border-slate-500 flex items-center justify-center text-slate-300 font-bold text-xs shadow-lg">
                3
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-slate-300 bg-slate-900/90 px-1.5 py-0.5 rounded border border-slate-700 mt-1 whitespace-nowrap">
                Karen (Next)
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-mono">
            <span>Fleet Bridge: Fleesio Odometer & Fuel Sync Available</span>
            <span className="text-emerald-400 font-bold">Zero Route Conflicts</span>
          </div>
        </div>
      </div>
    </div>
  );
};
