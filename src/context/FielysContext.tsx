// Fielys Context — Reactive Global State Engine
// Supporting multi-role switching, offline queueing, full CRUD across all modules, and LocalStorage persistence.

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  WorkOrder,
  WorkOrderStatus,
  ServiceTicket,
  Technician,
  Customer,
  InstalledAsset,
  InventoryPart,
  CoreReturn,
  CoreReturnStatus,
  ToolItem,
  ServiceContract,
  ApprovalRequest,
  Invoice,
  DashboardMetrics,
  SafetyRiskAssessment,
  WorkOrderType,
  PriorityLevel,
  Lead,
  Quotation,
  LeadStatus,
  Subcontractor,
  ServiceReportTemplate
} from '../types';
import {
  MOCK_CUSTOMERS,
  MOCK_ASSETS,
  MOCK_TECHNICIANS,
  MOCK_WORK_ORDERS,
  MOCK_TICKETS,
  MOCK_INVENTORY,
  MOCK_CORE_RETURNS,
  MOCK_TOOLS,
  MOCK_CONTRACTS,
  MOCK_APPROVALS,
  MOCK_INVOICES,
  MOCK_LEADS,
  MOCK_QUOTATIONS,
  MOCK_SUBCONTRACTORS,
  MOCK_TEMPLATES,
  INITIAL_METRICS
} from '../data/mockData';

interface FielysContextType {
  // Auth & Theme
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;

  // Navigation & Role
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeTechnicianId: string;
  setActiveTechnicianId: (id: string) => void;
  selectedWorkOrderId: string | null;
  setSelectedWorkOrderId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Offline & Connectivity
  isOnline: boolean;
  toggleOfflineMode: () => void;
  offlineQueueCount: number;
  
  // Data Collections
  customers: Customer[];
  assets: InstalledAsset[];
  technicians: Technician[];
  workOrders: WorkOrder[];
  tickets: ServiceTicket[];
  inventory: InventoryPart[];
  coreReturns: CoreReturn[];
  tools: ToolItem[];
  contracts: ServiceContract[];
  approvals: ApprovalRequest[];
  invoices: Invoice[];
  leads: Lead[];
  quotations: Quotation[];
  subcontractors: Subcontractor[];
  templates: ServiceReportTemplate[];
  metrics: DashboardMetrics;
  
  // Actions
  updateWorkOrderStatus: (id: string, status: WorkOrderStatus, additionalData?: Partial<WorkOrder>) => void;
  createWorkOrder: (data: Partial<WorkOrder>) => WorkOrder;
  createTicket: (data: Partial<ServiceTicket>) => ServiceTicket;
  convertTicketToWorkOrder: (ticketId: string) => WorkOrder | null;
  createLead: (data: Partial<Lead>) => Lead;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  convertLeadToCustomerAndWorkOrder: (leadId: string) => { customer: Customer; workOrder: WorkOrder } | null;
  approveQuotation: (quoteId: string) => void;
  updateTemplate: (templateId: string, updates: Partial<ServiceReportTemplate>) => void;
  approveSubcontractorPayout: (subId: string, amount: number) => void;
  assignTechnicianToWorkOrder: (workOrderId: string, technicianId: string, scheduledDate?: string, timeWindow?: string) => void;
  updateChecklistItem: (workOrderId: string, itemId: string, value: any, notes?: string) => void;
  updateSafetyAssessment: (workOrderId: string, assessment: Partial<SafetyRiskAssessment>) => void;
  addPartToWorkOrder: (workOrderId: string, partId: string, quantity: number, isBillable?: boolean) => void;
  submitApproval: (data: Omit<ApprovalRequest, 'id' | 'createdAt' | 'status'>) => ApprovalRequest;
  reviewApproval: (approvalId: string, status: 'approved' | 'rejected', reason?: string) => void;
  logCoreReturn: (core: Omit<CoreReturn, 'id' | 'removedDate' | 'status'>) => CoreReturn;
  updateCoreReturnStatus: (coreId: string, status: CoreReturnStatus, rmaNumber?: string) => void;
  transferVanStock: (partId: string, technicianId: string, quantity: number, direction: 'warehouse_to_van' | 'van_to_warehouse') => void;
  generateWorkOrderInvoice: (workOrderId: string) => Invoice;
  processMpesaPayment: (invoiceId: string, phoneNumber: string, amount: number) => Promise<{ success: boolean; ref: string }>;
  signOffWorkOrder: (workOrderId: string, signature: string, signerName: string, rating: number, feedback?: string) => void;
  calibrateTool: (toolId: string) => void;
  createTool: (data: Partial<ToolItem>) => ToolItem;
  createAsset: (data: Partial<InstalledAsset>) => InstalledAsset;
  createTechnician: (data: Partial<Technician>) => Technician;
  updateTechnicianStatus: (techId: string, status: Technician['status']) => void;
  createInventoryPart: (data: Partial<InventoryPart>) => InventoryPart;
  resetToMockData: () => void;
}

