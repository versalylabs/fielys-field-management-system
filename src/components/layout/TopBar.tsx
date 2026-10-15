import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { UserRole } from '../../types';
import { 
  Bell, 
  Search, 
  Plus, 
  Wifi, 
  WifiOff, 
  Smartphone, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Sun,
  Moon,
  LogOut,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { FielysLogo } from '../common/FielysLogo';

interface TopBarProps {
  onOpenNewModal: () => void;
  onToggleMobileMenu?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenNewModal, onToggleMobileMenu }) => {
  const { 
    userRole, 
    setUserRole, 
    activeTab, 
    setActiveTab, 
    isOnline, 
    toggleOfflineMode,
    searchQuery, 
    setSearchQuery,
    metrics,
    resetToMockData,
    theme,
    toggleTheme,
    logout,
    userEmail,
    workOrders,
    assets,
    technicians,
    tickets,
    setSelectedWorkOrderId,
    setActiveTechnicianId
  } = useFielys();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const roleLabels: Record<UserRole, { title: string; subtitle: string }> = {
    dispatcher: { title: 'Dispatch & Ops Center', subtitle: 'Operations Manager' },
    technician: { title: 'Brian Mwangi (Tech-01)', subtitle: 'Field PWA Mode' },
    storekeeper: { title: 'Central Stores & Tools', subtitle: 'Storekeeper' },
    finance: { title: 'Finance & Invoicing', subtitle: 'Billing Admin' },
    customer: { title: 'Apex Commercial Hub', subtitle: 'Client Portal' }
  };

  // Global search results across modules
  const q = searchQuery.trim().toLowerCase();
  const matchingOrders = q
    ? workOrders.filter(
        w =>
          w.orderNumber.toLowerCase().includes(q) ||
          w.title.toLowerCase().includes(q) ||
          w.customerName.toLowerCase().includes(q) ||
          w.siteName.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];
  const matchingAssets = q
    ? assets.filter(
        a =>
          a.name.toLowerCase().includes(q) ||
          a.serialNumber.toLowerCase().includes(q) ||
          a.qrCode.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];
  const matchingTechs = q
    ? technicians.filter(
        t =>
          t.name.toLowerCase().includes(q) ||
          t.employeeId.toLowerCase().includes(q) ||
          t.zone.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];
  const matchingTickets = q
    ? tickets.filter(
        t =>
          t.ticketNumber.toLowerCase().includes(q) ||
          t.title.toLowerCase().includes(q) ||
          t.customerName.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];
  const hasSearchResults =
    matchingOrders.length > 0 ||
    matchingAssets.length > 0 ||
    matchingTechs.length > 0 ||
    matchingTickets.length > 0;

  const renderSearchDropdown = () => {
    if (!q) return null;
    return (
      <div className="absolute left-0 right-0 top-full mt-1.5 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-2.5 z-50 max-h-80 overflow-y-auto text-xs space-y-2">
        {!hasSearchResults ? (
          <div className="py-3 text-center text-slate-400 font-mono">
            No matching work orders, assets, crews, or tickets for "{searchQuery}"
          </div>
        ) : (
          <>
            {matchingOrders.length > 0 && (
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500 px-2 pb-1">Work Orders</div>
                {matchingOrders.map(wo => (
                  <button
                    key={wo.id}
                    onClick={() => {
                      setSelectedWorkOrderId(wo.id);
                      setActiveTab('work-orders');
                      setSearchQuery('');
                      setShowMobileSearch(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="truncate">
                      <span className="font-mono font-bold text-cyan-400 mr-2">{wo.orderNumber}</span>
                      <span className="text-white font-medium">{wo.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">{wo.siteName}</span>
                  </button>
                ))}
              </div>
            )}

            {matchingAssets.length > 0 && (
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500 px-2 pb-1">Installed Assets</div>
                {matchingAssets.map(asset => (
                  <button
                    key={asset.id}
                    onClick={() => {
                      setActiveTab('assets');
                      setSearchQuery('');
                      setShowMobileSearch(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="truncate">
                      <span className="font-mono font-bold text-emerald-400 mr-2">{asset.qrCode}</span>
                      <span className="text-white font-medium">{asset.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">{asset.serialNumber}</span>
                  </button>
                ))}
              </div>
            )}

            {matchingTechs.length > 0 && (
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500 px-2 pb-1">Technicians</div>
                {matchingTechs.map(tech => (
                  <button
                    key={tech.id}
                    onClick={() => {
                      setActiveTechnicianId(tech.id);
                      setActiveTab('technicians');
                      setSearchQuery('');
                      setShowMobileSearch(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="truncate">
                      <span className="font-mono font-bold text-cyan-400 mr-2">{tech.employeeId}</span>
                      <span className="text-white font-medium">{tech.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">{tech.zone}</span>
                  </button>
                ))}
              </div>
            )}

            {matchingTickets.length > 0 && (
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500 px-2 pb-1">Service Tickets</div>
                {matchingTickets.map(tkt => (
                  <button
                    key={tkt.id}
                    onClick={() => {
                      setActiveTab('tickets');
                      setSearchQuery('');
                      setShowMobileSearch(false);
                    }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-800 flex items-center justify-between gap-2 cursor-pointer"
                  >
                    <div className="truncate">
                      <span className="font-mono font-bold text-rose-400 mr-2">{tkt.ticketNumber}</span>
                      <span className="text-white font-medium">{tkt.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">{tkt.priority}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <header className="shrink-0 z-40 bg-slate-900 border-b border-slate-800">
      <div className="h-14 px-3 sm:px-4 lg:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Hamburger (Mobile) + Brand Wordmark */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          {onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden h-8 w-8 flex items-center justify-center rounded-md bg-slate-800 border border-slate-700 text-slate-200 hover:text-white cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); setActiveTab('dispatcher-workspace'); }} 
            className="flex items-center gap-2 sm:gap-2.5 font-bold tracking-tight text-white hover:text-cyan-400 transition-colors shrink-0 group"
          >
            <FielysLogo className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 transition-transform group-hover:scale-105" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg tracking-wider font-extrabold text-cyan-400">FIELYS</span>
              <span className="hidden xs:inline text-[11px] sm:text-xs font-mono text-slate-400 font-normal">FSM OS</span>
            </div>
          </a>

          {/* Quiet breadcrumb separator */}
          <span className="hidden sm:inline text-slate-700 font-mono">/</span>
          <span className="hidden sm:inline text-xs font-medium text-slate-300 capitalize truncate max-w-[160px] lg:max-w-[200px]">
            {activeTab.replace(/-/g, ' ')}
          </span>
        </div>

        {/* Zone 2: Global Search Bar (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4 relative">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search WO#, asset, customer, site..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-7 text-xs bg-slate-800/80 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {renderSearchDropdown()}
        </div>

        {/* Zone 3: Theme Toggle + Primary Actions + Role Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden h-8 w-8 flex items-center justify-center rounded-md bg-slate-800 border border-slate-700 text-slate-200 hover:text-white cursor-pointer"
            aria-label="Toggle search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="h-8 px-2 sm:px-2.5 flex items-center gap-1.5 rounded-md text-xs font-mono bg-slate-800 border border-slate-700 text-slate-200 hover:border-cyan-500/60 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden lg:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden lg:inline">Dark</span>
              </>
            )}
          </button>

          {/* Network status toggle (simulation for offline field PWA) */}
          <button
            onClick={toggleOfflineMode}
            title={isOnline ? 'Online (Click to simulate offline)' : 'Offline (Click to go online)'}
            className={`h-8 px-2 sm:px-2.5 flex items-center gap-1.5 rounded-md text-xs font-mono border transition-colors cursor-pointer ${
              isOnline 
                ? 'bg-slate-800 text-emerald-400 border-emerald-900/40 hover:bg-slate-700' 
                : 'bg-rose-950/80 text-rose-300 border-rose-800 hover:bg-rose-900'
            }`}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
          </button>

          {/* Notification Bell with Badge */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotificationDrawer(!showNotificationDrawer);
                setShowRoleMenu(false);
              }}
              className="relative h-8 w-8 flex items-center justify-center rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Alerts"
            >
              <Bell className="w-3.5 h-3.5" />
              {metrics.slaBreachRiskCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white font-mono">
                  {metrics.slaBreachRiskCount}
                </span>
              )}
            </button>

            {/* Quick Notification Dropdown */}
            {showNotificationDrawer && (
              <div className="fixed sm:absolute right-2 sm:right-0 top-14 sm:top-auto sm:mt-2 w-[calc(100vw-1rem)] max-w-80 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-semibold text-white">Operational Alerts</span>
                  <span className="text-[11px] font-mono text-rose-400">{metrics.slaBreachRiskCount} SLA Risks</span>
                </div>
                <div className="divide-y divide-slate-800 mt-1 text-xs">
                  <button
                    onClick={() => {
                      setActiveTab('tickets');
                      setShowNotificationDrawer(false);
                    }}
                    className="w-full text-left py-2 hover:bg-slate-800/60 rounded px-1.5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-rose-400 font-medium">
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        <span>SLA Risk: TKT-1090 (Ballroom Chiller)</span>
                      </span>
                      <ArrowRight className="w-3 h-3 shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">High priority. Response deadline in 14 minutes.</p>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('tools');
                      setShowNotificationDrawer(false);
                    }}
                    className="w-full text-left py-2 hover:bg-slate-800/60 rounded px-1.5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-amber-400 font-medium">
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        <span>Tool Calibration Overdue: Fujikura 90S+</span>
                      </span>
                      <ArrowRight className="w-3 h-3 shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Assigned to David Ochieng. Expired 6 days ago.</p>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedWorkOrderId('wo-2026-077');
                      setActiveTab('work-orders');
                      setShowNotificationDrawer(false);
                    }}
                    className="w-full text-left py-2 hover:bg-slate-800/60 rounded px-1.5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-cyan-400 font-medium">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span>WO-2026-077 Completed</span>
                      </span>
                      <ArrowRight className="w-3 h-3 shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Kilimani solar service signed by customer (5★).</p>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRoleMenu(!showRoleMenu);
                setShowNotificationDrawer(false);
              }}
              className="h-8 px-2 sm:px-2.5 flex items-center gap-1.5 sm:gap-2 bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-md text-xs text-left cursor-pointer transition-colors"
            >
              <div className="hidden sm:flex flex-col text-right">
                <span className="font-semibold text-slate-200 leading-tight text-[11px]">
                  {roleLabels[userRole].title}
                </span>
                <span className="text-[9px] text-slate-400 font-mono leading-tight">
                  {roleLabels[userRole].subtitle}
                </span>
              </div>
              <span className="sm:hidden text-[10px] font-mono font-semibold text-slate-200 uppercase">
                {userRole.slice(0, 4)}
              </span>
              <div className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
            </button>

            {showRoleMenu && (
              <div className="fixed sm:absolute right-2 sm:right-0 top-14 sm:top-auto sm:mt-2 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-1.5 z-50">
                {userEmail && (
                  <div className="px-2.5 py-1.5 mb-1 bg-slate-950/60 rounded text-[10px] font-mono text-slate-400 truncate">
                    Signed in: <span className="text-cyan-400">{userEmail}</span>
                  </div>
                )}
                <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  Switch Role / View
                </div>
                {(Object.keys(roleLabels) as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setUserRole(role);
                      if (role === 'technician') setActiveTab('mobile-field');
                      else if (role === 'customer') setActiveTab('customer-portal');
                      else if (role === 'storekeeper') setActiveTab('inventory');
                      else if (role === 'finance') setActiveTab('invoicing');
                      else setActiveTab('dispatcher-workspace');
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-md text-xs transition-colors flex items-center justify-between cursor-pointer ${
                      userRole === role ? 'bg-cyan-950/80 text-cyan-300 font-medium' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-xs">{roleLabels[role].title}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{roleLabels[role].subtitle}</div>
                    </div>
                    {role === 'technician' && <Smartphone className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                ))}
                <div className="pt-1 mt-1 border-t border-slate-800 space-y-0.5">
                  <button
                    onClick={() => {
                      resetToMockData();
                      setShowRoleMenu(false);
                    }}
                    className="w-full text-left px-2 py-1.5 text-[11px] text-slate-400 hover:text-white hover:bg-slate-800 rounded flex items-center gap-1.5 cursor-pointer font-mono"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Simulation Data
                  </button>
                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      logout();
                    }}
                    className="w-full text-left px-2 py-1.5 text-[11px] text-rose-400 hover:bg-rose-950/60 rounded flex items-center gap-1.5 cursor-pointer font-mono"
                  >
                    <LogOut className="w-3 h-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Button: + New Work Order */}
          <button
            onClick={onOpenNewModal}
            className="h-8 px-2.5 sm:px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Work Order</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      {showMobileSearch && (
        <div className="md:hidden px-3 pb-2.5 pt-1 border-t border-slate-800/80 relative">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              autoFocus
              placeholder="Search WO#, asset, customer, site..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-7 text-xs bg-slate-800 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {renderSearchDropdown()}
        </div>
      )}
    </header>
  );
};
