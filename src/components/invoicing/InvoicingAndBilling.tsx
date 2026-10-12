import React, { useState } from 'react';
import { useFielys } from '../../context/FielysContext';
import { Invoice } from '../../types';
import { CreditCard, DollarSign, CheckCircle2, Phone, ArrowUpRight, TrendingUp, AlertCircle, FileText } from 'lucide-react';

export const InvoicingAndBilling: React.FC = () => {
  const { invoices, processMpesaPayment } = useFielys();

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(invoices[0] || null);
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+254 722 100 200');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mpesaReceipt, setMpesaReceipt] = useState<string | null>(null);

  const totalBilled = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaid = invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.amountPaid, 0);
  const totalOutstanding = totalBilled - totalPaid;

  const handlePayMpesa = async () => {
    if (!selectedInvoice) return;
    setIsProcessing(true);
    const result = await processMpesaPayment(selectedInvoice.id, phoneNumber, selectedInvoice.total);
    setIsProcessing(false);
    if (result.success) {
      setMpesaReceipt(result.ref);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Billing, Invoicing & Field Payments</span>
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              M-PESA DARAJA & TRUE PROFITABILITY
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Turn completed work orders into immediate cash flow with mobile money STK pushes and contract zero-rating.
          </p>
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Today's Revenue Collected</span>
          <div className="text-xl font-mono font-bold text-emerald-400">
            KSh {totalPaid.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 font-mono">100% Real-time field reconciliation</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Outstanding Invoiced</span>
          <div className="text-xl font-mono font-bold text-amber-400">
            KSh {totalOutstanding.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Net 14-30 days credit terms</span>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Average Gross Job Margin</span>
          <div className="text-xl font-mono font-bold text-cyan-400">
            41.2%
          </div>
          <span className="text-[10px] text-slate-500 font-mono">After labor, parts & mileage allocation</span>
        </div>
      </div>

      {/* Main Table & Profitability Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoice List (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">INVOICE & WO#</th>
                <th className="py-3 px-4">CUSTOMER & SITE</th>
                <th className="py-3 px-4">TOTAL</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {invoices.map(inv => {
                const isSelected = selectedInvoice?.id === inv.id;
                return (
                  <tr 
                    key={inv.id} 
                    onClick={() => setSelectedInvoice(inv)}
                    className={`cursor-pointer transition-colors ${isSelected ? 'bg-cyan-950/40' : 'hover:bg-slate-800/30'}`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-white font-mono">{inv.invoiceNumber}</div>
                      <div className="text-[10px] font-mono text-cyan-400">{inv.orderNumber}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-200">{inv.customerName}</div>
                      <div className="text-[11px] text-slate-400">{inv.siteName}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      KSh {inv.total.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                        inv.status === 'paid' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        inv.status === 'draft' ? 'bg-slate-800 text-slate-300' : 'bg-amber-950 text-amber-300'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {inv.status !== 'paid' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInvoice(inv);
                            setShowMpesaModal(true);
                          }}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-mono font-semibold cursor-pointer shadow-sm"
                        >
                          M-Pesa STK
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400">
                          {inv.paymentReference || 'Settled'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Invoice Details & Profitability Breakdown (1 Col) */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
          {selectedInvoice ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-white font-mono">{selectedInvoice.invoiceNumber}</h3>
                  <span className="text-xs text-slate-400">{selectedInvoice.customerName}</span>
                </div>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                  selectedInvoice.status === 'paid' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-300'
                }`}>
                  {selectedInvoice.status}
                </span>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">Line Items</span>
                <div className="divide-y divide-slate-800">
                  {selectedInvoice.items.map((item, idx) => (
                    <div key={idx} className="py-1.5 flex items-center justify-between">
                      <span className="text-slate-300 truncate max-w-[200px]">{item.description}</span>
                      <span className="font-mono text-slate-200">KSh {item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="pt-2 border-t border-slate-800 space-y-1 font-mono text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span>KSh {selectedInvoice.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>VAT (16%):</span>
                  <span>KSh {selectedInvoice.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white font-bold pt-1 border-t border-slate-800 text-sm">
                  <span>Total Amount:</span>
                  <span className="text-cyan-400">KSh {selectedInvoice.total.toLocaleString()}</span>
                </div>
              </div>

              {/* True Job Profitability Calculator */}
              {selectedInvoice.jobProfitability && (
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>True Job Profitability</span>
                    </span>
                    <span className="text-emerald-400 font-mono">
                      {selectedInvoice.jobProfitability.marginPercentage}% Margin
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Billed Revenue:</span>
                      <span className="text-slate-200">KSh {selectedInvoice.jobProfitability.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-rose-400">
                      <span>Direct Tech Labor:</span>
                      <span>- KSh {selectedInvoice.jobProfitability.laborCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-rose-400">
                      <span>Parts Cost:</span>
                      <span>- KSh {selectedInvoice.jobProfitability.partsCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-rose-400">
                      <span>Travel & Mileage:</span>
                      <span>- KSh {selectedInvoice.jobProfitability.travelCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-slate-800">
                      <span>Net Cash Margin:</span>
                      <span>KSh {selectedInvoice.jobProfitability.netMargin.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* M-Pesa STK Trigger Button */}
              {selectedInvoice.status !== 'paid' && (
                <button
                  onClick={() => setShowMpesaModal(true)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Send M-Pesa STK Push to Client</span>
                </button>
              )}
            </>
          ) : (
            <div className="text-center text-slate-500 text-xs py-8">
              Select an invoice to inspect line items and profitability.
            </div>
          )}
        </div>
      </div>

      {/* M-Pesa STK Push Modal */}
      {showMpesaModal && selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-sm p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">M-Pesa STK Push</h3>
                  <span className="text-[10px] font-mono text-slate-400">Daraja 2.0 Integration</span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                KSh {selectedInvoice.total.toLocaleString()}
              </span>
            </div>

            {!mpesaReceipt ? (
              <div className="space-y-3">
                <p className="text-slate-300">
                  Trigger an instantaneous PIN prompt on the customer's phone for immediate settlement.
                </p>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Customer Phone Number</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    disabled={isProcessing}
                    onClick={() => setShowMpesaModal(false)}
                    className="flex-1 py-2 bg-slate-800 text-slate-300 rounded cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isProcessing}
                    onClick={handlePayMpesa}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded font-bold cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {isProcessing ? 'Triggering STK...' : 'Send STK Prompt'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-4 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Payment Confirmed!</h4>
                  <p className="font-mono text-emerald-400 text-xs font-semibold">Ref: {mpesaReceipt}</p>
                  <p className="text-[11px] text-slate-400">KSh {selectedInvoice.total.toLocaleString()} received via M-Pesa STK Push.</p>
                </div>
                <button
                  onClick={() => {
                    setShowMpesaModal(false);
                    setMpesaReceipt(null);
                  }}
                  className="w-full py-2 bg-slate-800 text-white rounded font-medium cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
