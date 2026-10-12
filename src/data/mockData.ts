// Rich domain mock data for Fielys — Field Service Management System
// Domain targets: Solar, HVAC, ISP/Fiber, Security & Access Control, Equipment Servicing
// Regional Context: Nairobi & Kenya service corridors

import { 
  Customer, 
  InstalledAsset, 
  WorkOrder, 
  Technician, 
  InventoryPart, 
  CoreReturn, 
  ToolItem, 
  ServiceContract, 
  ApprovalRequest, 
  Invoice,
  ServiceTicket,
  DashboardMetrics,
  Lead,
  Quotation,
  Subcontractor,
  ServiceReportTemplate
} from '../types';

export const MOCK_SUBCONTRACTORS: Subcontractor[] = [
  {
    id: 'sub-01',
    companyName: 'Equator Solar & Mechanical Engineers Ltd',
    contactPerson: 'Eng. Collins Kipruto',
    phone: '+254 721 990 440',
    email: 'info@equatorsolar.co.ke',
    zone: 'Rift Valley & Western Region',
    specialties: ['High-Voltage Solar Farms', 'Submersible Borehole Pumps', 'Inverter Paralleling'],
    rateCardType: 'flat_per_job',
    rateCardAmount: 28000,
    complianceInsuranceExpiry: '2027-06-30',
    taxPin: 'P051289410Z',
    status: 'active',
    firstTimeFixRate: 91.5,
    completedJobsCount: 24,
    csatRating: 4.8,
    pendingPayoutKSh: 56000
  },
  {
    id: 'sub-02',
    companyName: 'Coastal Optic Fiber Splicing Services',
    contactPerson: 'Khadija Said',
    phone: '+254 733 112 889',
    email: 'ops@coastaloptics.co.ke',
    zone: 'Coast Corridor & Mombasa',
    specialties: ['Underground Conduit Blow Splicing', 'OTDR Loop Back Testing', 'Carrier PoP Builds'],
    rateCardType: 'hourly',
    rateCardAmount: 3500,
    complianceInsuranceExpiry: '2026-11-15',
    taxPin: 'P094410291X',
    status: 'active',
    firstTimeFixRate: 93.0,
    completedJobsCount: 38,
    csatRating: 4.9,
    pendingPayoutKSh: 42000
  }
];

export const MOCK_TEMPLATES: ServiceReportTemplate[] = [
  {
    id: 'tpl-01',
    name: 'Solar PV & Battery Commissioning Certificate',
    industry: 'Solar & Inverter',
    showChecklist: true,
    showPricing: false, // hidden on client warranty reports
    showBeforeAfterPhotos: true,
    showAssetSerials: true,
    showSafetySignoff: true,
    customHeaderNote: 'Certified under EPRA Solar PV Class T3 Regulations.',
    termsAndConditions: 'Workmanship is covered by a 90-day repeat call-out warranty. Battery degradation logs verified.'
  },
  {
    id: 'tpl-02',
    name: 'Commercial HVAC VRV Job Completion Card',
    industry: 'HVAC & Refrigeration',
    showChecklist: true,
    showPricing: true,
    showBeforeAfterPhotos: true,
    showAssetSerials: true,
    showSafetySignoff: true,
    customHeaderNote: 'EPA 608 & Daikin VRV Technical Compliance Report.',
    termsAndConditions: 'Refrigerant pressure test verified under operating load. Condenser coils cleaned.'
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-301',
    companyName: 'Naivasha Fresh Floriculture Ltd',
    contactName: 'James Kariuki',
    phone: '+254 722 888 123',
    email: 'operations@naivashafresh.co.ke',
    serviceRequested: '30kW Commercial Hybrid Solar System with Pump Inverter',
    siteAddress: 'Moi South Lake Rd, Naivasha',
    zone: 'Rift Valley Corridor',
    status: 'survey_scheduled',
    createdAt: '2026-10-02',
    surveyDate: '2026-10-05',
    assignedSurveyorId: 'tech-1',
    assignedSurveyorName: 'Brian Mwangi',
    estimatedBudgetKSh: 1850000,
    quotationTotalKSh: 1920000,
    surveyNotes: 'Rooftop cold room load requires three-phase 400V inverter and 40kWh battery storage.'
  },
  {
    id: 'lead-302',
    companyName: 'Lavington Ridge Gated Community',
    contactName: 'Grace Wangari',
    phone: '+254 733 445 990',
    email: 'committee@lavingtonridge.org',
    serviceRequested: 'IP CCTV PTZ Perimeter & Automatic Number Plate Recognition (ANPR)',
    siteAddress: 'James Gichuru Rd, Lavington',
    zone: 'Westlands & Parklands',
    status: 'quoted',
    createdAt: '2026-09-28',
    surveyDate: '2026-09-30',
    assignedSurveyorId: 'tech-4',
    assignedSurveyorName: 'Dennis Kiprono',
    estimatedBudgetKSh: 750000,
    quotationTotalKSh: 679120,
    surveyNotes: '8x DarkFighter 4K bullet cameras, 2x ANPR barrier cameras, 16-channel NVR with 16TB storage.'
  }
];

export const MOCK_QUOTATIONS: Quotation[] = [
  {
    id: 'quote-801',
    quoteNumber: 'QUO-2026-801',
    leadId: 'lead-302',
    customerName: 'Lavington Ridge Gated Community',
    siteName: 'Main Gate & Perimeter Fence',
    title: 'Perimeter 4K Security Surveillance & ANPR Barrier System',
    items: [
      { description: 'Hikvision 4K DarkFighter IP Cameras (x8)', quantity: 8, unitPrice: 16500, amount: 132000, category: 'equipment' },
      { description: 'Hikvision ANPR Gate Barrier Camera (x2)', quantity: 2, unitPrice: 45000, amount: 90000, category: 'equipment' },
      { description: '16-Channel 4K NVR with 16TB Enterprise Surveillance Storage', quantity: 1, unitPrice: 185000, amount: 185000, category: 'equipment' },
      { description: 'Cat6 Outdoor Shielded Cabling & Trenching (350m)', quantity: 1, unitPrice: 65000, amount: 65000, category: 'parts' },
      { description: 'Installation, Conduit Mounting & PTZ Commissioning Labor', quantity: 1, unitPrice: 120000, amount: 120000, category: 'labor' },
      { description: 'Field Transport & Engineering Site Survey Fee', quantity: 1, unitPrice: 15000, amount: 15000, category: 'transport' }
    ],
    subtotal: 607000,
    tax: 97120,
    discount: 25000,
    total: 679120,
    status: 'pending_approval',
    validUntil: '2026-11-01',
    notes: 'Warranty includes 3 years equipment replacement and 90 days complimentary workmanship maintenance.'
  }
];