const FielysContext = createContext<FielysContextType | undefined>(undefined);

const STORAGE_KEY = 'fielys_app_state_v1';

export const FielysProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('fielys_auth_session') === 'true';
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return sessionStorage.getItem('fielys_auth_email');
  });
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('fielys_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('fielys_theme', theme);
  }, [theme]);

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const login = (email: string, password: string): boolean => {
    const normalizedEmail = email.trim().toLowerCase();
    if (normalizedEmail === 'versalylabs@gmail.com' && password === 'labversaly-16') {
      setIsAuthenticated(true);
      setUserEmail('versalylabs@gmail.com');
      sessionStorage.setItem('fielys_auth_session', 'true');
      sessionStorage.setItem('fielys_auth_email', 'versalylabs@gmail.com');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    sessionStorage.removeItem('fielys_auth_session');
    sessionStorage.removeItem('fielys_auth_email');
  };

  const [userRole, setUserRole] = useState<UserRole>('dispatcher');
  const [activeTab, setActiveTab] = useState<string>('dispatcher-workspace');
  const [activeTechnicianId, setActiveTechnicianId] = useState<string>('tech-1'); // Brian Mwangi
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState<string | null>('wo-2026-088');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(0);

  // Core Data Collections
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_customers`);
    return saved ? JSON.parse(saved) : MOCK_CUSTOMERS;
  });

  const [assets, setAssets] = useState<InstalledAsset[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_assets`);
    return saved ? JSON.parse(saved) : MOCK_ASSETS;
  });

  const [technicians, setTechnicians] = useState<Technician[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_technicians`);
    return saved ? JSON.parse(saved) : MOCK_TECHNICIANS;
  });

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_work_orders`);
    return saved ? JSON.parse(saved) : MOCK_WORK_ORDERS;
  });

  const [tickets, setTickets] = useState<ServiceTicket[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tickets`);
    return saved ? JSON.parse(saved) : MOCK_TICKETS;
  });

  const [inventory, setInventory] = useState<InventoryPart[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_inventory`);
    return saved ? JSON.parse(saved) : MOCK_INVENTORY;
  });

  const [coreReturns, setCoreReturns] = useState<CoreReturn[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_core_returns`);
    return saved ? JSON.parse(saved) : MOCK_CORE_RETURNS;
  });

  const [tools, setTools] = useState<ToolItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tools`);
    return saved ? JSON.parse(saved) : MOCK_TOOLS;
  });

  const [contracts, setContracts] = useState<ServiceContract[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_contracts`);
    return saved ? JSON.parse(saved) : MOCK_CONTRACTS;
  });

  const [approvals, setApprovals] = useState<ApprovalRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_approvals`);
    return saved ? JSON.parse(saved) : MOCK_APPROVALS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_invoices`);
    return saved ? JSON.parse(saved) : MOCK_INVOICES;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_leads`);
    return saved ? JSON.parse(saved) : MOCK_LEADS;
  });

  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_quotations`);
    return saved ? JSON.parse(saved) : MOCK_QUOTATIONS;
  });

  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_subcontractors`);
    return saved ? JSON.parse(saved) : MOCK_SUBCONTRACTORS;
  });

  const [templates, setTemplates] = useState<ServiceReportTemplate[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_templates`);
    return saved ? JSON.parse(saved) : MOCK_TEMPLATES;
  });

  // Automatically recalculate dashboard metrics
  const metrics: DashboardMetrics = {
    workOrdersToday: 28,
    completed: workOrders.filter(w => w.status === 'completed' || w.status === 'verified' || w.status === 'invoiced').length + 17,
    inProgress: workOrders.filter(w => w.status === 'on_site' || w.status === 'en_route').length + 4,
    unassigned: workOrders.filter(w => w.status === 'unassigned' || !w.assignedTechnicianId).length + 3,
    totalTechnicians: 20,
    onSite: 15,
    enRoute: 3,
    available: 2,
    slaBreachRiskCount: tickets.filter(t => t.isSlaAtRisk).length,
    amcVisitsDueThisWeek: 12,
    vanStockAlertsCount: inventory.filter(p => p.warehouseStock <= p.minimumThreshold).length,
    toolsOverdueCount: tools.filter(t => t.isCalibrationOverdue).length,
    faultyCoresPendingReturn: coreReturns.filter(c => c.status === 'in_van').length,
    approvalsPendingCount: approvals.filter(a => a.status === 'pending').length,
    revenueTodayKSh: invoices
      .filter(i => i.status === 'paid')
      .reduce((sum, i) => sum + i.total, 401500),
    avgCustomerRating: 4.8
  };

  // Sync to LocalStorage on change
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_work_orders`, JSON.stringify(workOrders));
  }, [workOrders]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_inventory`, JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_approvals`, JSON.stringify(approvals));
  }, [approvals]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_invoices`, JSON.stringify(invoices));
  }, [invoices]);

  // Actions
  const toggleOfflineMode = () => {
    setIsOnline(prev => !prev);
  };

  const updateWorkOrderStatus = (id: string, status: WorkOrderStatus, additionalData?: Partial<WorkOrder>) => {
    setWorkOrders(prev =>
      prev.map(wo => {
        if (wo.id !== id) return wo;
        const now = new Date().toISOString();
        const updates: Partial<WorkOrder> = { ...additionalData, status };
        
        if (status === 'en_route' && !wo.enRouteAt) {
          updates.enRouteAt = now;
        } else if (status === 'on_site' && !wo.arrivedAt) {
          updates.arrivedAt = now;
          updates.checkInCoordinates = { lat: wo.coordinates.lat, lng: wo.coordinates.lng };
        } else if (status === 'completed' && !wo.completedAt) {
          updates.completedAt = now;
          updates.checkOutCoordinates = { lat: wo.coordinates.lat, lng: wo.coordinates.lng };
        }
        
        return { ...wo, ...updates };
      })
    );

    // Also update technician's status
    const wo = workOrders.find(w => w.id === id);
    if (wo && wo.assignedTechnicianId) {
      setTechnicians(prev =>
        prev.map(tech => {
          if (tech.id !== wo.assignedTechnicianId) return tech;
          let techStatus = tech.status;
          if (status === 'en_route') techStatus = 'en_route';
          else if (status === 'on_site') techStatus = 'on_site';
          else if (status === 'completed') techStatus = 'available';
          return { ...tech, status: techStatus, currentWorkOrderId: status === 'completed' ? undefined : id };
        })
      );
    }
  };

  const createWorkOrder = (data: Partial<WorkOrder>): WorkOrder => {
    const orderNumber = `WO-2026-${String(Math.floor(100 + Math.random() * 900))}`;
    const newWo: WorkOrder = {
      id: `wo-${Date.now()}`,
      orderNumber,
      customerId: data.customerId || 'cust-101',
      customerName: data.customerName || 'Apex Commercial Hub',
      siteId: data.siteId || 'site-101-a',
      siteName: data.siteName || 'Apex Westlands Tower',
      siteAddress: data.siteAddress || 'Plot 44 Waiyaki Way, Westlands',
      zone: data.zone || 'Westlands & Parklands',
      coordinates: data.coordinates || { lat: -1.2685, lng: 36.8042 },
      type: data.type || 'corrective',
      priority: data.priority || 'medium',
      status: data.assignedTechnicianId ? 'scheduled' : 'draft',
      title: data.title || 'General Maintenance Inspection',
      description: data.description || '',
      requiredSkills: data.requiredSkills || ['High-Voltage Solar (EPRA Class T3)'],
      assignedTechnicianId: data.assignedTechnicianId,
      assignedTechnicianName: data.assignedTechnicianName,
      scheduledDate: data.scheduledDate || new Date().toISOString().split('T')[0],
      scheduledTimeWindow: data.scheduledTimeWindow || '10:00 AM - 01:00 PM',
      estimatedDurationHours: data.estimatedDurationHours || 2.5,
      safetyAssessment: {
        ppeChecked: false,
        lockoutTagoutDone: false,
        ladderSecured: false,
        voltageZeroConfirmed: false,
        customerNotifiedOfHazards: false
      },
      checklist: data.checklist || [],
      partsUsed: [],
      beforePhotos: [],
      afterPhotos: [],
      laborCost: 9000,
      partsCost: 0,
      subcontractorCost: 0,
      travelMileageCost: 1000,
      billableTotal: 15000,
      isWarrantyWork: data.isWarrantyWork || false,
      isRepeatCall: false,
      ...data
    };

    setWorkOrders(prev => [newWo, ...prev]);
    return newWo;
  };

  const createTicket = (data: Partial<ServiceTicket>): ServiceTicket => {
    const num = `TKT-${Math.floor(2000 + Math.random() * 8000)}`;
    const newTicket: ServiceTicket = {
      id: `tkt-${Date.now()}`,
      ticketNumber: num,
      customerId: data.customerId || 'cust-101',
      customerName: data.customerName || 'Apex Commercial Hub',
      siteId: data.siteId || 'site-101-a',
      siteName: data.siteName || 'Apex Westlands Tower',
      category: data.category || 'General',
      title: data.title || 'Reported Fault',
      description: data.description || '',
      priority: data.priority || 'medium',
      source: data.source || 'portal',
      status: 'new',
      reportedAt: new Date().toISOString(),
      slaResponseDeadline: new Date(Date.now() + 30 * 60000).toISOString(),
      slaResolutionDeadline: new Date(Date.now() + 6 * 3600000).toISOString(),
      isSlaAtRisk: false,
      ...data
    };
    setTickets(prev => [newTicket, ...prev]);
    return newTicket;
  };

  const convertTicketToWorkOrder = (ticketId: string): WorkOrder | null => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return null;

    const wo = createWorkOrder({
      ticketId: ticket.id,
      customerId: ticket.customerId,
      customerName: ticket.customerName,
      siteId: ticket.siteId,
      siteName: ticket.siteName,
      priority: ticket.priority,
      title: ticket.title,
      description: ticket.description,
      type: 'corrective'
    });

    setTickets(prev =>
      prev.map(t => (t.id === ticketId ? { ...t, status: 'converted', assignedWorkOrderId: wo.id } : t))
    );

    return wo;
  };

  const createLead = (data: Partial<Lead>): Lead => {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      companyName: data.companyName || 'New Prospect',
      contactName: data.contactName || 'Contact Person',
      phone: data.phone || '+254 700 000 000',
      email: data.email || 'client@prospect.co.ke',
      serviceRequested: data.serviceRequested || 'Solar / HVAC Survey',
      siteAddress: data.siteAddress || 'Nairobi',
      zone: data.zone || 'Westlands & Parklands',
      status: 'new',
      createdAt: new Date().toISOString().split('T')[0],
      estimatedBudgetKSh: data.estimatedBudgetKSh || 500000,
      ...data
    };
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads(prev => prev.map(l => (l.id === leadId ? { ...l, status } : l)));
  };

  const convertLeadToCustomerAndWorkOrder = (leadId: string): { customer: Customer; workOrder: WorkOrder } | null => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return null;

    const newCustomerId = `cust-${Date.now()}`;
    const newSiteId = `site-${Date.now()}`;

    const newCustomer: Customer = {
      id: newCustomerId,
      name: lead.companyName,
      type: 'commercial',
      email: lead.email,
      phone: lead.phone,
      headOfficeAddress: lead.siteAddress,
      billingTerms: 'Net 30 Days',
      createdAt: new Date().toISOString().split('T')[0],
      sites: [
        {
          id: newSiteId,
          customerId: newCustomerId,
          name: `${lead.companyName} Primary Facility`,
          address: lead.siteAddress,
          zone: lead.zone,
          coordinates: { lat: -1.2750, lng: 36.8100 },
          contactName: lead.contactName,
          contactPhone: lead.phone,
          contactRole: 'Site Operations Lead',
          operatingHours: '08:00 - 18:00 EAT',
          activeAssetsCount: 1
        }
      ]
    };

    setCustomers(prev => [newCustomer, ...prev]);

    const newWo = createWorkOrder({
      customerId: newCustomerId,
      customerName: newCustomer.name,
      siteId: newSiteId,
      siteName: newCustomer.sites[0].name,
      siteAddress: newCustomer.sites[0].address,
      zone: newCustomer.sites[0].zone,
      type: 'installation',
      priority: 'high',
      title: `New Installation: ${lead.serviceRequested}`,
      description: `Turnkey installation converted from Won Lead. Client requirements: ${lead.surveyNotes || lead.serviceRequested}`,
      assignedTechnicianId: lead.assignedSurveyorId,
      assignedTechnicianName: lead.assignedSurveyorName,
      billableTotal: lead.quotationTotalKSh || lead.estimatedBudgetKSh
    });

    setLeads(prev =>
      prev.map(l =>
        l.id === leadId
          ? {
              ...l,
              status: 'won',
              convertedCustomerId: newCustomerId,
              convertedWorkOrderId: newWo.id
            }
          : l
      )
    );

    return { customer: newCustomer, workOrder: newWo };
  };

  const approveQuotation = (quoteId: string) => {
    setQuotations(prev =>
      prev.map(q => (q.id === quoteId ? { ...q, status: 'approved' } : q))
    );
  };

  const updateTemplate = (templateId: string, updates: Partial<ServiceReportTemplate>) => {
    setTemplates(prev =>
      prev.map(t => (t.id === templateId ? { ...t, ...updates } : t))
    );
  };

  const approveSubcontractorPayout = (subId: string, amount: number) => {
    setSubcontractors(prev =>
      prev.map(sub =>
        sub.id === subId
          ? {
              ...sub,
              pendingPayoutKSh: Math.max(0, sub.pendingPayoutKSh - amount)
            }
          : sub
      )
    );
  };

  const assignTechnicianToWorkOrder = (
    workOrderId: string,
    technicianId: string,
    scheduledDate?: string,
    timeWindow?: string
  ) => {
    const tech = technicians.find(t => t.id === technicianId);
    setWorkOrders(prev =>
      prev.map(wo => {
        if (wo.id !== workOrderId) return wo;
        return {
          ...wo,
          assignedTechnicianId: technicianId,
          assignedTechnicianName: tech ? tech.name : undefined,
          status: 'scheduled',
          scheduledDate: scheduledDate || wo.scheduledDate,
          scheduledTimeWindow: timeWindow || wo.scheduledTimeWindow
        };
      })
    );
  };

  const updateChecklistItem = (workOrderId: string, itemId: string, value: any, notes?: string) => {
    setWorkOrders(prev =>
      prev.map(wo => {
        if (wo.id !== workOrderId) return wo;
        const updatedChecklist = wo.checklist.map(item => {
          if (item.id !== itemId) return item;
          let isPass = true;
          if (typeof value === 'boolean') {
            isPass = value;
          } else if (typeof value === 'number') {
            if (item.thresholdMin !== undefined && value < item.thresholdMin) isPass = false;
            if (item.thresholdMax !== undefined && value > item.thresholdMax) isPass = false;
          }
          return { ...item, value, isPass, notes: notes !== undefined ? notes : item.notes };
        });
        return { ...wo, checklist: updatedChecklist };
      })
    );
  };

  const updateSafetyAssessment = (workOrderId: string, assessment: Partial<SafetyRiskAssessment>) => {
    setWorkOrders(prev =>
      prev.map(wo => {
        if (wo.id !== workOrderId) return wo;
        return {
          ...wo,
          safetyAssessment: {
            ...wo.safetyAssessment,
            ...assessment,
            completedAt: new Date().toISOString()
          }
        };
      })
    );
  };

  const addPartToWorkOrder = (workOrderId: string, partId: string, quantity: number, isBillable = true) => {
    const part = inventory.find(p => p.id === partId);
    if (!part) return;

    setWorkOrders(prev =>
      prev.map(wo => {
        if (wo.id !== workOrderId) return wo;
        const existingUsage = wo.partsUsed.find(pu => pu.partId === partId);
        let updatedParts = [...wo.partsUsed];
        if (existingUsage) {
          updatedParts = updatedParts.map(pu =>
            pu.partId === partId ? { ...pu, quantity: pu.quantity + quantity } : pu
          );
        } else {
          updatedParts.push({
            id: `pu-${Date.now()}`,
            partId: part.id,
            partSku: part.sku,
            partName: part.name,
            quantity,
            unitPrice: part.sellPrice,
            unitCost: part.unitCost,
            isBillable,
            isWarranty: !isBillable
          });
        }

        const additionalPartsCost = part.unitCost * quantity;
        const additionalBillable = isBillable ? part.sellPrice * quantity : 0;

        return {
          ...wo,
          partsUsed: updatedParts,
          partsCost: wo.partsCost + additionalPartsCost,
          billableTotal: wo.billableTotal + additionalBillable
        };
      })
    );

    // Deduct from technician van stock if assigned
    const wo = workOrders.find(w => w.id === workOrderId);
    if (wo && wo.assignedTechnicianId) {
      setInventory(prev =>
        prev.map(p => {
          if (p.id !== partId) return p;
          const currentVan = p.vanStock[wo.assignedTechnicianId!] || 0;
          return {
            ...p,
            vanStock: {
              ...p.vanStock,
              [wo.assignedTechnicianId!]: Math.max(0, currentVan - quantity)
            }
          };
        })
      );
    }
  };

  const submitApproval = (data: Omit<ApprovalRequest, 'id' | 'createdAt' | 'status'>): ApprovalRequest => {
    const newApproval: ApprovalRequest = {
      id: `appr-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...data
    };
    setApprovals(prev => [newApproval, ...prev]);
    return newApproval;
  };

  const reviewApproval = (approvalId: string, status: 'approved' | 'rejected', reason?: string) => {
    setApprovals(prev =>
      prev.map(appr => {
        if (appr.id !== approvalId) return appr;
        return {
          ...appr,
          status,
          approvedBy: status === 'approved' ? 'Operations Dispatcher' : undefined,
          approvedAt: new Date().toISOString(),
          rejectionReason: reason
        };
      })
    );
  };

  const logCoreReturn = (core: Omit<CoreReturn, 'id' | 'removedDate' | 'status'>): CoreReturn => {
    const newCore: CoreReturn = {
      id: `core-${Date.now()}`,
      removedDate: new Date().toISOString().split('T')[0],
      status: 'in_van',
      ...core
    };
    setCoreReturns(prev => [newCore, ...prev]);
    return newCore;
  };

  const updateCoreReturnStatus = (coreId: string, status: CoreReturnStatus, rmaNumber?: string) => {
    setCoreReturns(prev =>
      prev.map(c => (c.id === coreId ? { ...c, status, rmaNumber: rmaNumber || c.rmaNumber } : c))
    );
  };

  const transferVanStock = (
    partId: string,
    technicianId: string,
    quantity: number,
    direction: 'warehouse_to_van' | 'van_to_warehouse'
  ) => {
    setInventory(prev =>
      prev.map(part => {
        if (part.id !== partId) return part;
        const currentVan = part.vanStock[technicianId] || 0;
        if (direction === 'warehouse_to_van') {
          return {
            ...part,
            warehouseStock: Math.max(0, part.warehouseStock - quantity),
            vanStock: { ...part.vanStock, [technicianId]: currentVan + quantity }
          };
        } else {
          return {
            ...part,
            warehouseStock: part.warehouseStock + quantity,
            vanStock: { ...part.vanStock, [technicianId]: Math.max(0, currentVan - quantity) }
          };
        }
      })
    );
  };

  const generateWorkOrderInvoice = (workOrderId: string): Invoice => {
    const wo = workOrders.find(w => w.id === workOrderId);
    if (!wo) throw new Error('Work order not found');

    const invNum = `INV-2026-${Math.floor(5000 + Math.random() * 5000)}`;
    const lineItems = [
      {
        description: `${wo.type.toUpperCase()} Labor - ${wo.title} (${wo.actualDurationHours || wo.estimatedDurationHours} hrs)`,
        quantity: 1,
        unitPrice: wo.laborCost,
        amount: wo.laborCost,
        isCoveredUnderWarrantyOrAmc: wo.isWarrantyWork
      },
      ...wo.partsUsed.map(p => ({
        description: `${p.partName} [SKU: ${p.partSku}]`,
        quantity: p.quantity,
        unitPrice: p.unitPrice,
        amount: p.unitPrice * p.quantity,
        isCoveredUnderWarrantyOrAmc: p.isWarranty
      }))
    ];

    const subtotal = lineItems.reduce((acc, item) => acc + (item.isCoveredUnderWarrantyOrAmc ? 0 : item.amount), 0);
    const tax = Math.round(subtotal * 0.16); // 16% VAT
    const total = subtotal + tax;

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: invNum,
      workOrderId: wo.id,
      orderNumber: wo.orderNumber,
      customerId: wo.customerId,
      customerName: wo.customerName,
      customerEmail: 'billing@client.co.ke',
      siteName: wo.siteName,
      issuedDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'draft',
      items: lineItems,
      subtotal,
      tax,
      discount: 0,
      total,
      amountPaid: 0,
      jobProfitability: {
        revenue: total,
        laborCost: wo.laborCost,
        partsCost: wo.partsCost,
        travelCost: wo.travelMileageCost,
        subcontractorCost: wo.subcontractorCost,
        netMargin: total - (wo.laborCost + wo.partsCost + wo.travelMileageCost + wo.subcontractorCost),
        marginPercentage: total > 0 ? Math.round(((total - (wo.laborCost + wo.partsCost + wo.travelMileageCost)) / total) * 100) : 0
      }
    };

    setInvoices(prev => [newInvoice, ...prev]);
    return newInvoice;
  };

  const processMpesaPayment = async (
    invoiceId: string,
    phoneNumber: string,
    amount: number
  ): Promise<{ success: boolean; ref: string }> => {
    // Simulate real-time M-Pesa STK Push handshake
    return new Promise(resolve => {
      setTimeout(() => {
        const ref = `QDH${Math.floor(100000 + Math.random() * 900000)}77`;
        setInvoices(prev =>
          prev.map(inv => {
            if (inv.id !== invoiceId) return inv;
            return {
              ...inv,
              status: 'paid',
              amountPaid: amount,
              paymentMethod: 'mpesa_stk',
              paymentReference: ref,
              paidAt: new Date().toISOString()
            };
          })
        );
        resolve({ success: true, ref });
      }, 1500);
    });
  };

  const signOffWorkOrder = (
    workOrderId: string,
    signature: string,
    signerName: string,
    rating: number,
    feedback?: string
  ) => {
    setWorkOrders(prev =>
      prev.map(wo => {
        if (wo.id !== workOrderId) return wo;
        return {
          ...wo,
          status: 'completed',
          completedAt: new Date().toISOString(),
          customerSignature: signature,
          customerSignerName: signerName,
          customerRating: rating,
          customerFeedback: feedback
        };
      })
    );
  };

  const calibrateTool = (toolId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const nextYear = new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0];
    setTools(prev =>
      prev.map(tool =>
        tool.id === toolId
          ? {
              ...tool,
              isCalibrationOverdue: false,
              condition: 'good',
              lastInspectionDate: today,
              calibrationDueDate: nextYear
            }
          : tool
      )
    );
  };

  const createTool = (data: Partial<ToolItem>): ToolItem => {
    const newTool: ToolItem = {
      id: `tool-${Date.now()}`,
      toolCode: data.toolCode || `TL-${Math.floor(100 + Math.random() * 900)}`,
      name: data.name || 'Fluke Digital Insulation Tester',
      serialNumber: data.serialNumber || `SN-${Math.floor(10000 + Math.random() * 90000)}`,
      category: data.category || 'Testing Meter',
      assignedToTechnicianId: data.assignedToTechnicianId,
      assignedTechnicianName: data.assignedTechnicianName || 'Store Crib',
      condition: 'good',
      calibrationDueDate: data.calibrationDueDate || new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
      isCalibrationOverdue: false,
      lastInspectionDate: new Date().toISOString().split('T')[0],
      replacementCost: data.replacementCost || 45000,
      ...data
    };
    setTools(prev => [newTool, ...prev]);
    return newTool;
  };

  const createAsset = (data: Partial<InstalledAsset>): InstalledAsset => {
    const qrNum = Math.floor(100 + Math.random() * 900);
    const newAsset: InstalledAsset = {
      id: `ast-${Date.now()}`,
      customerId: data.customerId || customers[0]?.id || 'cust-101',
      siteId: data.siteId || customers[0]?.sites[0]?.id || 'site-101-a',
      name: data.name || 'Commercial Inverter System',
      category: data.category || 'Solar & Inverter',
      brand: data.brand || 'Victron Energy',
      model: data.model || 'Quattro 15kVA',
      serialNumber: data.serialNumber || `SN-${Date.now().toString().slice(-6)}`,
      qrCode: data.qrCode || `QR-AST-${qrNum}`,
      installationDate: new Date().toISOString().split('T')[0],
      warrantyEndDate: data.warrantyEndDate || '2028-10-04',
      status: data.status || 'operational',
      lastServicedDate: new Date().toISOString().split('T')[0],
      specifications: data.specifications || { Capacity: '15 kVA', Voltage: '48V DC / 230V AC' },
      ...data
    };
    setAssets(prev => [newAsset, ...prev]);
    return newAsset;
  };

  const createTechnician = (data: Partial<Technician>): Technician => {
    const techNum = technicians.length + 1;
    const newTech: Technician = {
      id: `tech-${Date.now()}`,
      name: data.name || 'New Field Engineer',
      employeeId: data.employeeId || `TECH-00${techNum}`,
      phone: data.phone || '+254 722 000 111',
      email: data.email || 'engineer@fielys.co.ke',
      avatar: '',
      skills: data.skills || ['High-Voltage Solar (EPRA Class T3)', 'Commercial HVAC VRV'],
      certifications: data.certifications || [{ name: 'EPRA Solar T3 License', expiryDate: '2027-12-31' }],
      zone: data.zone || 'Westlands & Parklands',
      vehiclePlate: data.vehiclePlate || 'KDG 410Z',
      vehicleModel: data.vehicleModel || 'Toyota Hilux Double Cab',
      hourlyCostRate: data.hourlyCostRate || 1800,
      hourlyBillingRate: data.hourlyBillingRate || 4500,
      status: data.status || 'available',
      currentLocation: {
        lat: -1.2685,
        lng: 36.8042,
        lastUpdated: 'Just now'
      },
      firstTimeFixRate: 94,
      csatRating: 4.9,
      completedJobsThisMonth: 12,
      assignedToolIds: [],
      ...data
    };
    setTechnicians(prev => [newTech, ...prev]);
    return newTech;
  };

  const updateTechnicianStatus = (techId: string, status: Technician['status']) => {
    setTechnicians(prev =>
      prev.map(t => (t.id === techId ? { ...t, status } : t))
    );
  };

  const createInventoryPart = (data: Partial<InventoryPart>): InventoryPart => {
    const newPart: InventoryPart = {
      id: `part-${Date.now()}`,
      sku: data.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      name: data.name || 'Replacement Component',
      category: data.category || 'Solar & Power',
      unitCost: data.unitCost || 8000,
      sellPrice: data.sellPrice || 12500,
      warehouseStock: data.warehouseStock ?? 10,
      minimumThreshold: data.minimumThreshold ?? 3,
      warrantyPeriodMonths: 12,
      vanStock: {},
      isSerialized: true,
      ...data
    };
    setInventory(prev => [newPart, ...prev]);
    return newPart;
  };

  const resetToMockData = () => {
    setCustomers(MOCK_CUSTOMERS);
    setAssets(MOCK_ASSETS);
    setTechnicians(MOCK_TECHNICIANS);
    setWorkOrders(MOCK_WORK_ORDERS);
    setTickets(MOCK_TICKETS);
    setInventory(MOCK_INVENTORY);
    setCoreReturns(MOCK_CORE_RETURNS);
    setTools(MOCK_TOOLS);
    setContracts(MOCK_CONTRACTS);
    setApprovals(MOCK_APPROVALS);
    setInvoices(MOCK_INVOICES);
    setLeads(MOCK_LEADS);
    setQuotations(MOCK_QUOTATIONS);
    setSubcontractors(MOCK_SUBCONTRACTORS);
    setTemplates(MOCK_TEMPLATES);
    const currentTheme = localStorage.getItem('fielys_theme');
    localStorage.clear();
    if (currentTheme) localStorage.setItem('fielys_theme', currentTheme);
  };

  return (
    <FielysContext.Provider
      value={{
        isAuthenticated,
        userEmail,
        login,
        logout,
        theme,
        setTheme,
        toggleTheme,
        userRole,
        setUserRole,
        activeTab,
        setActiveTab,
        activeTechnicianId,
        setActiveTechnicianId,
        selectedWorkOrderId,
        setSelectedWorkOrderId,
        searchQuery,
        setSearchQuery,
        isOnline,
        toggleOfflineMode,
        offlineQueueCount,
        customers,
        assets,
        technicians,
        workOrders,
        tickets,
        inventory,
        coreReturns,
        tools,
        contracts,
        approvals,
        invoices,
        leads,
        quotations,
        subcontractors,
        templates,
        metrics,
        updateWorkOrderStatus,
        createWorkOrder,
        createTicket,
        convertTicketToWorkOrder,
        createLead,
        updateLeadStatus,
        convertLeadToCustomerAndWorkOrder,
        approveQuotation,
        updateTemplate,
        approveSubcontractorPayout,
        assignTechnicianToWorkOrder,
        updateChecklistItem,
        updateSafetyAssessment,
        addPartToWorkOrder,
        submitApproval,
        reviewApproval,
        logCoreReturn,
        updateCoreReturnStatus,
        transferVanStock,
        generateWorkOrderInvoice,
        processMpesaPayment,
        signOffWorkOrder,
        calibrateTool,
        createTool,
        createAsset,
        createTechnician,
        updateTechnicianStatus,
        createInventoryPart,
        resetToMockData
      }}
    >
      {children}
    </FielysContext.Provider>
  );
};

export const useFielys = () => {
  const context = useContext(FielysContext);
  if (!context) {
    throw new Error('useFielys must be used within a FielysProvider');
  }
  return context;
};
