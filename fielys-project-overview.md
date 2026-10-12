# Fielys — Field Service Management System
### Product Overview & Feature Scope
*Developed by Versaly | Target: Solar, ISP/Internet Installers, HVAC, Security, Cleaning, Pest Control, Water Utilities, Equipment Servicing, Property Maintenance*

---

## End-to-End Field Service Lifecycle

Every stage maintains its own **status, timestamps, GPS coordinates, responsible user, documents, and audit history.**

```text
New Prospect / Lead (or Existing Customer / Automated AMC Trigger)
      ↓
Initial Site Survey → Quotation / Estimate → Won (Converts to Customer & Site)
      ↓
Service Request / Ticket Created
      ↓
SLA Timer Started (Response & Resolution)
      ↓
Work Order Generated
      ↓
Dispatch, Scheduling & Route Optimization (Skill, Zone, Travel & Availability Match)
      ↓
Technician / Subcontractor Notified (Mobile App) + Tools Checked Out
      ↓
En Route (Travel Time & Distance Tracked) → Check-In at Site (GPS Verified)
      ↓
Pre-Job Safety & Diagnostic Checklist
      ↓
Job Execution + Additional Work Escalation / Approval (if needed)
      ↓
Parts Installed (Van Stock) + Old / Faulty Core Part Returned
      ↓
Before / After Photos + Customer Signature → Configurable Digital Service Report
      ↓
Job Completed & Checked Out
      ↓
Invoice Generated (Contract / Warranty / Billable) + Subcontractor Cost Logged
      ↓
Payment Collected (M-Pesa / Card / Bank)
      ↓
Customer Feedback & CSAT Rating
      ↓
Reporting & Profitability Analytics
```

---

## Dashboard Summary (Management & Dispatch View)

```text
🛠️ 28 Work Orders Today   🟢 18 Completed   🚚 6 In Progress   ⏳ 4 Unassigned
👷 20 Technicians         📍 15 On Site     🚗 3 En Route      ⚪ 2 Available

⚠️ 2 SLA Breaches Risk    🔁 12 AMC Visits Due This Week       📦 3 Van Stock Alerts
🧰 2 Tools Overdue        🔄 4 Faulty Cores Pending Return     ✋ 3 Approvals Pending
💰 Revenue Today: KSh 420K                  ⭐ Avg Customer Rating: 4.8 / 5.0
```

---

## Module Index

| # | Module | Priority |
|---|--------|----------|
| 1 | Lightweight Lead-to-Customer Intake | 🟡 Later |
| 2 | Customer & Site Management | Core |
| 3 | Customer Asset & Installed Equipment Registry | 🔴 High |
| 4 | Service Requests & Ticketing | Core |
| 5 | Quotations & Estimates | 🟠 Medium |
| 6 | Work Order Management | Core |
| 7 | Escalation & Approval Workflows | 🟠 Medium |
| 8 | Dispatch & Scheduling Board | 🔴 High |
| 9 | Route & Travel Management | 🟠 Medium |
| 10 | Technician & Crew Management | Core |
| 11 | Subcontractor Management | 🟡 Later |
| 12 | Technician Mobile Experience (App / PWA) | 🔴 High |
| 13 | Checklists, Forms & Safety Compliance | 🔴 High |
| 14 | Parts, Warehouse & Van Stock Inventory | 🔴 High |
| 15 | Parts Return & Core Return Workflow | 🟠 Medium |
| 16 | Stock Replenishment Requests (Vensure Ready) | 🟡 Later |
| 17 | Tools & Equipment Tracking | 🟠 Medium |
| 18 | Service Contracts, AMCs & Recurring Jobs | 🔴 High |
| 19 | SLA & Warranty Management | 🟠 Medium |
| 20 | Proof of Service & Digital Sign-Off | Core |
| 21 | Configurable Service Report Templates | 🟠 Medium |
| 22 | Billing, Invoicing & Field Payments | 🔴 High |
| 23 | Field Expenses & Mileage Claims | 🟠 Medium |
| 24 | Customer Self-Service Portal | 🟠 Medium |
| 25 | Dispatcher Workspace (Live Ops Center) | 🟢 Recommended |
| 26 | Technician Performance & Utilization | 🔴 High |
| 27 | Reporting & Analytics | Core |
| 28 | Notifications & Customer Alerts | Core |
| 29 | Multi-Branch & Service Territories | 🟠 Medium |
| 30 | System Administration & Integrations | Core |

