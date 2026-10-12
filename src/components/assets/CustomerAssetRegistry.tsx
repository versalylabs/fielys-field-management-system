import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { ShieldCheck, QrCode, Wrench, Calendar, Search, CheckCircle2, AlertTriangle, Layers, Camera, X, Plus } from 'lucide-react';
import { InstalledAsset } from '../../types';

export const CustomerAssetRegistry: React.FC = () => {
  const { assets, customers, workOrders, setSelectedWorkOrderId, setActiveTab, createTicket, createAsset } = useFielys();
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [scannedAsset, setScannedAsset] = useState<InstalledAsset | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Register Asset State
  const [assetName, setAssetName] = useState('');
  const [assetCategory, setAssetCategory] = useState<InstalledAsset['category']>('Solar & Inverter');
  const [assetBrand, setAssetBrand] = useState('Victron Energy');
  const [assetModel, setAssetModel] = useState('MultiPlus-II 48/10000');
  const [assetSerial, setAssetSerial] = useState('VIC-2026-9918');
  const [assetCustomerId, setAssetCustomerId] = useState(customers[0]?.id || 'cust-1');

  const filteredAssets = assets.filter(asset => {
    const matchesCategory = categoryFilter === 'all' || asset.category.includes(categoryFilter);
    const matchesSearch = 
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(search.toLowerCase()) ||
      asset.qrCode.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleScanSample = (qr: string) => {
    const found = assets.find(a => a.qrCode === qr);
    if (found) {
      setScannedAsset(found);
    }
  };

  const handleRegisterAsset = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === assetCustomerId) || customers[0];
    createAsset({
      name: assetName || `${assetBrand} ${assetModel}`,
      category: assetCategory,
      brand: assetBrand,
      model: assetModel,
      serialNumber: assetSerial,
      qrCode: `QR-${Math.floor(100 + Math.random() * 899)}`,
      customerId: cust.id,
      siteId: cust.sites[0]?.id || 'site-1',
      installationDate: '2026-10-05',
      warrantyEndDate: '2029-10-05',
      status: 'operational',
      specifications: {
        'Nominal Rating': '10kVA / 48V',
        'Firmware': 'v5.08',
      }
    });
    setAssetName('');
    setShowRegisterModal(false);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex flex-wrap items-center gap-2">
            <span>Customer Asset & Installed Equipment Registry</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              SERIALIZED & QR TAGGED
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track equipment installed on client sites with parent-child hierarchies, warranty flags, and repair logs.
          </p>
        </div>

        {/* Search & Scanner Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="w-full sm:w-60 relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search serial#, QR, model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 pl-8 pr-3 text-xs bg-slate-800 border border-slate-700 rounded-md text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <button
            onClick={() => setShowRegisterModal(true)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Register Asset</span>
          </button>

          <button
            onClick={() => setShowScannerModal(true)}
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-md"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Scan Asset QR</span>
          </button>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
        {['all', 'Solar & Inverter', 'HVAC & Chiller', 'ISP & Fiber Network', 'CCTV & Access Control'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-md capitalize whitespace-nowrap cursor-pointer transition-colors ${
              categoryFilter === cat
                ? 'bg-cyan-600 text-white font-bold'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat === 'all' ? `All Assets (${assets.length})` : cat}
          </button>
        ))}
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAssets.map(asset => {
          const customer = customers.find(c => c.id === asset.customerId);
          const site = customer?.sites.find(s => s.id === asset.siteId);
          const assetJobs = workOrders.filter(w => w.customerId === asset.customerId);

          return (
            <div key={asset.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-4 shadow-sm hover:border-slate-700 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                      {asset.category}
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                      asset.status === 'operational' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                      {asset.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1.5">{asset.name}</h3>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {asset.brand} · Model: {asset.model}
                  </div>
                </div>

                {/* QR Code Tag Box */}
                <div className="p-2 bg-slate-950 rounded border border-slate-800 text-center shrink-0">
                  <QrCode className="w-6 h-6 text-cyan-400 mx-auto" />
                  <span className="text-[9px] font-mono text-slate-400 block mt-1">{asset.qrCode}</span>
                </div>
              </div>

              {/* Serial & Installation Data */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-2.5 rounded font-mono border border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-500 block">Serial Number</span>
                  <span className="text-slate-200 font-bold">{asset.serialNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Warranty Until</span>
                  <span className="text-emerald-400 font-semibold">{asset.warrantyEndDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Customer Premise</span>
                  <span className="text-slate-300 truncate block">{customer?.name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Site Location</span>
                  <span className="text-slate-300 truncate block">{site?.name}</span>
                </div>
              </div>

              {/* Technical Specifications Matrix */}
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Specifications</span>
                <div className="grid grid-cols-2 gap-1 text-[11px] font-mono">
                  {Object.entries(asset.specifications).map(([key, val]) => (
                    <div key={key} className="text-slate-400">
                      <span className="text-slate-500">{key}:</span> {val}
                    </div>
                  ))}
                </div>
              </div>

              {/* History / Work Orders Link */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  Last service: {asset.lastServicedDate || 'Initial Setup'}
                </span>
                <button
                  onClick={() => {
                    const job = assetJobs[0];
                    if (job) {
                      setSelectedWorkOrderId(job.id);
                      setActiveTab('work-orders');
                    }
                  }}
                  className="text-cyan-400 hover:underline font-mono text-[11px]"
                >
                  View Repair History →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* QR Code Scanner Simulation Modal */}
      {showScannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-5 space-y-4 text-xs shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Asset QR / Barcode Scanner</h3>
              </div>
              <button onClick={() => { setShowScannerModal(false); setScannedAsset(null); }}>
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>
            </div>

            {/* Simulated Viewfinder */}
            <div className="relative h-48 bg-slate-950 rounded-lg border-2 border-dashed border-cyan-500/60 flex flex-col items-center justify-center text-center p-4 overflow-hidden">
              <div className="w-32 h-32 border-2 border-cyan-400/80 rounded relative flex items-center justify-center animate-pulse">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-bounce" />
                <QrCode className="w-16 h-16 text-cyan-400/60" />
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-3">
                Align equipment QR code sticker within camera viewfinder
              </p>
            </div>

            {/* Sample quick-scan triggers */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-500">Test with Sample QR Codes:</span>
              <div className="flex flex-wrap gap-2">
                {assets.map(a => (
                  <button
                    key={a.id}
                    onClick={() => handleScanSample(a.qrCode)}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-[11px] rounded border border-slate-700 cursor-pointer"
                  >
                    Scan {a.qrCode} ({a.category})
                  </button>
                ))}
              </div>
            </div>

            {/* Scanned Result Card */}
            {scannedAsset && (
              <div className="p-3 bg-slate-950 rounded-lg border border-cyan-800/80 space-y-2 animate-in fade-in">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">✓ Equipment Verified</span>
                    <h4 className="text-xs font-bold text-white">{scannedAsset.name}</h4>
                    <span className="text-[11px] font-mono text-slate-400">S/N: {scannedAsset.serialNumber}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                    {scannedAsset.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  Warranty Valid Until: <span className="text-emerald-400 font-semibold">{scannedAsset.warrantyEndDate}</span>
                </div>

                <div className="flex gap-2 pt-1 border-t border-slate-800">
                  <button
                    onClick={() => {
                      createTicket({
                        customerId: scannedAsset.customerId,
                        customerName: 'Apex Commercial Hub',
                        siteId: scannedAsset.siteId,
                        siteName: 'Apex Westlands Tower',
                        assetId: scannedAsset.id,
                        assetName: scannedAsset.name,
                        title: `Diagnostic Service: ${scannedAsset.name}`,
                        description: `Issue scanned on-site for serial ${scannedAsset.serialNumber}`,
                        priority: 'high',
                        source: 'portal'
                      });
                      setShowScannerModal(false);
                      setActiveTab('tickets');
                    }}
                    className="flex-1 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-bold cursor-pointer transition-colors"
                  >
                    + Open Service Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Register New Asset Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-5 space-y-4 text-xs shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <QrCode className="w-4 h-4 text-cyan-400" />
                <span>Register New Installed Equipment</span>
              </h3>
              <button onClick={() => setShowRegisterModal(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterAsset} className="space-y-3">
              <div>
                <label className="text-slate-300 font-medium">Equipment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Victron MultiPlus-II 10kVA Inverter"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium">Category</label>
                  <select
                    value={assetCategory}
                    onChange={(e) => setAssetCategory(e.target.value as InstalledAsset['category'])}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  >
                    <option value="Solar & Inverter">Solar & Inverter</option>
                    <option value="HVAC & Chiller">HVAC & Chiller</option>
                    <option value="ISP & Fiber Network">ISP & Fiber Network</option>
                    <option value="CCTV & Access Control">CCTV & Access Control</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Customer Premise</label>
                  <select
                    value={assetCustomerId}
                    onChange={(e) => setAssetCustomerId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  >
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium">Manufacturer Brand</label>
                  <input
                    type="text"
                    required
                    value={assetBrand}
                    onChange={(e) => setAssetBrand(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Model Number</label>
                  <input
                    type="text"
                    required
                    value={assetModel}
                    onChange={(e) => setAssetModel(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-medium">Serial Number</label>
                <input
                  type="text"
                  required
                  value={assetSerial}
                  onChange={(e) => setAssetSerial(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="flex-1 py-2 bg-slate-800 text-slate-300 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold cursor-pointer"
                >
                  Generate QR & Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
