// Fielys — Field Service Management System Types
// Covering all 30 modules defined in the specification

export type UserRole = 'dispatcher' | 'technician' | 'storekeeper' | 'finance' | 'customer';

export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

export type WorkOrderType = 
  | 'installation' 
  | 'corrective' 
  | 'preventive' 
  | 'site_survey' 
  | 'decommissioning';

export type WorkOrderStatus = 
  | 'draft' 
  | 'unassigned'
  | 'ready_to_schedule' 
  | 'scheduled' 
  | 'dispatched' 
  | 'en_route' 
  | 'on_site' 
  | 'on_hold' 
  | 'completed' 
  | 'verified' 
  | 'invoiced' 
  | 'closed';

export type TechnicianStatus = 'available' | 'en_route' | 'on_site' | 'on_break' | 'off_duty';

export type AssetStatus = 'operational' | 'faulty' | 'under_repair' | 'replaced' | 'decommissioned';

export type CoreReturnStatus = 'in_van' | 'quarantine_bay' | 'rma_supplier' | 'refurbished' | 'scrapped';

export type ToolCondition = 'good' | 'needs_calibration' | 'damaged' | 'lost' | 'retired';

export type ApprovalType = 
  | 'additional_work' 
  | 'quote_discount' 
  | 'field_expense' 
  | 'high_value_part' 
  | 'warranty_exception' 
  | 'subcontractor_payout';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'partially_paid' | 'overdue';

export type PaymentMethod = 'mpesa_stk' | 'card' | 'bank_transfer' | 'cash';

export interface GeoLocation {
  lat: number;
  lng: number;
  address: string;
  zone: string;
}

export interface CustomerSite {
  id: string;
  customerId: string;
  name: string;
  address: string;
  zone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contactName: string;
  contactPhone: string;
  contactRole: string;
  accessGateCode?: string;
  accessInstructions?: string;
  operatingHours: string;
  activeAssetsCount: number;
}

export interface Customer {
  id: string;
  name: string;
  type: 'residential' | 'commercial' | 'corporate' | 'government';
  email: string;
  phone: string;
  headOfficeAddress: string;
  billingTerms: string;
  activeContractId?: string;
  sites: CustomerSite[];
  createdAt: string;
}

export interface InstalledAsset {
  id: string;
  customerId: string;
  siteId: string;
  name: string;
  category: 'Solar & Inverter' | 'HVAC & Chiller' | 'ISP & Fiber Network' | 'CCTV & Access Control' | 'Pumping & Water';
  brand: string;
  model: string;
  serialNumber: string;
  qrCode: string;
  installationDate: string;
  installerTechnicianId?: string;
  installerTechnicianName?: string;
  warrantyEndDate: string;
  status: AssetStatus;
  parentAssetId?: string;
  childComponents?: string[];
  lastServicedDate?: string;
  nextScheduledServiceDate?: string;
  specifications: Record<string, string>;
}

export interface ServiceTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  siteId: string;
  siteName: string;
  assetId?: string;
  assetName?: string;
  category: string;
  title: string;
  description: string;
  priority: PriorityLevel;
  source: 'phone' | 'portal' | 'amc_trigger' | 'whatsapp' | 'email';
  status: 'new' | 'triaged' | 'quoted' | 'converted' | 'cancelled';
  reportedAt: string;
  slaResponseDeadline: string;
  slaResolutionDeadline: string;
  isSlaAtRisk?: boolean;
  isSlaBreached?: boolean;
  assignedWorkOrderId?: string;
  photos?: string[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  type: 'boolean' | 'text' | 'number' | 'select' | 'photo';
  value: boolean | string | number | null;
  required: boolean;
  thresholdMin?: number;
  thresholdMax?: number;
  isPass?: boolean;
  notes?: string;
}

export interface SafetyRiskAssessment {
  ppeChecked: boolean;
  lockoutTagoutDone: boolean;
  ladderSecured: boolean;
  voltageZeroConfirmed: boolean;
  customerNotifiedOfHazards: boolean;
  completedAt?: string;
}

