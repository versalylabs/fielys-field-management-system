import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const GanttScheduleBoard: React.FC = () => {
  const { technicians, workOrders, setSelectedWorkOrderId, setActiveTab } = useFielys();

  const [selectedZone, setSelectedZone] = useState('all');
  const [dayOffset, setDayOffset] = useState(0);

  const baseDate = new Date('2026-10-04T12:00:00');
  const displayedDate = new Date(baseDate.getTime() + dayOffset * 86400000);
  const formattedDate = displayedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const hours = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const filteredTechnicians = technicians.filter(t => 
    selectedZone === 'all' || t.zone.includes(selectedZone)
  );

  return (
    <div className="p-4 sm:p-6 space-y-4 max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex flex-wrap items-center gap-2">
            <span>Visual Gantt Dispatch Timeline</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              OPTIMIZED SCHEDULE
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Interactive crew allocation with real-time zone routing and travel buffer detection.
          </p>
        </div>

        {/* Date & Zone Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center bg-slate-800 border border-slate-700 rounded-md text-xs font-mono">
            <button
              onClick={() => setDayOffset(prev => prev - 1)}
              className="p-1.5 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="Previous Day"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2.5 py-1 font-bold text-white whitespace-nowrap">{formattedDate}</span>
            <button
              onClick={() => setDayOffset(prev => prev + 1)}
              className="p-1.5 hover:bg-slate-700 text-slate-300 cursor-pointer"
              title="Next Day"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {dayOffset !== 0 && (
            <button
              onClick={() => setDayOffset(0)}
              className="px-2.5 py-1.5 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-md text-xs font-mono cursor-pointer"
            >
              Today
            </button>
          )}

          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="text-xs bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="all">All Zones & Corridors</option>
            <option value="Westlands">Westlands & Parklands</option>
            <option value="Mombasa">Industrial Area & Mombasa Rd</option>
            <option value="Central">Central & Upper Hill</option>
            <option value="Kilimani">Kilimani & Ngong Rd</option>
          </select>
        </div>
      </div>

      {/* Gantt Timeline Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto shadow-xl">
        <div className="min-w-[860px]">
          {/* Header Hour Row */}
          <div className="grid grid-cols-12 border-b border-slate-800 text-[11px] font-mono text-slate-400 py-2.5 px-4 bg-slate-950/60">
            <div className="col-span-3 font-semibold text-slate-300">TECHNICIAN / VAN</div>
            {hours.map((hour) => (
              <div key={hour} className="col-span-1 text-center font-medium">
                {hour}
              </div>
            ))}
          </div>

          {/* Technician Rows */}
          <div className="divide-y divide-slate-800/80">
            {filteredTechnicians.map((tech) => {
              const techJobs = workOrders.filter(w => w.assignedTechnicianId === tech.id);

              return (
                <div key={tech.id} className="grid grid-cols-12 items-center px-4 py-3 min-h-[72px] hover:bg-slate-800/20 transition-colors">
                  {/* Technician Info (3 Cols) */}
                  <div className="col-span-3 pr-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative shrink-0">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 text-xs">
                          {tech.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-slate-900 ${
                          tech.status === 'on_site' ? 'bg-emerald-400' : tech.status === 'en_route' ? 'bg-cyan-400' : 'bg-slate-400'
                        }`} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-white text-xs truncate">{tech.name}</div>
                        <div className="text-[10px] font-mono text-slate-400 truncate">
                          {tech.vehiclePlate} · {tech.zone}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 9 Hours Slot Grid */}
                  <div className="col-span-9 relative h-12 flex items-center border-l border-slate-800/60 bg-slate-950/20 rounded">
                    {/* Background hour grid lines */}
                    <div className="absolute inset-0 grid grid-cols-9 divide-x divide-slate-800/40 pointer-events-none" />

                    {/* Render Assigned Job Blocks */}
                    {techJobs.map((job) => {
                      let leftPercent = 10;
                      let widthPercent = 30;

                      if (job.scheduledTimeWindow.includes('07:00') || job.scheduledTimeWindow.includes('08:00')) {
                        leftPercent = 5;
                        widthPercent = 22;
                      } else if (job.scheduledTimeWindow.includes('09:30') || job.scheduledTimeWindow.includes('10:00')) {
                        leftPercent = 24;
                        widthPercent = 35;
                      } else if (job.scheduledTimeWindow.includes('01:30') || job.scheduledTimeWindow.includes('02:00')) {
                        leftPercent = 60;
                        widthPercent = 30;
                      }

                      return (
                        <div
                          key={job.id}
                          onClick={() => {
                            setSelectedWorkOrderId(job.id);
                            setActiveTab('work-orders');
                          }}
                          style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                          className={`absolute h-9 rounded px-2 py-1 text-xs cursor-pointer shadow-md transition-all hover:scale-[1.02] border flex flex-col justify-center ${
                            job.status === 'on_site' ? 'bg-emerald-950/90 text-emerald-200 border-emerald-700' :
                            job.status === 'completed' ? 'bg-slate-800/90 text-slate-300 border-slate-700' :
                            'bg-cyan-950/90 text-cyan-200 border-cyan-700'
                          }`}
                        >
                          <div className="flex items-center justify-between font-mono text-[10px] font-bold">
                            <span>{job.orderNumber}</span>
                            <span className="uppercase text-[9px]">{job.status.replace('_', ' ')}</span>
                          </div>
                          <div className="text-[11px] font-semibold truncate leading-tight mt-0.5">
                            {job.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-mono pt-2">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> On Site
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-cyan-500" /> Dispatched / En Route
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-slate-600" /> Completed
          </span>
        </div>
        <div>
          <span>Click any block to inspect job telemetry, safety forms & parts</span>
        </div>
      </div>
    </div>
  );
};