export const INITIAL_METRICS: DashboardMetrics = {
  workOrdersToday: 28,
  completed: 18,
  inProgress: 6,
  unassigned: 4,
  totalTechnicians: 20,
  onSite: 15,
  enRoute: 3,
  available: 2,
  slaBreachRiskCount: 2,
  amcVisitsDueThisWeek: 12,
  vanStockAlertsCount: 3,
  toolsOverdueCount: 2,
  faultyCoresPendingReturn: 4,
  approvalsPendingCount: 3,
  revenueTodayKSh: 420000,
  avgCustomerRating: 4.8
};

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'cust-101',
    name: 'Apex Commercial Hub',
    type: 'commercial',
    email: 'facilities@apexcenter.co.ke',
    phone: '+254 722 100 200',
    headOfficeAddress: 'Waiyaki Way, Westlands, Nairobi',
    billingTerms: 'Net 30 Days',
    createdAt: '2025-01-15',
    activeContractId: 'amc-901',
    sites: [
      {
        id: 'site-101-a',
        customerId: 'cust-101',
        name: 'Apex Westlands Tower',
        address: 'Plot 44 Waiyaki Way, Westlands',
        zone: 'Westlands & Parklands',
        coordinates: { lat: -1.2685, lng: 36.8042 },
        contactName: 'Eng. Kennedy Omondi',
        contactPhone: '+254 722 345 678',
        contactRole: 'Facilities Director',
        accessGateCode: 'GATE-B-4491',
        accessInstructions: 'Security check at Gate 2. Service lift access card issued at basement concierge.',
        operatingHours: '06:00 - 20:00 EAT',
        activeAssetsCount: 8
      },
      {
        id: 'site-101-b',
        customerId: 'cust-101',
        name: 'Apex Kilimani Logistics Center',
        address: 'Argwings Kodhek Rd, Kilimani',
        zone: 'Kilimani & Ngong Rd',
        coordinates: { lat: -1.2921, lng: 36.7865 },
        contactName: 'Alice Mutua',
        contactPhone: '+254 733 998 112',
        contactRole: 'Warehouse Manager',
        accessGateCode: 'APX-KIL-88',
        accessInstructions: 'Loading dock 3. High-vis vest and steel-toe boots mandatory on site.',
        operatingHours: '24/7 Secure Access',
        activeAssetsCount: 5
      }
    ]
  },
  {
    id: 'cust-102',
    name: 'Serena Grand Hotel & Conference',
    type: 'corporate',
    email: 'engineering@serenagrand.com',
    phone: '+254 720 550 440',
    headOfficeAddress: 'Procession Way, Nairobi Central',
    billingTerms: 'Net 15 Days',
    createdAt: '2024-11-20',
    activeContractId: 'amc-902',
    sites: [
      {
        id: 'site-102-a',
        customerId: 'cust-102',
        name: 'Serena Main Complex',
        address: 'Kenyatta Avenue, Nairobi Central',
        zone: 'Nairobi Central & Upper Hill',
        coordinates: { lat: -1.2874, lng: 36.8172 },
        contactName: 'Chef Engineer Samuel Kibet',
        contactPhone: '+254 721 884 219',
        contactRole: 'Chief Plant Engineer',
        accessGateCode: 'SRN-PLANT-09',
        accessInstructions: 'Rooftop chiller plant requires escort from engineering control room.',
        operatingHours: '24/7 Operations',
        activeAssetsCount: 14
      }
    ]
  },
  {
    id: 'cust-103',
    name: 'Mara River Eco-Lodge Group',
    type: 'commercial',
    email: 'ops@marariver.co.ke',
    phone: '+254 711 445 566',
    headOfficeAddress: 'Karen Road, Nairobi',
    billingTerms: 'Immediate / M-Pesa STK',
    createdAt: '2025-03-01',
    sites: [
      {
        id: 'site-103-a',
        customerId: 'cust-103',
        name: 'Karen Executive Headquarters',
        address: 'Karen Roundabout, Marula Lane',
        zone: 'Karen & Langata',
        coordinates: { lat: -1.3218, lng: 36.7124 },
        contactName: 'Beatrice Ndinda',
        contactPhone: '+254 710 223 344',
        contactRole: 'Operations Lead',
        operatingHours: '08:00 - 18:00 EAT',
        activeAssetsCount: 4
      }
    ]
  },
  {
    id: 'cust-104',
    name: 'Safaricom Enterprise Towers Client Base',
    type: 'corporate',
    email: 'noc@safaricom-enterprise.co.ke',
    phone: '+254 722 000 111',
    headOfficeAddress: 'Mombasa Road, Industrial Area',
    billingTerms: 'Net 45 Days',
    createdAt: '2024-08-10',
    sites: [
      {
        id: 'site-104-a',
        customerId: 'cust-104',
        name: 'Mombasa Road Telecom PoP Site',
        address: 'Enterprise Road, Industrial Area',
        zone: 'Industrial Area & Mombasa Rd',
        coordinates: { lat: -1.3145, lng: 36.8521 },
        contactName: 'Peter Wanyama',
        contactPhone: '+254 722 990 011',
        contactRole: 'NOC Duty Supervisor',
        accessGateCode: 'POP-SEC-770',
        accessInstructions: 'Biometric pass or pre-cleared national ID required at reception.',
        operatingHours: '24/7 Secured Telecommunications Facility',
        activeAssetsCount: 9
      }
    ]
  }
];

