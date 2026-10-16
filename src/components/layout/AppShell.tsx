import React, { useState, useEffect } from 'react';
import { useFielys } from '../../context/FielysContext';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { LiveOpsTicker } from '../dashboard/LiveOpsTicker';
import { DispatcherWorkspace } from '../dashboard/DispatcherWorkspace';
import { GanttScheduleBoard } from '../schedule/GanttScheduleBoard';
import { WorkOrderListAndDetail } from '../workorders/WorkOrderListAndDetail';
import { TechnicianMobileView } from '../mobile/TechnicianMobileView';
import { TechnicianRegistryView } from '../technicians/TechnicianRegistryView';
import { CustomerAssetRegistry } from '../assets/CustomerAssetRegistry';
import { InventoryManagement } from '../inventory/InventoryManagement';
import { ServiceContractsView } from '../contracts/ServiceContractsView';
import { InvoicingAndBilling } from '../invoicing/InvoicingAndBilling';
import { ApprovalsView } from '../approvals/ApprovalsView';
import { ToolsTrackingView } from '../tools/ToolsTrackingView';
import { CustomerPortalView } from '../customer/CustomerPortalView';
import { LeadsAndQuotesView } from '../leads/LeadsAndQuotesView';
import { ServiceTicketsView } from '../tickets/ServiceTicketsView';
import { RouteTravelMap } from '../routes/RouteTravelMap';
import { SubcontractorsView } from '../subcontractors/SubcontractorsView';
import { ServiceReportsView } from '../reports/ServiceReportsView';
import { ExecutiveAnalyticsView } from '../analytics/ExecutiveAnalyticsView';
import { SystemSettingsAndIntegrations } from '../settings/SystemSettingsAndIntegrations';
import { NewWorkOrderModal } from '../common/NewWorkOrderModal';
import { LoginPage } from '../auth/LoginPage';

const VALID_TABS = [
  'dispatcher-workspace',
  'schedule-board',
  'work-orders',
  'tickets',
  'leads-quotes',
  'mobile-field',
  'technicians',
  'routes',
  'assets',
  'inventory',
  'core-returns',
  'contracts',
  'invoicing',
  'approvals',
  'tools',
  'subcontractors',
  'service-reports',
  'reports',
  'settings',
  'customer-portal'
];

const TAB_TITLES: Record<string, string> = {
  'dispatcher-workspace': 'Live Ops Center',
  'schedule-board': 'Gantt Dispatch Board',
  'work-orders': 'Work Orders',
  'tickets': 'Service Tickets',
  'leads-quotes': 'Leads & Quotations',
  'mobile-field': 'Technician Mobile PWA',
  'technicians': 'Field Technicians',
  'routes': 'Route & Fleet Travel Map',
  'assets': 'Customer Asset Registry',
  'inventory': 'Inventory & Central Stores',
  'core-returns': 'Core Returns & RMA',
  'contracts': 'Service Contracts & AMCs',
  'invoicing': 'Field Billing & Invoices',
  'approvals': 'Approvals & Governance',
  'tools': 'Calibrated Tools & Equipment',
  'subcontractors': 'Subcontractor Directory',
  'service-reports': 'Service Sign-Off Reports',
  'reports': 'Executive Analytics',
  'settings': 'System Settings & Integrations',
  'customer-portal': 'Customer Portal'
};