---

## 1. 🎯 Lightweight Lead-to-Customer Intake

*Bridges the gap for new business inquiries without bloated CRM overhead.*

**Workflow:**
```text
Lead / Prospect → Site Survey Scheduled → Quotation Sent → Won (Converts to Customer & Site) → Work Order
```

- Capture prospect details (company/contact name, phone, email, requested service, site location)
- Schedule an initial **Site Survey / Assessment** visit for a technician or surveyor
- Generate quote directly from site survey findings
- Lead status: `New → Contacted → Survey Scheduled → Quoted → Won → Lost (with reason)`
- One-click conversion of a **Won** lead into an active **Customer, Site, and Installation Work Order**

---

## 2. 👥 Customer & Site Management

*A single customer (e.g., a bank, hotel chain, or estate) may have dozens of physical service locations.*

- Customer profiles (residential, commercial, corporate, government/NGO)
- Parent–child account hierarchy (Head Office vs. Branch sites)
- Multiple service locations / sites per customer:
  - Site name, physical address, GPS coordinates / Google Maps pin
  - Site access instructions (gate codes, security contact, working hours)
  - On-site contact person (name, phone, role)
- Full service history per site and per customer
- Customer billing preferences and credit terms
- Customer document vault (site maps, wiring diagrams, floor plans, contracts)

---

## 3. ⚡ Customer Asset & Installed Equipment Registry

*Critical for Solar, HVAC, ISP, Security, and Equipment Servicing companies — track what is installed at the client's premises.*

- Register equipment installed at each customer site:
  - Asset name, category (e.g., 5kVA Inverter, Split AC Unit, CCTV NVR, Fiber ONT)
  - Brand, model, serial number, barcode / QR code tag
  - Installation date and installing technician
  - Warranty start & end dates (auto-flags if repair is under warranty)
- Parent–child component tracking (e.g., Solar System → Inverter + 4 Batteries + 12 Panels)
- Complete repair, part replacement, and maintenance log per specific serial number
- Asset status: `Operational → Faulty → Under Repair → Replaced → Decommissioned`
- QR code sticker support: Technician scans asset QR on-site to pull up its full history

---

## 4. 🎫 Service Requests & Ticketing

*The intake funnel before a job becomes a dispatched work order.*

- Multi-channel request intake:
  - Call center / receptionist manual entry
  - Customer portal submission
  - Email-to-ticket / WhatsApp webhook (Phase 2)
  - Automated trigger from a recurring maintenance schedule
- Issue category & fault type (e.g., New Installation, Breakdown/Repair, Routine Service, Inspection)
- Priority levels: `Low | Medium | High | Emergency / Critical`
- Customer symptom description + customer-uploaded photos/videos of the issue
- Link request to specific customer site and installed asset
- Request triage: `New → Triaged → Quoted → Converted to Work Order → Cancelled`

---

## 5. 📝 Quotations & Estimates

*For jobs that require customer price approval before dispatching a technician or ordering parts.*

- Generate site survey or repair estimate
- Line items: parts/materials, labor hours, call-out fee, transport charge
- Convert approved diagnostic visit findings into a repair quotation
- Send quote via PDF / email / customer link for digital approval
- Quote status: `Draft → Pending Approval → Sent → Approved → Rejected → Converted to Work Order / Invoice`

---

## 6. 🛠️ Work Order Management

*The operational backbone of Fielys.*

- Work Order (WO) numbering and lifecycle tracking
- Work Order types:
  - **Installation** (new system setup)
  - **Corrective / Breakdown** (fix a fault)
  - **Preventive Maintenance** (scheduled servicing)
  - **Site Survey / Inspection** (pre-quote assessment)
  - **Decommissioning / Removal**
- Detailed job instructions, required tools, and safety notes
- Estimated job duration and scheduled time window (e.g., 10:00 AM – 12:00 PM)
- Linked customer, site, installed asset, contract, and SLA
- Multi-visit support (if a job requires ordering a part and returning the next day)
- Work Order status:
  `Draft → Ready to Schedule → Scheduled → Dispatched → En Route → On Site / In Progress → On Hold (Awaiting Approval/Parts/Access) → Completed → Verified → Invoiced → Closed`

---