export const MOCK_ASSETS: InstalledAsset[] = [
  {
    id: 'asset-501',
    customerId: 'cust-101',
    siteId: 'site-101-a',
    name: 'Victron Quattro 15kVA Solar Inverter',
    category: 'Solar & Inverter',
    brand: 'Victron Energy',
    model: 'Quattro 48/15000/200-100/100',
    serialNumber: 'VIC-4815-9921-KE',
    qrCode: 'QR-VIC-501',
    installationDate: '2024-04-12',
    installerTechnicianId: 'tech-1',
    installerTechnicianName: 'Brian Mwangi',
    warrantyEndDate: '2027-04-12',
    status: 'operational',
    lastServicedDate: '2026-08-10',
    nextScheduledServiceDate: '2026-11-10',
    specifications: {
      'Input Voltage': '48V DC / 230V AC',
      'Continuous Power': '15,000 VA',
      'Peak Surge': '25,000 W',
      'Battery Chemistry': 'Lithium LiFePO4'
    }
  },
  {
    id: 'asset-502',
    customerId: 'cust-101',
    siteId: 'site-101-a',
    name: 'Pylontech US5000 Lithium Battery Bank (x4)',
    category: 'Solar & Inverter',
    brand: 'Pylontech',
    model: 'US5000 48V 100Ah',
    serialNumber: 'PYL-US5K-8812-BNK',
    qrCode: 'QR-PYL-502',
    installationDate: '2024-04-12',
    installerTechnicianId: 'tech-1',
    installerTechnicianName: 'Brian Mwangi',
    warrantyEndDate: '2031-04-12',
    status: 'operational',
    parentAssetId: 'asset-501',
    specifications: {
      'Total Capacity': '19.2 kWh',
      'Nominal Voltage': '48V',
      'Depth of Discharge': '95%'
    }
  },
  {
    id: 'asset-503',
    customerId: 'cust-102',
    siteId: 'site-102-a',
    name: 'Daikin VRV IV-X Rooftop Chiller Unit',
    category: 'HVAC & Chiller',
    brand: 'Daikin',
    model: 'RXYQ18TYDN VRV IV-X Heat Pump',
    serialNumber: 'DKN-VRV-2024-098',
    qrCode: 'QR-DKN-503',
    installationDate: '2023-09-18',
    warrantyEndDate: '2026-09-18',
    status: 'faulty',
    lastServicedDate: '2026-07-22',
    specifications: {
      'Refrigerant': 'R-410A',
      'Cooling Capacity': '50.4 kW (18 HP)',
      'Compressor Type': 'Hermetically Sealed Scroll'
    }
  },
  {
    id: 'asset-504',
    customerId: 'cust-104',
    siteId: 'site-104-a',
    name: 'Huawei OptiXstar Carrier Fiber OLT / Switch',
    category: 'ISP & Fiber Network',
    brand: 'Huawei',
    model: 'SmartAX EA5800-X7 OLT',
    serialNumber: 'HW-OLT-7721-MOM',
    qrCode: 'QR-HW-504',
    installationDate: '2024-01-20',
    warrantyEndDate: '2027-01-20',
    status: 'operational',
    specifications: {
      'Uplink': '4x 10GE',
      'Capacity': '7 Service Slots',
      'Redundant Power': 'Dual -48V DC'
    }
  }
];

export const MOCK_TECHNICIANS: Technician[] = [
  {
    id: 'tech-1',
    name: 'Brian Mwangi',
    employeeId: 'TECH-001',
    phone: '+254 722 411 990',
    email: 'brian.mwangi@fielys.versaly.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    skills: ['High-Voltage Solar (EPRA Class T3)', 'Victron System Architect', 'Inverter Diagnostics', 'Battery Balancing'],
    certifications: [
      { name: 'EPRA Solar PV Technician Class T3', expiryDate: '2027-12-31' },
      { name: 'Victron Certified Professional', expiryDate: '2028-06-30' },
      { name: 'OSHA Working at Heights', expiryDate: '2027-04-15' }
    ],
    zone: 'Westlands & Parklands',
    vehiclePlate: 'KDF 289T',
    vehicleModel: 'Toyota Hilux Service Van',
    hourlyCostRate: 1800,
    hourlyBillingRate: 4500,
    status: 'on_site',
    currentLocation: {
      lat: -1.2685,
      lng: 36.8042,
      lastUpdated: '2 mins ago'
    },
    currentWorkOrderId: 'wo-2026-088',
    firstTimeFixRate: 94.2,
    csatRating: 4.9,
    completedJobsThisMonth: 42,
    assignedToolIds: ['tool-01', 'tool-03', 'tool-06']
  },
  {
    id: 'tech-2',
    name: 'David Ochieng',
    employeeId: 'TECH-002',
    phone: '+254 733 552 119',
    email: 'david.ochieng@fielys.versaly.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    skills: ['Fiber Fusion Splicing', 'OTDR Line Testing', 'Carrier IP Networking', 'Router Configuration'],
    certifications: [
      { name: 'FOA Certified Fiber Optics Technician', expiryDate: '2027-08-30' },
      { name: 'CCNA Routing & Switching', expiryDate: '2026-12-15' }
    ],
    zone: 'Industrial Area & Mombasa Rd',
    vehiclePlate: 'KCR 884X',
    vehicleModel: 'Nissan NV200 Fleet Van',
    hourlyCostRate: 1650,
    hourlyBillingRate: 4200,
    status: 'en_route',
    currentLocation: {
      lat: -1.3090,
      lng: 36.8480,
      lastUpdated: '1 min ago'
    },
    currentWorkOrderId: 'wo-2026-089',
    firstTimeFixRate: 91.5,
    csatRating: 4.8,
    completedJobsThisMonth: 38,
    assignedToolIds: ['tool-02', 'tool-07']
  },
  {
    id: 'tech-3',
    name: 'Grace Muthoni',
    employeeId: 'TECH-003',
    phone: '+254 711 980 432',
    email: 'grace.muthoni@fielys.versaly.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    skills: ['Commercial HVAC VRV/VRF', 'Refrigerant Recovery', 'Compressor Overhaul', 'Chilled Water Piping'],
    certifications: [
      { name: 'Daikin VRV Specialist Level 4', expiryDate: '2027-10-15' },
      { name: 'EPA Section 608 Universal', expiryDate: '2028-01-20' }
    ],
    zone: 'Nairobi Central & Upper Hill',
    vehiclePlate: 'KCY 490A',
    vehicleModel: 'Isuzu D-Max Field Support',
    hourlyCostRate: 1950,
    hourlyBillingRate: 4800,
    status: 'on_site',
    currentLocation: {
      lat: -1.2874,
      lng: 36.8172,
      lastUpdated: '4 mins ago'
    },
    currentWorkOrderId: 'wo-2026-085',
    firstTimeFixRate: 88.0,
    csatRating: 4.7,
    completedJobsThisMonth: 31,
    assignedToolIds: ['tool-04', 'tool-08']
  },
  {
    id: 'tech-4',
    name: 'Dennis Kiprono',
    employeeId: 'TECH-004',
    phone: '+254 720 334 887',
    email: 'dennis.kiprono@fielys.versaly.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    skills: ['Hikvision Certified Security', 'Biometric Access Control', 'IP CCTV PTZ Calibration', 'Perimeter Alarm'],
    certifications: [
      { name: 'Hikvision HCSA-Security', expiryDate: '2027-05-10' }
    ],
    zone: 'Kilimani & Ngong Rd',
    vehiclePlate: 'KDL 102M',
    vehicleModel: 'Toyota Probox Field Cruiser',
    hourlyCostRate: 1500,
    hourlyBillingRate: 3800,
    status: 'available',
    currentLocation: {
      lat: -1.2950,
      lng: 36.7900,
      lastUpdated: '10 mins ago'
    },
    firstTimeFixRate: 95.0,
    csatRating: 4.9,
    completedJobsThisMonth: 45,
    assignedToolIds: ['tool-05']
  }
];