export const AppShell: React.FC = () => {
  const { activeTab, setActiveTab, userRole, isAuthenticated, setSelectedWorkOrderId } = useFielys();
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Dynamically update the browser tab title to reflect the active page
  useEffect(() => {
    if (!isAuthenticated) {
      document.title = 'Login · Fielys Field Service Management';
    } else {
      const pageName = TAB_TITLES[activeTab] || activeTab.replace(/-/g, ' ');
      document.title = `${pageName} | Fielys - Field Service Management`;
    }
  }, [activeTab, isAuthenticated]);

  useEffect(() => {
    const handleOpenReport = (e: Event) => {
      const customEvent = e as CustomEvent<{ orderId?: string }>;
      if (customEvent.detail?.orderId) {
        setSelectedWorkOrderId(customEvent.detail.orderId);
      }
      setActiveTab('service-reports');
    };
    window.addEventListener('open-service-report', handleOpenReport);
    return () => window.removeEventListener('open-service-report', handleOpenReport);
  }, [setActiveTab, setSelectedWorkOrderId]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // If in technician mobile role, prioritize the full mobile field experience
  if (userRole === 'technician' && activeTab === 'mobile-field') {
    return (
      <div className="h-screen overflow-y-auto bg-slate-950 font-sans">
        <TopBar onOpenNewModal={() => setIsNewOrderModalOpen(true)} />
        <TechnicianMobileView />
        <NewWorkOrderModal 
          isOpen={isNewOrderModalOpen} 
          onClose={() => setIsNewOrderModalOpen(false)} 
        />
      </div>
    );
  }

  // If in customer role, prioritize customer portal view
  if (userRole === 'customer') {
    return (
      <div className="h-screen overflow-hidden bg-slate-950 font-sans flex flex-col">
        <TopBar onOpenNewModal={() => setIsNewOrderModalOpen(true)} />
        <main className="flex-1 overflow-y-auto min-h-0">
          <CustomerPortalView />
        </main>
        <NewWorkOrderModal 
          isOpen={isNewOrderModalOpen} 
          onClose={() => setIsNewOrderModalOpen(false)} 
        />
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract (3 Zones) */}
      <TopBar
        onOpenNewModal={() => setIsNewOrderModalOpen(true)}
        onToggleMobileMenu={() => setIsMobileSidebarOpen(prev => !prev)}
      />

      {/* Live Operations Summary Banner */}
      <div className="shrink-0">
        <LiveOpsTicker />
      </div>

      {/* Workspace Body: Sidebar + Main Content (Independently Scrollable) */}
      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        <Sidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Main Viewport */}
        <main className="flex-1 h-full overflow-y-auto min-h-0 bg-slate-950">
          {activeTab === 'dispatcher-workspace' && <DispatcherWorkspace />}
          {activeTab === 'schedule-board' && <GanttScheduleBoard />}
          {activeTab === 'work-orders' && <WorkOrderListAndDetail />}
          {activeTab === 'tickets' && <ServiceTicketsView />}
          {activeTab === 'leads-quotes' && <LeadsAndQuotesView />}
          {activeTab === 'mobile-field' && <TechnicianMobileView />}
          {activeTab === 'technicians' && <TechnicianRegistryView />}
          {activeTab === 'routes' && <RouteTravelMap />}
          {activeTab === 'assets' && <CustomerAssetRegistry />}
          {activeTab === 'inventory' && <InventoryManagement />}
          {activeTab === 'core-returns' && <InventoryManagement />}
          {activeTab === 'contracts' && <ServiceContractsView />}
          {activeTab === 'invoicing' && <InvoicingAndBilling />}
          {activeTab === 'approvals' && <ApprovalsView />}
          {activeTab === 'tools' && <ToolsTrackingView />}
          {activeTab === 'subcontractors' && <SubcontractorsView />}
          {activeTab === 'service-reports' && <ServiceReportsView />}
          {activeTab === 'reports' && <ExecutiveAnalyticsView />}
          {activeTab === 'settings' && <SystemSettingsAndIntegrations />}
          {activeTab === 'customer-portal' && <CustomerPortalView />}
          
          {/* Fallback to Dispatcher Workspace if unrecognized tab */}
          {!VALID_TABS.includes(activeTab) && (
            <DispatcherWorkspace />
          )}
        </main>
      </div>

      {/* New Work Order Modal */}
      <NewWorkOrderModal 
        isOpen={isNewOrderModalOpen} 
        onClose={() => setIsNewOrderModalOpen(false)} 
      />
    </div>
  );
};