## 7. 🔁 Escalation & Approval Workflows

*A generalized workflow engine so field staff never get stuck or make unauthorized commitments.*

**On-Site Additional Work Workflow:**
```text
Technician discovers extra fault/part needed on-site
      ↓
Submits Additional Work Request (with photo & cost) in Mobile App
      ↓
Operations Manager Approves
      ↓
Customer Approves (via SMS/Portal link or on-screen sign-off)
      ↓
Technician Proceeds with Work
```

**Configurable approval rules & thresholds for:**
- Additional billable work discovered on-site
- Quote discounts or price overrides above a threshold (e.g., > 10%)
- Field expenses above a threshold
- High-value spare parts requests
- Out-of-warranty goodwill repairs (Warranty Exceptions)
- Work order cancellations or SLA overrides
- Subcontractor payout sign-off

---

## 8. 🗓️ Dispatch & Scheduling Board

*Eliminates WhatsApp chaos — match the right technician to the right job in seconds.*

- **Visual Calendar & Gantt Timeline View**:
  - View technicians/crews on the Y-axis, hours of the day on the X-axis
  - Drag-and-drop unassigned work orders onto technician time slots
- **Map-Based Dispatch View**:
  - See open work orders and technician locations on a single map
- **Smart Matching Filters**:
  - Filter by **Skill / Certification** (e.g., High-Voltage Solar, Fiber Splicing, Fumigation License)
  - Filter by **Service Zone / Territory** (e.g., Westlands, Mombasa Road)
  - Filter by **Availability** (On shift, On leave, Already booked)
- **Team / Crew Dispatching**:
  - Assign a Lead Technician + Assistant Technicians (or Subcontractor) to a job
- **Conflict Detection**:
  - Alerts on double-booking, overlapping travel times, or missing required skills/tools
- **Reassignment & Rescheduling**:
  - Easily move jobs if a technician is delayed or a job runs over time

---

## 9. 🗺️ Route & Travel Management

*Treats travel time and road distance as a first-class operational and cost metric.*

- **Daily Route View per Technician**: Visual sequence of Stop 1 → Stop 2 → Stop 3 on a map
- **Multi-Job Route Optimization**: Suggest the most efficient job order to minimize driving and fuel
- **Estimated Travel Time & Distance**: Calculated between consecutive jobs so dispatchers leave realistic travel buffers on the schedule
- **Actual vs. Estimated Travel Time**: Track time between `Start Travel` and `Arrive at Site`
- **Distance Traveled per Technician**: Logged daily/weekly via GPS check-ins or odometer readings
- **Travel Cost per Job**: Automatically allocate transport/mileage costs to the Work Order for true job profitability
- **(Optional Bridge to Fleesio)**: Link service vans and mileage directly to Versaly's **Fleesio** if the client uses both systems

---

## 10. 👷 Technician & Crew Management

- Technician profile (name, ID, contact, photo, employee number)
- Skills & certifications matrix (with certification expiry alerts)
- Assigned service zone / branch
- Assigned service vehicle / van (links to Van Stock and Tools)
- Working hours, shift schedules, and leave calendar
- Employment type: Full-time, Subcontractor, Casual
- Hourly labor cost & billing rate per technician tier
- Live status: `Available → En Route → Working on Site → On Break → Off Duty`

---

## 11. 🧑‍💼 Subcontractor Management

*For field service companies that outsource overflow installations, specialized repairs, or regional jobs.*

- Subcontractor company & individual technician profiles
- Compliance document vault (business registration, insurance, technician certifications, NDA) with expiry alerts
- Assigned work orders (dispatch to external subcontractor just like internal staff, with restricted mobile access)
- Agreed rate cards (flat rate per installation, per-job rate, or hourly rate)
- Subcontractor invoice submission & verification against completed Work Orders
- Subcontractor payment status tracking (`Pending → Approved → Paid`)
- Subcontractor performance tracking (First-Time Fix Rate, on-time arrival, customer ratings, callback rate)

---

## 12. 📱 Technician Mobile Experience (First-Class Mobile App / Offline PWA)

*Fielys lives in the technician's pocket in the field.*