export const MOCK_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'wo-2026-088',
    orderNumber: 'WO-2026-088',
    ticketId: 'tkt-1088',
    customerId: 'cust-101',
    customerName: 'Apex Commercial Hub',
    siteId: 'site-101-a',
    siteName: 'Apex Westlands Tower',
    siteAddress: 'Plot 44 Waiyaki Way, Westlands',
    zone: 'Westlands & Parklands',
    coordinates: { lat: -1.2685, lng: 36.8042 },
    type: 'corrective',
    priority: 'critical',
    status: 'on_site',
    title: 'Solar Inverter Phase 2 Overvoltage Tripping',
    description: 'Quattro 15kVA system shutting down intermittently on grid high-voltage surge. Client running on diesel generator during midday peak.',
    requiredSkills: ['High-Voltage Solar (EPRA Class T3)', 'Victron System Architect'],
    assignedTechnicianId: 'tech-1',
    assignedTechnicianName: 'Brian Mwangi',
    scheduledDate: '2026-10-04',
    scheduledTimeWindow: '09:30 AM - 12:30 PM',
    estimatedDurationHours: 3.0,
    actualDurationHours: 1.8,
    dispatchedAt: '2026-10-04T08:45:00',
    enRouteAt: '2026-10-04T09:05:00',
    arrivedAt: '2026-10-04T09:28:00',
    checkInCoordinates: { lat: -1.26848, lng: 36.80419 },
    safetyAssessment: {
      ppeChecked: true,
      lockoutTagoutDone: true,
      ladderSecured: true,
      voltageZeroConfirmed: true,
      customerNotifiedOfHazards: true,
      completedAt: '2026-10-04T09:34:00'
    },
    checklist: [
      { id: 'chk-1', label: 'Verify AC Input Grid Voltage (L1-N, L2-N, L3-N)', type: 'number', value: 248.5, required: true, thresholdMin: 215, thresholdMax: 250, isPass: true },
      { id: 'chk-2', label: 'Test DC Busbar Insulation Resistance (MΩ)', type: 'number', value: 52.0, required: true, thresholdMin: 20, isPass: true },
      { id: 'chk-3', label: 'Check Victron Inverter Firmware & Assistant Configuration', type: 'boolean', value: true, required: true, isPass: true },
      { id: 'chk-4', label: 'Inspect Surge Protection Device (SPD) Cartridges', type: 'boolean', value: false, required: true, isPass: false, notes: 'SPD Type II Cartridge L2 blown due to lightning transient. Replacement needed.' },
      { id: 'chk-5', label: 'Battery Bank Cell Balancing Delta (mV)', type: 'number', value: 12, required: true, thresholdMin: 0, thresholdMax: 30, isPass: true }
    ],
    partsUsed: [
      {
        id: 'pu-1',
        partId: 'part-01',
        partSku: 'SPD-DEHN-T2-40K',
        partName: 'Dehn Type 2 Surge Protection Cartridge 40kA',
        quantity: 1,
        unitPrice: 8500,
        unitCost: 4800,
        isBillable: true,
        isWarranty: false,
        installedSerial: 'DHN-2026-9018'
      }
    ],
    beforePhotos: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80'
    ],
    afterPhotos: [],
    technicianNotes: 'Confirmed overvoltage trip trigger caused by flashover in SPD cartridge L2. Isolated AC feed, replaced cartridge with Dehn 40kA from van stock. Grid feed stable at 242V.',
    rootCauseNotes: 'External grid surge damaged secondary SPD suppressor cartridge.',
    laborCost: 13500,
    partsCost: 4800,
    subcontractorCost: 0,
    travelMileageCost: 1200,
    billableTotal: 26500,
    contractId: 'amc-901',
    isWarrantyWork: false,
    isRepeatCall: false,
    slaResponseMet: true,
    slaResolutionMet: true,
    pendingApprovalId: 'appr-01'
  },
  {
    id: 'wo-2026-085',
    orderNumber: 'WO-2026-085',
    ticketId: 'tkt-1081',
    customerId: 'cust-102',
    customerName: 'Serena Grand Hotel & Conference',
    siteId: 'site-102-a',
    siteName: 'Serena Main Complex',
    siteAddress: 'Kenyatta Avenue, Nairobi Central',
    zone: 'Nairobi Central & Upper Hill',
    coordinates: { lat: -1.2874, lng: 36.8172 },
    type: 'corrective',
    priority: 'high',
    status: 'on_site',
    title: 'Chiller Unit #2 High Head Pressure Alarm (E3 Error)',
    description: 'Daikin VRV system showing E3 safety shutoff. Conference hall ballroom A air conditioning down before evening delegate summit.',
    requiredSkills: ['Commercial HVAC VRV/VRF', 'Refrigerant Recovery'],
    assignedTechnicianId: 'tech-3',
    assignedTechnicianName: 'Grace Muthoni',
    scheduledDate: '2026-10-04',
    scheduledTimeWindow: '08:30 AM - 11:30 AM',
    estimatedDurationHours: 3.0,
    actualDurationHours: 2.2,
    dispatchedAt: '2026-10-04T08:00:00',
    enRouteAt: '2026-10-04T08:15:00',
    arrivedAt: '2026-10-04T08:40:00',
    safetyAssessment: {
      ppeChecked: true,
      lockoutTagoutDone: true,
      ladderSecured: true,
      voltageZeroConfirmed: true,
      customerNotifiedOfHazards: true,
      completedAt: '2026-10-04T08:45:00'
    },
    checklist: [
      { id: 'chk-11', label: 'Condenser Coil Airflow Obstruction Inspection', type: 'boolean', value: false, required: true, isPass: false, notes: 'Heavy dust buildup on coil fins restricting heat exchange.' },
      { id: 'chk-12', label: 'Operating Discharge Pressure (psi)', type: 'number', value: 410, required: true, thresholdMin: 280, thresholdMax: 380, isPass: false },
      { id: 'chk-13', label: 'Suction Line Temperature (°C)', type: 'number', value: 11.2, required: true, thresholdMin: 6, thresholdMax: 14, isPass: true }
    ],
    partsUsed: [],
    beforePhotos: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80'
    ],
    afterPhotos: [],
    laborCost: 14400,
    partsCost: 0,
    subcontractorCost: 0,
    travelMileageCost: 950,
    billableTotal: 18500,
    contractId: 'amc-902',
    isWarrantyWork: false,
    isRepeatCall: false,
    slaResponseMet: true,
    slaResolutionMet: true
  },
  {
    id: 'wo-2026-089',
    orderNumber: 'WO-2026-089',
    ticketId: 'tkt-1089',
    customerId: 'cust-104',
    customerName: 'Safaricom Enterprise Towers Client Base',
    siteId: 'site-104-a',
    siteName: 'Mombasa Road Telecom PoP Site',
    siteAddress: 'Enterprise Road, Industrial Area',
    zone: 'Industrial Area & Mombasa Rd',
    coordinates: { lat: -1.3145, lng: 36.8521 },
    type: 'corrective',
    priority: 'critical',
    status: 'en_route',
    title: 'Core Fiber Uplink Optical Loss > 6.5dB Degradation',
    description: 'Main PoP distribution strand 4 experiencing severe packet drop. Splice tray inspection and OTDR trace required.',
    requiredSkills: ['Fiber Fusion Splicing', 'OTDR Line Testing'],
    assignedTechnicianId: 'tech-2',
    assignedTechnicianName: 'David Ochieng',
    scheduledDate: '2026-10-04',
    scheduledTimeWindow: '10:30 AM - 01:00 PM',
    estimatedDurationHours: 2.5,
    dispatchedAt: '2026-10-04T09:40:00',
    enRouteAt: '2026-10-04T09:55:00',
    safetyAssessment: {
      ppeChecked: false,
      lockoutTagoutDone: false,
      ladderSecured: false,
      voltageZeroConfirmed: false,
      customerNotifiedOfHazards: false
    },
    checklist: [],
    partsUsed: [],
    beforePhotos: [],
    afterPhotos: [],
    laborCost: 10500,
    partsCost: 0,
    subcontractorCost: 0,
    travelMileageCost: 1400,
    billableTotal: 22000,
    isWarrantyWork: false,
    isRepeatCall: false
  },
  {
    id: 'wo-2026-080',
    orderNumber: 'WO-2026-080',
    customerId: 'cust-103',
    customerName: 'Mara River Eco-Lodge Group',
    siteId: 'site-103-a',
    siteName: 'Karen Executive Headquarters',
    siteAddress: 'Karen Roundabout, Marula Lane',
    zone: 'Karen & Langata',
    coordinates: { lat: -1.3218, lng: 36.7124 },
    type: 'installation',
    priority: 'medium',
    status: 'unassigned',
    title: 'Backup Solar Inverter & Battery Commissioning',
    description: 'Client received 8kW Growatt Hybrid Inverter + 10kWh Battery storage. Requires mounting, DC string cabling, and ATS grid tie-in.',
    requiredSkills: ['High-Voltage Solar (EPRA Class T3)'],
    scheduledDate: '2026-10-04',
    scheduledTimeWindow: '02:00 PM - 05:30 PM',
    estimatedDurationHours: 3.5,
    safetyAssessment: {
      ppeChecked: false,
      lockoutTagoutDone: false,
      ladderSecured: false,
      voltageZeroConfirmed: false,
      customerNotifiedOfHazards: false
    },
    checklist: [],
    partsUsed: [],
    beforePhotos: [],
    afterPhotos: [],
    laborCost: 15750,
    partsCost: 35000,
    subcontractorCost: 0,
    travelMileageCost: 1800,
    billableTotal: 68500,
    isWarrantyWork: false,
    isRepeatCall: false
  },
  {
    id: 'wo-2026-077',
    orderNumber: 'WO-2026-077',
    customerId: 'cust-101',
    customerName: 'Apex Commercial Hub',
    siteId: 'site-101-b',
    siteName: 'Apex Kilimani Logistics Center',
    siteAddress: 'Argwings Kodhek Rd, Kilimani',
    zone: 'Kilimani & Ngong Rd',
    coordinates: { lat: -1.2921, lng: 36.7865 },
    type: 'preventive',
    priority: 'low',
    status: 'completed',
    title: 'Quarterly Solar Microgrid & Panel Washing Service',
    description: 'Q3 preventive inspection. Clean 48 monocrystalline panels, torque check terminal lugs, log battery internal resistance.',
    requiredSkills: ['High-Voltage Solar (EPRA Class T3)'],
    assignedTechnicianId: 'tech-1',
    assignedTechnicianName: 'Brian Mwangi',
    scheduledDate: '2026-10-04',
    scheduledTimeWindow: '07:00 AM - 09:15 AM',
    estimatedDurationHours: 2.25,
    actualDurationHours: 2.1,
    dispatchedAt: '2026-10-04T06:40:00',
    enRouteAt: '2026-10-04T06:50:00',
    arrivedAt: '2026-10-04T07:05:00',
    completedAt: '2026-10-04T09:12:00',
    safetyAssessment: {
      ppeChecked: true,
      lockoutTagoutDone: true,
      ladderSecured: true,
      voltageZeroConfirmed: true,
      customerNotifiedOfHazards: true,
      completedAt: '2026-10-04T07:10:00'
    },
    checklist: [
      { id: 'chk-21', label: 'Array String 1 Open Circuit Voltage (Voc)', type: 'number', value: 432, required: true, isPass: true },
      { id: 'chk-22', label: 'Array String 2 Open Circuit Voltage (Voc)', type: 'number', value: 430, required: true, isPass: true },
      { id: 'chk-23', label: 'DC Isolator Switch Contact Wear', type: 'boolean', value: true, required: true, isPass: true },
      { id: 'chk-24', label: 'Panel Soiling Factor Removed', type: 'boolean', value: true, required: true, isPass: true }
    ],
    partsUsed: [],
    beforePhotos: [
      'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=600&q=80'
    ],
    afterPhotos: [
      'https://images.unsplash.com/photo-1545209179-a5d3cb0ec759?auto=format&fit=crop&w=600&q=80'
    ],
    technicianNotes: 'Completed full array clean with de-ionized water. Generated power output increased by 14.8% post-wash.',
    customerSignerName: 'Alice Mutua',
    customerRating: 5,
    customerFeedback: 'Outstanding work by Brian as always. Arrived exactly on time.',
    laborCost: 9450,
    partsCost: 0,
    subcontractorCost: 0,
    travelMileageCost: 800,
    billableTotal: 18500,
    contractId: 'amc-901',
    isWarrantyWork: false,
    isRepeatCall: false,
    slaResponseMet: true,
    slaResolutionMet: true
  }
];