export interface WorkOrderPartUsage {
  id: string;
  partId: string;
  partSku: string;
  partName: string;
  quantity: number;
  unitPrice: number;
  unitCost: number;
  isBillable: boolean;
  isWarranty: boolean;
  installedSerial?: string;
}

export interface WorkOrder {
  id: string;
  orderNumber: string;
  ticketId?: string;
  customerId: string;
  customerName: string;
  siteId: string;
  siteName: string;
  siteAddress: string;
  zone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: WorkOrderType;
  priority: PriorityLevel;
  status: WorkOrderStatus;
  title: string;
  description: string;
  requiredSkills: string[];
  assignedTechnicianId?: string;
  assignedTechnicianName?: string;
  assignedCrewIds?: string[];
  subcontractorId?: string;
  subcontractorName?: string;
  scheduledDate: string;
  scheduledTimeWindow: string; // e.g. "10:00 AM - 12:00 PM"
  estimatedDurationHours: number;
  actualDurationHours?: number;
  
  // Timestamps & GPS verification
  dispatchedAt?: string;
  enRouteAt?: string;
  arrivedAt?: string;
  checkInCoordinates?: { lat: number; lng: number };
  completedAt?: string;
  checkOutCoordinates?: { lat: number; lng: number };
  
  // Compliance & Execution
  safetyAssessment: SafetyRiskAssessment;
  checklist: ChecklistItem[];
  partsUsed: WorkOrderPartUsage[];
  
  // Proof of Service
  beforePhotos: string[];
  afterPhotos: string[];
  technicianNotes?: string;
  rootCauseNotes?: string;
  customerSignature?: string;
  customerSignerName?: string;
  customerRating?: number;
  customerFeedback?: string;
  
  // Financial & Costing
  laborCost: number;
  partsCost: number;
  subcontractorCost: number;
  travelMileageCost: number;
  billableTotal: number;
  
  // Contract / SLA
  contractId?: string;
  isWarrantyWork: boolean;
  isRepeatCall: boolean;
  slaResponseMet?: boolean;
  slaResolutionMet?: boolean;
  pendingApprovalId?: string;
}

export interface Technician {
  id: string;
  name: string;
  employeeId: string;
  phone: string;
  email: string;
  avatar: string;
  skills: string[];
  certifications: { name: string; expiryDate: string }[];
  zone: string;
  vehiclePlate: string;
  vehicleModel: string;
  hourlyCostRate: number;
  hourlyBillingRate: number;
  status: TechnicianStatus;
  currentLocation: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
  currentWorkOrderId?: string;
  firstTimeFixRate: number; // percentage e.g. 92
  csatRating: number; // 1-5 scale
  completedJobsThisMonth: number;
  assignedToolIds: string[];
}

export interface InventoryPart {
  id: string;
  sku: string;
  name: string;
  category: string;
  unitCost: number;
  sellPrice: number;
  warehouseStock: number;
  minimumThreshold: number;
  warrantyPeriodMonths: number;
  vanStock: Record<string, number>; // technicianId -> quantity
  isSerialized: boolean;
}

export interface CoreReturn {
  id: string;
  workOrderId: string;
  orderNumber: string;
  technicianId: string;
  technicianName: string;
  customerId: string;
  customerName: string;
  partName: string;
  serialNumber: string;
  condition: 'repairable' | 'warranty_defect' | 'burned_out' | 'scrap';
  removedDate: string;
  status: CoreReturnStatus;
  rmaNumber?: string;
  quarantineBayLocation?: string;
  disposalNotes?: string;
}

export interface ToolItem {
  id: string;
  toolCode: string;
  name: string;
  serialNumber: string;
  category: 'Testing Meter' | 'Safety Harness' | 'Fusion Splicer' | 'Refrigerant Gauges' | 'Power Tool';
  assignedToTechnicianId?: string;
  assignedTechnicianName?: string;
  condition: ToolCondition;
  calibrationDueDate: string;
  isCalibrationOverdue: boolean;
  lastInspectionDate: string;
  replacementCost: number;
}

