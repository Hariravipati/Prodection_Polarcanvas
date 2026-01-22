import React, { useState } from "react";
import { PurchaseItem } from "@/types/@types.PurchaseOrderData";
import { purchaseOrderService } from "@/services/purchaseOrderService";


export default function CreatePurchaseOrder() {
  const [formData, setFormData] = useState({
    supplierId: "",
    supplierName: "",
    contactNo: "",
    address: "",
    state: "",
    poNumber: "",
    date: "",
    productGroup: "",
    itemName: "",
    millName: "",
    unit: "",
    hsnCode: "",
    gstPercent: "",
    currentStock: "",
    size: "",
    color: "",
    gsm: "",
    bf: "",
    rate: "0",
    qty: "1",
    taxableAmt: "0",
    taxAmount: "",
    totalAmount: "",
    paymentDueOn: "50",
    deliveryDate: "",
    article: "",
    narration: "",
    totalQty: "0",
    freightRate: "0",
    freightAmt: "0",
    fGstPercent: "0",
    fGstAmt: "0",
    taxableAmt2: "0",
    taxAmt: "0",
    totalAmt: "0",
    termCondition: "TC 1"
  });

  const [itemsList, setItemsList] = useState<PurchaseItem[]>([]);

  const [suppliers] = useState([
    { id: "1", name: "ABC Suppliers", contact: "9876543210", address: "123 Main St", state: "Gujarat" },
    { id: "2", name: "XYZ Trading", contact: "9876543211", address: "456 Park Ave", state: "Maharashtra" },
    { id: "new", name: "Add New Supplier", contact: "", address: "", state: "" }
  ]);

  const handleSupplierChange = (supplierId: string) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (supplier && supplier.id !== "new") {
      setFormData({
        ...formData,
        supplierId,
        supplierName: supplier.name,
        contactNo: supplier.contact,
        address: supplier.address,
        state: supplier.state
      });
    } else {
      setFormData({
        ...formData,
        supplierId: "new",
        supplierName: "",
        contactNo: "",
        address: "",
        state: ""
      });
    }
  };
  const [currentItem, setCurrentItem] = useState<PurchaseItem>({
    slNo: "",
    itemNo: "",
    size: "",
    gsm: "",
    bf: "",
    color: "",
    unit: "",
    quantity: "",
    rate: "",
    delivery: "",
    gstPercent: "",
    gstAmt: "",
    amount: "",
    supplier: "",
    article: ""
  });

  const handleAdd = () => {
    if (currentItem.itemNo) {
      setItemsList([...itemsList, { ...currentItem, slNo: (itemsList.length + 1).toString() }]);
      setCurrentItem({
        slNo: "", itemNo: "", size: "", gsm: "", bf: "", color: "", unit: "",
        quantity: "", rate: "", delivery: "", gstPercent: "", gstAmt: "", amount: "", supplier: "", article: ""
      });
    }
  };

  const handleRemove = () => {
    if (itemsList.length > 0) {
      setItemsList(itemsList.slice(0, -1));
    }
  };

  const handleSave = async () => {
    try {
      const payload = { ...formData, itemsList };
      const response = await purchaseOrderService.createPurchaseOrder(payload);
      console.log("Purchase Order saved:", response);
      alert("Purchase Order created successfully!");
      resetAll();
    } catch (error) {
      console.error("Error saving purchase order:", error);
      alert("Failed to save purchase order: " + error.message);
    }
  };

  const resetAll = () => {
    setFormData({
      supplierId: "", supplierName: "", contactNo: "", address: "", state: "", poNumber: "", date: "",
      productGroup: "", itemName: "", millName: "", unit: "", hsnCode: "", gstPercent: "",
      currentStock: "", size: "", color: "", gsm: "", bf: "", rate: "0", qty: "1",
      taxableAmt: "0", taxAmount: "", totalAmount: "", paymentDueOn: "50", deliveryDate: "",
      article: "", narration: "", totalQty: "0", freightRate: "0", freightAmt: "0",
      fGstPercent: "0", fGstAmt: "0", taxableAmt2: "0", taxAmt: "0", totalAmt: "0", termCondition: "TC 1"
    });
    setItemsList([]);
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-lg sm:text-2xl font-bold text-blue-600">Purchase Order</h1>
          <button onClick={resetAll} className="px-3 py-1 text-xs sm:text-sm text-red-600 font-semibold rounded hover:bg-red-50" title="Refresh">↻</button>
        </div>

        <form className="grid grid-cols-1 gap-4 sm:gap-6">
          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xs sm:text-lg font-semibold text-gray-800 mb-3">Supplier Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Select Supplier</label>
                <select value={formData.supplierId} onChange={(e) => handleSupplierChange(e.target.value)} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="">Select Supplier</option>
                  {suppliers.map(supplier => (
                    <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Supplier Name</label>
                <input type="text" value={formData.supplierName} onChange={(e) => setFormData({...formData, supplierName: e.target.value})} disabled={formData.supplierId !== "new" && formData.supplierId !== ""} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Contact No.</label>
                <input type="text" value={formData.contactNo} onChange={(e) => setFormData({...formData, contactNo: e.target.value})} disabled={formData.supplierId !== "new" && formData.supplierId !== ""} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100" />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs text-gray-700">Address</label>
                <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} disabled={formData.supplierId !== "new" && formData.supplierId !== ""} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">State</label>
                <input type="text" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} disabled={formData.supplierId !== "new" && formData.supplierId !== ""} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">PO Number</label>
                <input type="text" value={formData.poNumber} onChange={(e) => setFormData({...formData, poNumber: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Date</label>
                <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xs sm:text-lg font-semibold text-gray-800 mb-3">Product Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Product Group</label>
                <input type="text" value={formData.productGroup} onChange={(e) => setFormData({...formData, productGroup: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Item Name</label>
                <input type="text" value={formData.itemName} onChange={(e) => setFormData({...formData, itemName: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Mill Name</label>
                <input type="text" value={formData.millName} onChange={(e) => setFormData({...formData, millName: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Unit</label>
                <input type="text" value={formData.unit} onChange={(e) => setFormData({...formData, unit: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">HSN Code</label>
                <input type="text" value={formData.hsnCode} onChange={(e) => setFormData({...formData, hsnCode: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">GST %</label>
                <input type="text" value={formData.gstPercent} onChange={(e) => setFormData({...formData, gstPercent: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Current Stock</label>
                <input type="text" value={formData.currentStock} onChange={(e) => setFormData({...formData, currentStock: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-8 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Size</label>
                <input type="text" value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Color</label>
                <input type="text" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">GSM</label>
                <input type="text" value={formData.gsm} onChange={(e) => setFormData({...formData, gsm: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">BF</label>
                <input type="text" value={formData.bf} onChange={(e) => setFormData({...formData, bf: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Rate</label>
                <input type="text" value={formData.rate} onChange={(e) => setFormData({...formData, rate: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">QTY</label>
                <input type="text" value={formData.qty} onChange={(e) => setFormData({...formData, qty: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Taxable Amt</label>
                <input type="text" value={formData.taxableAmt} onChange={(e) => setFormData({...formData, taxableAmt: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Tax Amount</label>
                <input type="text" value={formData.taxAmount} onChange={(e) => setFormData({...formData, taxAmount: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Total Amount</label>
                <input type="text" value={formData.totalAmount} onChange={(e) => setFormData({...formData, totalAmount: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Payment Due On</label>
                <input type="text" value={formData.paymentDueOn} onChange={(e) => setFormData({...formData, paymentDueOn: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Delivery Date</label>
                <input type="date" value={formData.deliveryDate} onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-700">Article</label>
                <input type="text" value={formData.article} onChange={(e) => setFormData({...formData, article: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button type="button" onClick={handleAdd} className="px-4 py-2 text-xs bg-green-600 text-white rounded hover:bg-green-700">Add</button>
              <button type="button" onClick={handleRemove} className="px-4 py-2 text-xs bg-red-600 text-white rounded hover:bg-red-700">Remove</button>
            </div>
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xs sm:text-lg font-semibold text-gray-800 mb-3">Items List</h2>
            <div className="bg-gray-50 border rounded p-2 min-h-[150px] overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-gray-100">
                    <th className="text-left p-2">Sl No</th>
                    <th className="text-left p-2">Item No.</th>
                    <th className="text-left p-2">Size</th>
                    <th className="text-left p-2">GSM</th>
                    <th className="text-left p-2">BF</th>
                    <th className="text-left p-2">Color</th>
                    <th className="text-left p-2">Unit</th>
                    <th className="text-left p-2">Quantity</th>
                    <th className="text-left p-2">Rate</th>
                    <th className="text-left p-2">Delivery</th>
                    <th className="text-left p-2">GST %</th>
                    <th className="text-left p-2">GST Amt</th>
                    <th className="text-left p-2">Amount</th>
                    <th className="text-left p-2">Supplier</th>
                    <th className="text-left p-2">Article</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsList.map((item, idx) => (
                    <tr key={idx} className="border-b hover:bg-gray-50">
                      <td className="p-2">{item.slNo}</td>
                      <td className="p-2">{item.itemNo}</td>
                      <td className="p-2">{item.size}</td>
                      <td className="p-2">{item.gsm}</td>
                      <td className="p-2">{item.bf}</td>
                      <td className="p-2">{item.color}</td>
                      <td className="p-2">{item.unit}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">{item.rate}</td>
                      <td className="p-2">{item.delivery}</td>
                      <td className="p-2">{item.gstPercent}</td>
                      <td className="p-2">{item.gstAmt}</td>
                      <td className="p-2">{item.amount}</td>
                      <td className="p-2">{item.supplier}</td>
                      <td className="p-2">{item.article}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xs sm:text-lg font-semibold text-gray-800 mb-3">Additional Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-700">Narration</label>
                  <textarea value={formData.narration} onChange={(e) => setFormData({...formData, narration: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 h-20" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-700">Freight Rate</label>
                    <input type="text" value={formData.freightRate} onChange={(e) => setFormData({...formData, freightRate: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-700">Freight Amt</label>
                    <input type="text" value={formData.freightAmt} onChange={(e) => setFormData({...formData, freightAmt: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-700">Term & Condition</label>
                  <select value={formData.termCondition} onChange={(e) => setFormData({...formData, termCondition: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="TC 1">TC 1</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-700">Total Qty</label>
                    <input type="text" value={formData.totalQty} onChange={(e) => setFormData({...formData, totalQty: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-700">F. GST %</label>
                    <select value={formData.fGstPercent} onChange={(e) => setFormData({...formData, fGstPercent: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option value="0">0</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-700">F. GST Amt</label>
                    <input type="text" value={formData.fGstAmt} onChange={(e) => setFormData({...formData, fGstAmt: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-700">Taxable Amt</label>
                    <input type="text" value={formData.taxableAmt2} onChange={(e) => setFormData({...formData, taxableAmt2: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-700">Tax Amt</label>
                    <input type="text" value={formData.taxAmt} onChange={(e) => setFormData({...formData, taxAmt: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-700">Total Amt</label>
                    <input type="text" value={formData.totalAmt} onChange={(e) => setFormData({...formData, totalAmt: e.target.value})} className="px-2 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center gap-3 pt-2">
            <button type="button" onClick={handleSave} className="px-6 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
            <button type="button" onClick={resetAll} className="px-6 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}