export const MOCK_TICKETS: ServiceTicket[] = [
  {
    id: 'tkt-1088',
    ticketNumber: 'TKT-1088',
    customerId: 'cust-101',
    customerName: 'Apex Commercial Hub',
    siteId: 'site-101-a',
    siteName: 'Apex Westlands Tower',
    assetId: 'asset-501',
    assetName: 'Victron Quattro 15kVA Solar Inverter',
    category: 'Solar & Power',
    title: 'Solar Inverter Phase 2 Overvoltage Tripping',
    description: 'Quattro 15kVA system shutting down intermittently on grid high-voltage surge.',
    priority: 'critical',
    source: 'portal',
    status: 'converted',
    reportedAt: '2026-10-04T08:15:00',
    slaResponseDeadline: '2026-10-04T08:45:00', // 30 min SLA
    slaResolutionDeadline: '2026-10-04T14:15:00', // 6 hour SLA
    isSlaAtRisk: false,
    assignedWorkOrderId: 'wo-2026-088'
  },
  {
    id: 'tkt-1090',
    ticketNumber: 'TKT-1090',
    customerId: 'cust-102',
    customerName: 'Serena Grand Hotel & Conference',
    siteId: 'site-102-a',
    siteName: 'Serena Main Complex',
    assetId: 'asset-503',
    assetName: 'Daikin VRV IV-X Rooftop Chiller Unit',
    category: 'HVAC',
    title: 'Ballroom Chiller Low Suction Temp Warning',
    description: 'Chiller refrigerant sensor reading 2.1C, potential evaporator icing risk.',
    priority: 'high',
    source: 'phone',
    status: 'new',
    reportedAt: '2026-10-04T09:50:00',
    slaResponseDeadline: '2026-10-04T10:50:00',
    slaResolutionDeadline: '2026-10-04T17:50:00',
    isSlaAtRisk: true
  },
  {
    id: 'tkt-1091',
    ticketNumber: 'TKT-1091',
    customerId: 'cust-104',
    customerName: 'Safaricom Enterprise Towers Client Base',
    siteId: 'site-104-a',
    siteName: 'Mombasa Road Telecom PoP Site',
    category: 'ISP & Fiber',
    title: 'Redundant Power Supply Failure on Core Router #2',
    description: 'PSU-B alarm active. Running on single feed. Needs urgent replacement before night maintenance window.',
    priority: 'critical',
    source: 'amc_trigger',
    status: 'triaged',
    reportedAt: '2026-10-04T09:10:00',
    slaResponseDeadline: '2026-10-04T09:40:00',
    slaResolutionDeadline: '2026-10-04T13:10:00',
    isSlaAtRisk: true
  }
];

