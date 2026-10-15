import React, { useState, useEffect } from 'react';
import { useFielys } from '../../context/FielysContext';
import { 
  Activity, 
  Calendar, 
  ClipboardList, 
  Layers, 
  Users, 
  Truck, 
  Wrench, 
  Package, 
  RotateCcw, 
  ShieldCheck, 
  FileText, 
  CheckSquare, 
  CreditCard, 
  BarChart3, 
  Smartphone,
  Globe,
  Settings,
  HelpCircle,
  ChevronDown,
  LogOut,
  X
} from 'lucide-react';
import { FielysLogo } from '../common/FielysLogo';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: 'rose' | 'amber';
  highlight?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const { activeTab, setActiveTab, metrics, logout } = useFielys();

  const navigationGroups: NavGroup[] = [
    {
      title: 'Operations & Dispatch',
      items: [
        { id: 'dispatcher-workspace', label: 'Live Ops Center', icon: Activity, badge: metrics.unassigned > 0 ? metrics.unassigned : undefined },
        { id: 'schedule-board', label: 'Gantt Dispatch Board', icon: Calendar },
        { id: 'work-orders', label: 'Work Orders', icon: ClipboardList, badge: metrics.inProgress },
        { id: 'tickets', label: 'Service Tickets', icon: Layers, badge: metrics.slaBreachRiskCount > 0 ? 'SLA!' : undefined, badgeColor: 'rose' },
        { id: 'leads-quotes', label: 'Leads & Quotations', icon: FileText }
      ]
    },
    {
      title: 'Field & Mobile',
      items: [
        { id: 'mobile-field', label: 'Technician Mobile PWA', icon: Smartphone, highlight: true },
        { id: 'technicians', label: 'Technician Registry', icon: Users },
        { id: 'subcontractors', label: 'Subcontractor Crews', icon: Users, badge: '2 Active' },
        { id: 'routes', label: 'Route & Travel Map', icon: Truck }
      ]
    },
    {
      title: 'Equipment & Stock',
      items: [
        { id: 'assets', label: 'Customer Asset Registry', icon: ShieldCheck },
        { id: 'inventory', label: 'Warehouse & Van Stock', icon: Package, badge: metrics.vanStockAlertsCount > 0 ? metrics.vanStockAlertsCount : undefined, badgeColor: 'amber' },
        { id: 'core-returns', label: 'Core Returns & RMA', icon: RotateCcw, badge: metrics.faultyCoresPendingReturn },
        { id: 'tools', label: 'Tools & Calibration', icon: Wrench, badge: metrics.toolsOverdueCount > 0 ? `${metrics.toolsOverdueCount} Overdue` : undefined, badgeColor: 'rose' }
      ]
    },
    {
      title: 'Contracts & Governance',
      items: [
        { id: 'contracts', label: 'Service Contracts / AMC', icon: CheckSquare, badge: `${metrics.amcVisitsDueThisWeek} Due` },
        { id: 'approvals', label: 'Approval Workflows', icon: HelpCircle, badge: metrics.approvalsPendingCount > 0 ? metrics.approvalsPendingCount : undefined, badgeColor: 'amber' },
        { id: 'service-reports', label: 'Service Report Designer', icon: FileText }
      ]
    },
    {
      title: 'Finance & Portals',
      items: [
        { id: 'invoicing', label: 'Invoices & M-Pesa STK', icon: CreditCard },
        { id: 'customer-portal', label: 'Customer Portal', icon: Globe },
        { id: 'reports', label: 'Executive Analytics', icon: BarChart3 }
      ]
    }
  ];

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'Operations & Dispatch': true,
    'Field & Mobile': true,
    'Equipment & Stock': true,
    'Contracts & Governance': true,
    'Finance & Portals': true
  });

  // Automatically expand a category if the activeTab belongs to it
  useEffect(() => {
    const matchingGroup = navigationGroups.find(g => g.items.some(item => item.id === activeTab));
    if (matchingGroup) {
      setOpenGroups(prev => (prev[matchingGroup.title] ? prev : { ...prev, [matchingGroup.title]: true }));
    }
  }, [activeTab]);

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    onClose?.();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 h-full bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 select-none overflow-hidden transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Mini App Profile */}
        <div className="p-4 border-b border-slate-800/80 shrink-0 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <FielysLogo className="w-8 h-8 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white tracking-wide">VERSALY FIELYS</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Kenya & East Africa Corridor</div>
              <div className="mt-2 text-[10px] font-mono text-cyan-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE DISPATCH ENGINE</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Independently Scrollable Nav List with Category Dropdowns */}
        <div className="flex-1 overflow-y-auto min-h-0 py-3 px-2 space-y-2">
          {navigationGroups.map((group) => {
            const isOpenGroup = openGroups[group.title] ?? true;
            const hasActiveItem = group.items.some(item => item.id === activeTab);

            return (
              <div key={group.title} className="rounded-lg border border-transparent">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.title)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    hasActiveItem
                      ? 'text-cyan-400 bg-slate-800/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span>{group.title}</span>
                    {!isOpenGroup && hasActiveItem && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    )}
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                      isOpenGroup ? 'rotate-0 text-slate-400' : '-rotate-90 text-slate-500'
                    }`}
                  />
                </button>

                {isOpenGroup && (
                  <div className="mt-1 space-y-0.5 pl-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectTab(item.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer group ${
                            isActive
                              ? 'bg-cyan-950/70 text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-2'
                              : item.highlight
                              ? 'text-cyan-400 hover:bg-slate-800/80'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                            <span className="truncate">{item.label}</span>
                          </div>

                          {item.badge && (
                            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold shrink-0 ${
                              item.badgeColor === 'rose'
                                ? 'bg-rose-950 text-rose-300 border border-rose-800/60'
                                : item.badgeColor === 'amber'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800/60'
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer System Status */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
          <span className="font-mono text-[10px]">v1.0.4 · Production</span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => handleSelectTab('settings')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                activeTab === 'settings' ? 'text-cyan-400 bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Settings & Integrations"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={logout}
              className="text-slate-400 hover:text-rose-400 p-1.5 rounded hover:bg-slate-800 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