- **My Schedule & Daily Route**: Daily agenda of assigned jobs with priority, time windows, and multi-stop map route
- **One-Tap Navigation**: Open site GPS coordinates directly in Google Maps / Waze
- **Job Status Updates**: Tap `Start Travel` → `Arrive at Site` → `Pause Job` → `Complete Job`
- **GPS Geo-Fencing & Time Stamping**: Captures exact time and GPS location on check-in and check-out
- **Asset History Lookup**: Scan equipment QR code to view past repairs and warranty status
- **Digital Checklists**: Complete mandatory step-by-step forms on-site
- **Additional Work Escalation**: Request manager/customer approval for extra work found on-site
- **Parts & Core Return Logging**: Log parts installed from van stock + scan/log old faulty part removed from customer site
- **Tools Check-in/Check-out**: Confirm assigned specialized tools and report damages
- **Media Capture**: Take annotated Before & After photos
- **Customer Sign-off**: Capture customer name, rating, and finger-signature on screen
- **Offline Mode**: Work in basements or remote solar sites with no signal; auto-syncs when back online

---

## 13. ✅ Checklists, Forms & Safety Compliance

*Standardizes service quality across all internal and subcontracted technicians.*

- Configurable digital checklists per job type or industry:
  - *Solar*: Voltage reading, battery health %, panel cleaning check, inverter firmware check
  - *Pest Control*: Chemicals used, dilution ratio, areas treated, safety reentry time
  - *Cleaning*: Room-by-room task verification checklist
  - *ISP*: Signal dBm reading, speed test screenshot, router MAC address
- Mandatory **Pre-Job Safety / Risk Assessment (JSA)** before starting hazardous work
- Conditional fields (e.g., if status = "Failed", require photo + explanation)
- Auto-embeds completed checklist into the Customer Service Report PDF

---

## 14. 📦 Parts, Warehouse & Van Stock Inventory

*Tracks spare parts from the main store to the technician's service van to the customer's invoice.*

- Spare parts & consumables catalogue (SKU, category, cost price, selling price, warranty period)
- **Multi-Location Stock Tracking**:
  - Main Warehouse(s)
  - **Technician Van Stock / Toolkits** (know exactly what parts Tech A is carrying right now)
- Stock transfers: Warehouse → Technician Van → Installed on Work Order
- Serialized inventory tracking (track exact serial numbers of inverters, routers, cameras, compressors)
- Minimum stock levels & low-stock alerts (per warehouse and per technician van)
- Billable vs. Non-Billable (warranty/AMC) part flags on work orders
- Stock valuation and parts usage audit trail

---

## 15. 🔄 Parts Return & Core Return Workflow

*Crucial for HVAC, Solar, ISP, and Electronics — tracks what happens to the old/faulty part removed from the customer's site.*

**Closed-Loop Part Lifecycle:**
```text
New Part Issued to Technician
        ↓
New Part Installed on Customer Asset
        ↓
Old / Replaced Part Removed & Logged by Technician ("Core / Faulty Return")
        ↓
Returned to Warehouse Quarantine Bay
        ↓
Inspected & Flagged:
   ├── Under Manufacturer Warranty → RMA / Return-to-Supplier Claim
   ├── Repairable / Refurbishable → Refurbished & Returned to Stock
   └── Beyond Repair → Approved for Disposal / Scrapping
```

- Mandatory prompt on mobile app when replacing serialized equipment: *"Log removed unit serial number & condition"*
- Track pending returns per technician (prevents technicians from disappearing with valuable scrap copper, batteries, or routers)
- Supplier RMA (Return Merchandise Authorization) tracking for warranty replacements and credit notes
- Disposal / scrapping certificate and audit log

---

## 16. 🛒 Stock Replenishment Requests (Procurement Handoff)

*Connects field inventory needs to purchasing without duplicating a full ERP.*

**Workflow:**
```text
Low Stock Alert / Special Job Part Needed
        ↓
Storekeeper / Manager Raises Replenishment Request
        ↓
Internal Approval
        ↓
Purchase Order Generated (or Handed Off to Versaly Vensure via API)
        ↓
Goods Received Note (GRN) → Warehouse Stock Updated
```