export const MOCK_INVENTORY: InventoryPart[] = [
  {
    id: 'part-01',
    sku: 'SPD-DEHN-T2-40K',
    name: 'Dehn Type 2 Surge Protection Cartridge 40kA',
    category: 'Electrical & Solar',
    unitCost: 4800,
    sellPrice: 8500,
    warehouseStock: 24,
    minimumThreshold: 10,
    warrantyPeriodMonths: 24,
    isSerialized: true,
    vanStock: {
      'tech-1': 3,
      'tech-2': 1,
      'tech-3': 0,
      'tech-4': 2
    }
  },
  {
    id: 'part-02',
    sku: 'REF-R410A-11KG',
    name: 'R-410A Eco Refrigerant Gas Cylinder (11.3 kg)',
    category: 'HVAC',
    unitCost: 11000,
    sellPrice: 18500,
    warehouseStock: 8,
    minimumThreshold: 5,
    warrantyPeriodMonths: 0,
    isSerialized: false,
    vanStock: {
      'tech-1': 0,
      'tech-2': 0,
      'tech-3': 1,
      'tech-4': 0
    }
  },
  {
    id: 'part-03',
    sku: 'FIB-SPL-TRAY-24',
    name: 'Carrier 24-Fiber Splice Tray with Fusion Sleeves',
    category: 'Fiber & ISP',
    unitCost: 1200,
    sellPrice: 2800,
    warehouseStock: 45,
    minimumThreshold: 15,
    warrantyPeriodMonths: 12,
    isSerialized: false,
    vanStock: {
      'tech-1': 2,
      'tech-2': 8,
      'tech-3': 0,
      'tech-4': 4
    }
  },
  {
    id: 'part-04',
    sku: 'VIC-MK3-USB-INT',
    name: 'Victron MK3-USB Inverter Interface Adapter',
    category: 'Solar & Inverter',
    unitCost: 6500,
    sellPrice: 11000,
    warehouseStock: 2, // low stock alert!
    minimumThreshold: 4,
    warrantyPeriodMonths: 60,
    isSerialized: true,
    vanStock: {
      'tech-1': 1,
      'tech-2': 0,
      'tech-3': 0,
      'tech-4': 0
    }
  },
  {
    id: 'part-05',
    sku: 'CAM-HIK-4K-DOME',
    name: 'Hikvision 4K IP DarkFighter Dome Camera',
    category: 'CCTV & Security',
    unitCost: 9500,
    sellPrice: 16500,
    warehouseStock: 3, // low stock alert!
    minimumThreshold: 6,
    warrantyPeriodMonths: 36,
    isSerialized: true,
    vanStock: {
      'tech-1': 0,
      'tech-2': 0,
      'tech-3': 0,
      'tech-4': 2
    }
  }
];