export interface ServiceContract {
  id: string;
  contractNumber: string;
  customerId: string;
  customerName: string;
  title: string;
  tier: 'Gold Enterprise' | 'Silver Commercial' | 'Standard Preventive';
  startDate: string;
  endDate: string;
  annualValue: number;
  billingCadence: 'monthly' | 'quarterly' | 'annual';
  includedVisitsPerYear: number;
  visitsCompleted: number;
  includedEmergencyCalls: number;
  emergencyCallsUsed: number;
  coveredSiteIds: string[];
  coveredAssetIds: string[];
  recurrenceRule: 'every_30_days' | 'every_90_days' | 'every_180_days';
  nextScheduledGenerationDate: string;
  status: 'active' | 'expiring_soon' | 'expired';
}

export interface ApprovalRequest {
  id: string;
  type: ApprovalType;
  workOrderId: string;
  orderNumber: string;
  requestedByTechnicianId: string;
  technicianName: string;
  customerName: string;
  siteName: string;
  title: string;
  description: string;
  estimatedCost: number;
  status: ApprovalStatus;
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
  photoUrl?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  workOrderId: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  siteName: string;
  issuedDate: string;
  dueDate: string;
  status: InvoiceStatus;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    isCoveredUnderWarrantyOrAmc: boolean;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  amountPaid: number;
  paymentMethod?: PaymentMethod;
  paymentReference?: string;
  paidAt?: string;
  jobProfitability?: {
    revenue: number;
    laborCost: number;
    partsCost: number;
    travelCost: number;
    subcontractorCost: number;
    netMargin: number;
    marginPercentage: number;
  };
}

export type LeadStatus = 'new' | 'contacted' | 'survey_scheduled' | 'quoted' | 'won' | 'lost';

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  serviceRequested: string;
  siteAddress: string;
  zone: string;
  status: LeadStatus;
  createdAt: string;
  surveyDate?: string;
  assignedSurveyorId?: string;
  assignedSurveyorName?: string;
  estimatedBudgetKSh: number;
  quotationTotalKSh?: number;
  surveyNotes?: string;
  convertedCustomerId?: string;
  convertedWorkOrderId?: string;
}

export interface Subcontractor {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  zone: string;
  specialties: string[];
  rateCardType: 'flat_per_job' | 'hourly';
  rateCardAmount: number;
  complianceInsuranceExpiry: string;
  taxPin: string;
  status: 'active' | 'pending_compliance' | 'suspended';
  firstTimeFixRate: number;
  completedJobsCount: number;
  csatRating: number;
  pendingPayoutKSh: number;
}

export interface ServiceReportTemplate {
  id: string;
  name: string;
  industry: 'Solar & Inverter' | 'HVAC & Refrigeration' | 'ISP & Fiber' | 'Security & Access Control' | 'General Equipment';
  showChecklist: boolean;
  showPricing: boolean;
  showBeforeAfterPhotos: boolean;
  showAssetSerials: boolean;
  showSafetySignoff: boolean;
  customHeaderNote: string;
  termsAndConditions: string;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  leadId?: string;
  customerId?: string;
  customerName: string;
  siteName: string;
  title: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    category: 'labor' | 'parts' | 'equipment' | 'transport';
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'converted';
  validUntil: string;
  notes: string;
}

export interface DashboardMetrics {
  workOrdersToday: number;
  completed: number;
  inProgress: number;
  unassigned: number;
  totalTechnicians: number;
  onSite: number;
  enRoute: number;
  available: number;
  slaBreachRiskCount: number;
  amcVisitsDueThisWeek: number;
  vanStockAlertsCount: number;
  toolsOverdueCount: number;
  faultyCoresPendingReturn: number;
  approvalsPendingCount: number;
  revenueTodayKSh: number;
  avgCustomerRating: number;
}