- Auto-generate replenishment requests when warehouse or van stock drops below minimum levels
- Special-order part requests linked to anOn-Hold Work Order (auto-notifies dispatcher when the part arrives so the job can be rescheduled!)
- Lightweight PO & receiving built in for standalone Fielys clients, plus native integration hook into **Vensure** (Versaly's Procurement System)

---

## 17. 🧰 Tools & Equipment Tracking

*Protects expensive field tools (fluke meters, fiber fusion splicers, ladders, drills, crimpers, gas analyzers).*

- **Tool & Equipment Registry**: Tool ID/serial number, category, purchase cost, photo, QR/barcode tag
- **Tool Assignment**: Assign permanently to a Technician, a Crew, or a Service Van, or keep in a central Tool Crib
- **Tool Checkout & Check-In**: Log temporary issuance of specialized equipment for specific jobs
- **Tool Condition Tracking**: `Good → Needs Calibration → Damaged → Lost / Stolen → Retired`
- **Calibration & Safety Inspection Schedules**:
  - Track calibration expiry dates for precision/safety gear (test meters, pressure gauges, harnesses)
  - Alert manager and block tool assignment when calibration expires
- **Lost / Damaged Tool Reporting**: Technician or storekeeper logs incident; option to flag for payroll deduction or insurance claim
- Periodic tool audit checklist (verify technician still has all assigned tools)

---

## 18. 🔁 Service Contracts, AMCs & Recurring Jobs

*Recurring revenue engine for Cleaning, Pest Control, HVAC, Security, and Solar maintenance.*

- **Annual Maintenance Contracts (AMCs) & Service Agreements**:
  - Contract start/end dates, contract value, billing cycle (monthly, quarterly, annual)
  - Included services (e.g., 4 quarterly preventive visits + 2 free emergency call-outs)
  - Covered customer sites and covered assets
- **Automated Preventative Maintenance (PM) Generator**:
  - Define recurrence rules (weekly, monthly, every 90 days)
  - Auto-generates Work Orders in advance so dispatchers never forget a scheduled visit
- Contract utilization tracking (visits used vs. visits remaining, parts cost consumed under contract)
- Contract renewal reminders (90 / 60 / 30 days before expiry)

---

## 19. ⏱️ SLA & Warranty Management

*Crucial for corporate clients, ISPs, security firms, and B2B maintenance contracts.*

- Define SLA policies by priority and customer tier:
  - **Response Time SLA**: e.g., Assign & contact within 30 minutes
  - **On-Site Arrival SLA**: e.g., Technician on-site within 2 hours
  - **Resolution Time SLA**: e.g., Issue resolved within 6 hours
- SLA countdown timers visible on tickets and dispatch board
- Automated escalation alerts when a job hits 75% of SLA window without action
- SLA pause rules (e.g., timer pauses when status is `Customer Unavailable` or `Awaiting Customer Quote Approval`)
- **Warranty Tracking**:
  - Equipment warranty vs. Workmanship warranty (e.g., 30-day repeat-visit guarantee)
  - Alerts dispatcher if a customer calls back for the same issue within 30 days ("Repeat Call / Rework")

---

## 20. 📸 Proof of Service & Digital Sign-Off

- Before-and-after photo uploads (timestamped and geo-tagged)
- Technician work summary notes and root-cause selection
- Recommendations for future maintenance
- Digital Customer Signature capture on technician's phone/tablet
- Customer on-the-spot star rating capture

---

## 21. 📄 Configurable Service Report Templates

*Makes Fielys adaptable across Solar, HVAC, ISP, Cleaning, Pest Control, and Security with zero code changes.*

- **Template Builder by Job Type or Industry**:
  - Customize layout for an *Installation Certificate*, *Preventive Maintenance Report*, *Pest Treatment Certificate*, or *Breakdown Job Card*
- **Company Branding**: Client logo, brand colors, header/footer, terms & conditions, regulatory license numbers
- **Show / Hide Sections Dynamically**:
  - Toggle visibility of Parts Used, Pricing/Costs (hide prices on AMC/warranty reports), Checklist Readings, Asset Serial Numbers, Safety Sign-off, or Before/After Photo Grids
- **Custom Fields & Industry Tables**: Add custom data tables (e.g., String Voltage Table for Solar, Chemical Batch Table for Pest Control)
- **Customer-Specific Report Formats**: Assign a dedicated report template required by major corporate/enterprise clients
- Auto-generates polished PDF and emails/WhatsApps it to the customer upon job completion

---

## 22. 💰 Billing, Invoicing & Field Payments

*Turns completed field jobs into cash immediately — no lost paper job cards.*

- Auto-generate invoice upon Work Order completion:
  - Labor charges (flat rate, hourly rate, or call-out fee)
  - Billable spare parts consumed on the job
  - Travel / mileage charges
  - Automatic zero-rating or discounting for items covered under Warranty or AMC
- **On-Site Payment Collection**:
  - M-Pesa STK Push integration (customer pays directly on completion)
  - Cash / Bank Transfer / Card recording
- Corporate batch invoicing (combine all jobs done in a month into one consolidated invoice)
- Invoice status: `Draft → Sent → Paid → Partially Paid → Overdue`
- **True Job Profitability Calculation**:
  `Invoice Revenue − (Parts Cost + Internal Tech Labor Cost + Subcontractor Fee + Travel/Expense Cost)`

---

## 23. 🧾 Field Expenses & Mileage Claims

- Technicians can log job-related field expenses (parking, casual labor, emergency local hardware purchase, transport fare)
- Receipt photo upload
- Link expense to specific Work Order for accurate job costing
- Ties into Module 7 (Approval Workflows) for expenses above threshold

---

## 24. 🌐 Customer Self-Service Portal

*Reduces phone calls to the office and looks ultra-professional for B2B clients.*

Customers can log in to:
- Log a new service request and upload photos of the fault
- Track request status (`Assigned → Technician En Route → Completed`)
- View assigned technician's name, photo, and ID badge (huge trust factor for security/home visits)
- Approve quotations and on-site additional work requests online
- Download past Service Reports / Job Cards and Invoices
- View their registered assets and upcoming scheduled maintenance dates
- Rate the technician after job completion

---

## 25. 🖥️ Dispatcher Workspace (Live Operations Center)

*The single screen the Operations Manager / Dispatcher keeps open all day.*

| Panel | What it shows |
|-------|---------------|
| Unassigned Queue | New requests and work orders waiting to be scheduled |
| Emergency / High Priority Jobs | Critical breakdowns requiring immediate dispatch |
| SLA At-Risk Jobs | Jobs approaching response or resolution breach |
| Live Technician & Route Board | Who is on-site, en route, available, or running late |
| Pending Field Approvals | Technicians on-site waiting for manager/customer sign-off on extra work |
| Delayed / Overrunning Jobs | Jobs past their scheduled start or end time |
| Jobs On Hold (Awaiting Parts) | Blocked jobs + status of linked stock replenishment requests |
| Today's PM / Contract Visits | Scheduled recurring visits due today |
| Unreturned Faulty Cores | Technicians holding replaced/warranty parts that must return to store |
| Completed Awaiting Review | Jobs finished by techs, awaiting office verification & invoicing |

---

## 26. 🏆 Technician Performance & Utilization

*Objective metrics to reward top technicians and spot training needs.*

| Metric | What it measures |
|--------|-----------------|
| **First-Time Fix Rate (FTFR)** | % of jobs completed on the first visit without needing a return trip |
| **Jobs Completed per Day/Week** | Productivity volume |
| **Utilization Rate** | Billable hours on-site vs. total shift hours vs. travel time |
| **On-Time Arrival Rate** | % of jobs where technician arrived within scheduled window |
| **Actual vs. Estimated Travel** | Route adherence and travel efficiency |
| **Mean Time to Repair (MTTR)** | Average duration to fix specific fault types |
| **Rework / Callback Rate** | % of jobs that had a repeat fault within 14–30 days |
| **Tool & Core Return Compliance** | Accountability for assigned tools and returned faulty parts |
| **Customer Rating (CSAT)** | Average star rating from customers after jobs |
| **Revenue Generated** | Total billable value completed by the technician |

---

## 27. 📊 Reporting & Analytics

**Management can always answer:**
> "Where are our 20 technicians right now?" "What is our First-Time Fix Rate?" "Which equipment model breaks down the most?" "Are our maintenance contracts profitable?" "Which faulty parts are waiting for supplier warranty claims?"

Reports include:
- **Lead Conversion & Survey-to-Win Report**
- **Work Order Volume & Completion Trends** (by category, branch, priority)
- **Job & Contract Profitability Report** (Revenue vs. Labor + Subcontractor + Parts + Travel cost)
- **SLA Compliance Report** (% met vs. breached per customer/contract)
- **Technician & Subcontractor Productivity Scorecard**
- **Travel Time vs. Wrench Time (On-Site Work) Report**
- **Asset Reliability & Breakdown Report** (most frequent faults by brand/model)
- **Parts Consumption, Van Stock & Pending Core Returns Report**
- **Tool Inventory, Calibration Expiry & Loss Report**
- **Unbilled Completed Jobs Report** (stops revenue leakage!)
- Export to PDF / Excel

---

## 28. 🔔 Notifications & Customer Alerts

| Event | Recipient | Channel |
|-------|-----------|---------|
| Ticket received confirmation | Customer | Email / SMS |
| New job assigned | Technician / Subcontractor | App Push / SMS |
| Appointment scheduled | Customer | SMS / Email |
| **"Technician is En Route" (with Tech Name, Photo & ID)** | Customer | SMS / WhatsApp |
| On-site additional work approval request | Manager & Customer | App / SMS / Email |
| SLA breach warning | Dispatcher / Manager | In-App / Email |
| Special-order part arrived in stock | Dispatcher | In-App / Email |
| Tool calibration expiring / Core return overdue | Storekeeper / Tech | In-App / Email |
| Job completed + Configurable Service Report PDF | Customer | Email / WhatsApp |
| Invoice & Payment Link | Customer | Email / SMS |

---

## 29. 🏢 Multi-Branch & Service Territories

- Define geographic **Service Zones / Territories** (e.g., Nairobi North, Coast Region, Rift Valley)
- Assign technicians, subcontractors, dispatchers, and warehouses to specific branches/zones
- Auto-route incoming customer requests to the regional dispatch team
- Branch-level vs. Head Office consolidated reporting

---

## 30. ⚙️ System Administration & Integrations

**System Admin:**
- Role-based access control: Admin, Operations Manager, Dispatcher, Technician, Subcontractor, Storekeeper, Finance, Customer
- Custom job types, checklist builder, service report template designer, and fault code libraries
- Approval & escalation rule engine configuration
- White-label branding per client organization
- Full audit log

**Integrations (Phase 2+ & Versaly Ecosystem):**
- **Versaly Ecosystem Native Hooks**:
  - **Vensure Integration**: Hand off Fielys Stock Replenishment Requests directly into Vensure Purchase Requisitions
  - **Fleesio Integration**: Sync technician service vans, fuel, and travel mileage directly with Fleesio Fleet Management
- **Payments**: M-Pesa Daraja API (STK Push), Stripe, Paystack, Pesapal
- **Messaging**: Africa's Talking / Twilio (SMS), WhatsApp Business API
- **Maps**: Google Maps API (routing, geocoding, distance matrix)
- **Accounting**: QuickBooks, Xero, Sage, Odoo
- **IoT / Remote Monitoring**: Solar inverter APIs, ISP network alerts, alarm panel webhooks

---

## Priority Summary

| Priority | Module |
|----------|--------|
| 🔴 High | Work Order Management |
| 🔴 High | Dispatch & Scheduling Board (Calendar + Map) |
| 🔴 High | Technician Mobile Experience (Check-in, Photos, Signature, Offline) |
| 🔴 High | Customer Asset & Installed Equipment Registry |
| 🔴 High | Parts, Warehouse & Van Stock Inventory |
| 🔴 High | Service Contracts, AMCs & Recurring PM Generator |
| 🔴 High | Checklists, Forms & Safety Compliance |
| 🔴 High | Billing, Invoicing & Mobile Money Collection |
| 🔴 High | Technician Performance (First-Time Fix Rate, Utilization) |
| 🟠 Medium | Parts Return / Core Return & RMA Workflow |
| 🟠 Medium | Tools & Equipment Tracking (Checkout & Calibration) |
| 🟠 Medium | Route & Travel Management (Wrench Time vs. Drive Time) |
| 🟠 Medium | Escalation & Approval Workflows (On-site Extra Work) |
| 🟠 Medium | Configurable Service Report Templates |
| 🟠 Medium | SLA & Warranty Tracking |
| 🟠 Medium | Quotations & Estimates |
| 🟠 Medium | Customer Self-Service Portal |
| 🟢 Recommended | Dispatcher Live Operations Workspace |
| 🟡 Later | Stock Replenishment Requests (with Vensure handoff) |
| 🟡 Later | Subcontractor Management |
| 🟡 Later | Lightweight Lead → Site Survey → Customer Intake |

---

*Fielys by Versaly — Your field workforce, running like clockwork.*