export const MOCK_CORE_RETURNS: CoreReturn[] = [
  {
    id: 'core-01',
    workOrderId: 'wo-2026-088',
    orderNumber: 'WO-2026-088',
    technicianId: 'tech-1',
    technicianName: 'Brian Mwangi',
    customerId: 'cust-101',
    customerName: 'Apex Commercial Hub',
    partName: 'Dehn SPD Cartridge (Burnt Lightning Discharge)',
    serialNumber: 'DHN-2023-4410-X',
    condition: 'burned_out',
    removedDate: '2026-10-04',
    status: 'in_van',
    disposalNotes: 'Lightning surge protection sacrifice. Send to warehouse scrap bay.'
  },
  {
    id: 'core-02',
    workOrderId: 'wo-2026-083',
    orderNumber: 'WO-2026-083',
    technicianId: 'tech-3',
    technicianName: 'Grace Muthoni',
    customerId: 'cust-102',
    customerName: 'Serena Grand Hotel',
    partName: 'Daikin Scroll Compressor Core 5HP',
    serialNumber: 'DKN-CMP-9901-SER',
    condition: 'repairable',
    removedDate: '2026-10-03',
    status: 'quarantine_bay',
    quarantineBayLocation: 'Bay B-04 Quarantine',
    rmaNumber: 'RMA-DKN-2026-118'
  },
  {
    id: 'core-03',
    workOrderId: 'wo-2026-079',
    orderNumber: 'WO-2026-079',
    technicianId: 'tech-2',
    technicianName: 'David Ochieng',
    customerId: 'cust-104',
    customerName: 'Safaricom Enterprise',
    partName: 'Huawei Optical Line Terminal Card (PON board)',
    serialNumber: 'HW-PON-8831',
    condition: 'warranty_defect',
    removedDate: '2026-10-02',
    status: 'rma_supplier',
    rmaNumber: 'RMA-HW-99420'
  },
  {
    id: 'core-04',
    workOrderId: 'wo-2026-075',
    orderNumber: 'WO-2026-075',
    technicianId: 'tech-4',
    technicianName: 'Dennis Kiprono',
    customerId: 'cust-101',
    customerName: 'Apex Commercial Hub',
    partName: 'Hikvision 16-Channel NVR Power Board',
    serialNumber: 'HIK-PWR-2201',
    condition: 'repairable',
    removedDate: '2026-10-02',
    status: 'in_van'
  }
];

export const MOCK_TOOLS: ToolItem[] = [
  {
    id: 'tool-01',
    toolCode: 'TOOL-FLUKE-179',
    name: 'Fluke 179 True-RMS Industrial Multimeter',
    serialNumber: 'FLK-179-88312',
    category: 'Testing Meter',
    assignedToTechnicianId: 'tech-1',
    assignedTechnicianName: 'Brian Mwangi',
    condition: 'good',
    calibrationDueDate: '2026-12-15',
    isCalibrationOverdue: false,
    lastInspectionDate: '2026-06-15',
    replacementCost: 75000
  },
  {
    id: 'tool-02',
    toolCode: 'TOOL-FUJ-90S',
    name: 'Fujikura 90S+ Core Alignment Fusion Splicer',
    serialNumber: 'FJK-90S-5510',
    category: 'Fusion Splicer',
    assignedToTechnicianId: 'tech-2',
    assignedTechnicianName: 'David Ochieng',
    condition: 'good',
    calibrationDueDate: '2026-09-28', // OVERDUE
    isCalibrationOverdue: true,
    lastInspectionDate: '2026-03-28',
    replacementCost: 850000
  },
  {
    id: 'tool-04',
    toolCode: 'TOOL-TST-550S',
    name: 'Testo 550s Digital HVAC Manifold & Micron Gauge',
    serialNumber: 'TST-550-9941',
    category: 'Refrigerant Gauges',
    assignedToTechnicianId: 'tech-3',
    assignedTechnicianName: 'Grace Muthoni',
    condition: 'needs_calibration',
    calibrationDueDate: '2026-09-30', // OVERDUE
    isCalibrationOverdue: true,
    lastInspectionDate: '2026-03-30',
    replacementCost: 125000
  }
];

