import React, { useState, useEffect } from 'react';
import { useFielys } from '../../context/FielysContext';
import { Package, RotateCcw, AlertTriangle, ArrowRightLeft, ShieldAlert, CheckCircle2, Plus } from 'lucide-react';

export const InventoryManagement: React.FC = () => {
  const { inventory, coreReturns, technicians, transferVanStock, updateCoreReturnStatus, createInventoryPart, activeTab, setActiveTab } = useFielys();

  const [activeSubTab, setActiveSubTab] = useState<'inventory' | 'core_returns'>(
    activeTab === 'core-returns' ? 'core_returns' : 'inventory'
  );
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAddPartModal, setShowAddPartModal] = useState(false);
  const [selectedPartId, setSelectedPartId] = useState(inventory[0]?.id || '');
  const [selectedTechId, setSelectedTechId] = useState(technicians[0]?.id || '');
  const [transferQty, setTransferQty] = useState(1);
  const [transferDirection, setTransferDirection] = useState<'warehouse_to_van' | 'van_to_warehouse'>('warehouse_to_van');

  // New Part Form State
  const [partName, setPartName] = useState('');
  const [partSku, setPartSku] = useState('SKU-NEW-01');
  const [partCategory, setPartCategory] = useState('Solar & Inverter');
  const [partCostPrice, setPartCostPrice] = useState('4500');
  const [partSellPrice, setPartSellPrice] = useState('6800');
  const [partWarehouseStock, setPartWarehouseStock] = useState('12');
  const [partMinThreshold, setPartMinThreshold] = useState('3');

  useEffect(() => {
    if (activeTab === 'core-returns') {
      setActiveSubTab('core_returns');
    } else if (activeTab === 'inventory') {
      setActiveSubTab('inventory');
    }
  }, [activeTab]);

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    createInventoryPart({
      name: partName || 'Replacement Industrial Breaker',
      sku: partSku,
      category: partCategory as any,
      unitCost: parseFloat(partCostPrice) || 4500,
      sellPrice: parseFloat(partSellPrice) || 6800,
      warehouseStock: parseInt(partWarehouseStock) || 10,
      minimumThreshold: parseInt(partMinThreshold) || 3,
      vanStock: {},
    });
    setPartName('');
    setShowAddPartModal(false);
  };

  const selectedPart = inventory.find(p => p.id === selectedPartId);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex flex-wrap items-center gap-2">
            <span>Parts, Van Stock & Closed-Loop Core Returns</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
              MULTI-LOCATION TRACEABILITY
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Reconcile parts from central store to technician vans, and quarantine old faulty core parts removed from sites.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddPartModal(true)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>Add Part to Store</span>
          </button>
          <button
            onClick={() => setShowTransferModal(true)}
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Transfer to Tech Van</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 text-xs font-mono overflow-x-auto">
        <button
          onClick={() => {
            setActiveSubTab('inventory');
            setActiveTab('inventory');
          }}
          className={`py-2 px-3 border-b-2 font-semibold cursor-pointer transition-colors whitespace-nowrap ${
            activeSubTab === 'inventory' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Parts & Van Stock Inventory ({inventory.length})
        </button>
        <button
          onClick={() => {
            setActiveSubTab('core_returns');
            setActiveTab('core-returns');
          }}
          className={`py-2 px-3 border-b-2 font-semibold cursor-pointer transition-colors whitespace-nowrap ${
            activeSubTab === 'core_returns' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Faulty Core Returns & RMAs ({coreReturns.length})
        </button>
      </div>

      {/* Sub Tab 1: Inventory Table */}
      {activeSubTab === 'inventory' && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">PART NAME & SKU</th>
                <th className="py-3 px-4">CATEGORY</th>
                <th className="py-3 px-4">UNIT SELL PRICE</th>
                <th className="py-3 px-4">MAIN STORE</th>
                <th className="py-3 px-4">TECH VAN STOCK</th>
                <th className="py-3 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {inventory.map(part => {
                const isLowStock = part.warehouseStock <= part.minimumThreshold;
                const totalVan = Object.values(part.vanStock).reduce((a, b) => a + b, 0);

                return (
                  <tr key={part.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{part.name}</div>
                      <div className="text-[10px] font-mono text-cyan-400">{part.sku}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-mono text-[11px]">
                      {part.category}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-200">
                      KSh {part.sellPrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <span className={`font-bold ${isLowStock ? 'text-amber-400' : 'text-slate-200'}`}>
                        {part.warehouseStock} units
                      </span>
                      <span className="text-[10px] text-slate-500 block">Min: {part.minimumThreshold}</span>
                    </td>
                    <td className="py-3 px-4 font-mono">
                      <div className="text-cyan-300 font-bold">{totalVan} in fleet vans</div>
                      <div className="text-[10px] text-slate-500">
                        {Object.entries(part.vanStock).filter(([_, qty]) => qty > 0).map(([tId, qty]) => {
                          const tech = technicians.find(t => t.id === tId);
                          return `${tech?.name.split(' ')[0]}: ${qty}`;
                        }).join(' · ') || 'None in vans'}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {isLowStock ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                          LOW STOCK ALERT
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                          NOMINAL
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Sub Tab 2: Core Returns & RMA Bay */}
      {activeSubTab === 'core_returns' && (
        <div className="space-y-4">
          <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-lg text-amber-200 text-xs flex items-center justify-between font-mono">
            <span>Core Return Compliance: 4 replaced equipment cores currently quarantined or pending supplier warranty credit.</span>
            <span className="font-bold">Total Scrapped/RMA: 4 Units</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreReturns.map(core => (
              <div key={core.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400">{core.orderNumber}</span>
                    <h3 className="font-bold text-white mt-0.5">{core.partName}</h3>
                    <div className="text-[11px] font-mono text-slate-400">
                      S/N: {core.serialNumber} · Removed by {core.technicianName}
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                    core.status === 'in_van' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    core.status === 'quarantine_bay' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {core.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="p-2.5 bg-slate-950 rounded font-mono text-[11px] border border-slate-800/80 space-y-1">
                  <div className="text-slate-400">
                    <span className="text-slate-500">Condition:</span> <span className="capitalize text-slate-200 font-semibold">{core.condition.replace('_', ' ')}</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-slate-500">Customer Premise:</span> <span className="text-slate-200">{core.customerName}</span>
                  </div>
                  {core.rmaNumber && (
                    <div className="text-cyan-400 font-bold">
                      Supplier RMA Claim: {core.rmaNumber}
                    </div>
                  )}
                </div>

                {/* Return Action */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-500 font-mono">Removed: {core.removedDate}</span>
                  {core.status === 'in_van' && (
                    <button
                      onClick={() => updateCoreReturnStatus(core.id, 'quarantine_bay')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] font-mono cursor-pointer"
                    >
                      Receive into Store Quarantine
                    </button>
                  )}
                  {core.status === 'quarantine_bay' && (
                    <button
                      onClick={() => updateCoreReturnStatus(core.id, 'rma_supplier', 'RMA-AUTO-8819')}
                      className="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800 rounded text-[11px] font-mono cursor-pointer"
                    >
                      File Supplier RMA Claim
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stock Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-sm p-4 space-y-4 text-xs">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
              <span>Transfer Stock to Van / Store</span>
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-slate-300 font-medium">Select Part</label>
                <select
                  value={selectedPartId}
                  onChange={(e) => setSelectedPartId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                >
                  {inventory.map(p => (
                    <option key={p.id} value={p.id}>{p.name} (Store: {p.warehouseStock})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-medium">Technician Van</label>
                <select
                  value={selectedTechId}
                  onChange={(e) => setSelectedTechId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                >
                  {technicians.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.vehiclePlate})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-medium">Direction</label>
                  <select
                    value={transferDirection}
                    onChange={(e) => setTransferDirection(e.target.value as any)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-slate-200 mt-1 font-mono text-[11px]"
                  >
                    <option value="warehouse_to_van">Store ➔ Van</option>
                    <option value="van_to_warehouse">Van ➔ Store</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={transferQty}
                    onChange={(e) => setTransferQty(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-slate-200 mt-1 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowTransferModal(false)}
                className="flex-1 py-1.5 bg-slate-800 text-slate-300 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  transferVanStock(selectedPartId, selectedTechId, transferQty, transferDirection);
                  setShowTransferModal(false);
                }}
                className="flex-1 py-1.5 bg-cyan-600 text-white rounded font-bold cursor-pointer"
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Part to Store Modal */}
      {showAddPartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-md p-5 space-y-4 text-xs shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Package className="w-4 h-4 text-cyan-400" />
              <span>Add New Part SKU to Central Store</span>
            </h2>

            <form onSubmit={handleAddPart} className="space-y-3">
              <div>
                <label className="text-slate-300 font-medium">Part Description / Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ABB 63A DC Isolator Breaker"
                  value={partName}
                  onChange={(e) => setPartName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium">SKU Code</label>
                  <input
                    type="text"
                    required
                    value={partSku}
                    onChange={(e) => setPartSku(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Category</label>
                  <select
                    value={partCategory}
                    onChange={(e) => setPartCategory(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 mt-1"
                  >
                    <option value="Solar & Inverter">Solar & Inverter</option>
                    <option value="HVAC & Chiller">HVAC & Chiller</option>
                    <option value="ISP & Fiber Network">ISP & Fiber Network</option>
                    <option value="CCTV & Access Control">CCTV & Access Control</option>
                    <option value="Power Generators">Power Generators</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium">Unit Cost (KSh)</label>
                  <input
                    type="number"
                    required
                    value={partCostPrice}
                    onChange={(e) => setPartCostPrice(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Unit Sell Price (KSh)</label>
                  <input
                    type="number"
                    required
                    value={partSellPrice}
                    onChange={(e) => setPartSellPrice(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-medium">Initial Store Stock</label>
                  <input
                    type="number"
                    required
                    value={partWarehouseStock}
                    onChange={(e) => setPartWarehouseStock(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-medium">Reorder Threshold</label>
                  <input
                    type="number"
                    required
                    value={partMinThreshold}
                    onChange={(e) => setPartMinThreshold(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 font-mono mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddPartModal(false)}
                  className="flex-1 py-2 bg-slate-800 text-slate-300 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold cursor-pointer"
                >
                  Save Part to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