export const MOCK_CONTRACTS: ServiceContract[] = [
  {
    id: 'amc-901',
    contractNumber: 'AMC-2025-APEX-01',
    customerId: 'cust-101',
    customerName: 'Apex Commercial Hub',
    title: 'Solar & Critical Microgrid Comprehensive AMC',
    tier: 'Gold Enterprise',
    startDate: '2025-01-01',
    endDate: '2027-01-01',
    annualValue: 840000,
    billingCadence: 'quarterly',
    includedVisitsPerYear: 12,
    visitsCompleted: 8,
    includedEmergencyCalls: 6,
    emergencyCallsUsed: 2,
    coveredSiteIds: ['site-101-a', 'site-101-b'],
    coveredAssetIds: ['asset-501', 'asset-502'],
    recurrenceRule: 'every_30_days',
    nextScheduledGenerationDate: '2026-10-15',
    status: 'active'
  },
  {
    id: 'amc-902',
    contractNumber: 'AMC-2024-SRN-02',
    customerId: 'cust-102',
    customerName: 'Serena Grand Hotel & Conference',
    title: 'Central HVAC & VRV Maintenance Agreement',
    tier: 'Gold Enterprise',
    startDate: '2024-11-01',
    endDate: '2026-11-01',
    annualValue: 1250000,
    billingCadence: 'monthly',
    includedVisitsPerYear: 24,
    visitsCompleted: 21,
    includedEmergencyCalls: 10,
    emergencyCallsUsed: 4,
    coveredSiteIds: ['site-102-a'],
    coveredAssetIds: ['asset-503'],
    recurrenceRule: 'every_30_days',
    nextScheduledGenerationDate: '2026-10-10',
    status: 'expiring_soon'
  }
];

export const MOCK_APPROVALS: ApprovalRequest[] = [
  {
    id: 'appr-01',
    type: 'additional_work',
    workOrderId: 'wo-2026-088',
    orderNumber: 'WO-2026-088',
    requestedByTechnicianId: 'tech-1',
    technicianName: 'Brian Mwangi',
    customerName: 'Apex Commercial Hub',
    siteName: 'Apex Westlands Tower',
    title: 'Replace Blown Type 2 SPD Surge Cartridge & Install Line Filter',
    description: 'Lightning surge damaged SPD cartridge. Need customer/manager approval for extra KSh 8,500 replacement part.',
    estimatedCost: 8500,
    status: 'pending',
    createdAt: '2026-10-04T09:40:00'
  },
  {
    id: 'appr-02',
    type: 'high_value_part',
    workOrderId: 'wo-2026-085',
    orderNumber: 'WO-2026-085',
    requestedByTechnicianId: 'tech-3',
    technicianName: 'Grace Muthoni',
    customerName: 'Serena Grand Hotel',
    siteName: 'Serena Main Complex',
    title: 'Refrigerant Top-up R410A (3.5 kg) for Chiller Unit 2',
    description: 'Compressor low refrigerant pressure detected. Authorize issuing cylinder from main store.',
    estimatedCost: 12000,
    status: 'pending',
    createdAt: '2026-10-04T09:15:00'
  },
  {
    id: 'appr-03',
    type: 'field_expense',
    workOrderId: 'wo-2026-089',
    orderNumber: 'WO-2026-089',
    requestedByTechnicianId: 'tech-2',
    technicianName: 'David Ochieng',
    customerName: 'Safaricom Enterprise',
    siteName: 'Mombasa Road Telecom PoP Site',
    title: 'Emergency Trenching Access Clearance Permit Fee',
    description: 'Nairobi City County casual fee for roadside optical chamber inspection clearance.',
    estimatedCost: 4500,
    status: 'pending',
    createdAt: '2026-10-04T09:50:00'
  }
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv-4401',
    invoiceNumber: 'INV-2026-4401',
    workOrderId: 'wo-2026-077',
    orderNumber: 'WO-2026-077',
    customerId: 'cust-101',
    customerName: 'Apex Commercial Hub',
    customerEmail: 'accounts@apexcenter.co.ke',
    siteName: 'Apex Kilimani Logistics Center',
    issuedDate: '2026-10-04',
    dueDate: '2026-11-03',
    status: 'paid',
    items: [
      {
        description: 'Quarterly Preventive Maintenance Labor (2.1 hrs)',
        quantity: 1,
        unitPrice: 18500,
        amount: 18500,
        isCoveredUnderWarrantyOrAmc: true
      }
    ],
    subtotal: 18500,
    tax: 0, // AMC zero-rated per contract terms
    discount: 0,
    total: 18500,
    amountPaid: 18500,
    paymentMethod: 'bank_transfer',
    paymentReference: 'STANBIC-REF-992144',
    paidAt: '2026-10-04T09:30:00',
    jobProfitability: {
      revenue: 18500,
      laborCost: 9450,
      partsCost: 0,
      travelCost: 800,
      subcontractorCost: 0,
      netMargin: 8250,
      marginPercentage: 44.6
    }
  },
  {
    id: 'inv-4402',
    invoiceNumber: 'INV-2026-4402',
    workOrderId: 'wo-2026-088',
    orderNumber: 'WO-2026-088',
    customerId: 'cust-101',
    customerName: 'Apex Commercial Hub',
    customerEmail: 'accounts@apexcenter.co.ke',
    siteName: 'Apex Westlands Tower',
    issuedDate: '2026-10-04',
    dueDate: '2026-10-14',
    status: 'draft',
    items: [
      {
        description: 'Emergency Inverter Diagnostic & Phase Calibration',
        quantity: 1,
        unitPrice: 18000,
        amount: 18000,
        isCoveredUnderWarrantyOrAmc: false
      },
      {
        description: 'Dehn Type 2 Surge Protection Cartridge 40kA',
        quantity: 1,
        unitPrice: 8500,
        amount: 8500,
        isCoveredUnderWarrantyOrAmc: false
      }
    ],
    subtotal: 26500,
    tax: 4240,
    discount: 0,
    total: 30740,
    amountPaid: 0,
    jobProfitability: {
      revenue: 30740,
      laborCost: 13500,
      partsCost: 4800,
      travelCost: 1200,
      subcontractorCost: 0,
      netMargin: 11240,
      marginPercentage: 36.5
    }
  }
];
