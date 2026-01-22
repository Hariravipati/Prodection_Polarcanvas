export interface PurchaseOrderData {
  supplierName: string;
  contactNo: string;
  address: string;
  state: string;
  poNumber: string;
  date: string;
  productGroup: string;
  itemName: string;
  millName: string;
  unit: string;
  hsnCode: string;
  gstPercent: string;
  currentStock: string;
  size: string;
  color: string;
  gsm: string;
  bf: string;
  rate: string;
  qty: string;
  taxableAmt: string;
  taxAmount: string;
  totalAmount: string;
  paymentDueOn: string;
  deliveryDate: string;
  article: string;
  narration: string;
  totalQty: string;
  freightRate: string;
  freightAmt: string;
  fGstPercent: string;
  fGstAmt: string;
  taxableAmt2: string;
  taxAmt: string;
  totalAmt: string;
  termCondition: string;
  itemsList?: any[];
}

export interface PurchaseItem {
  slNo: string;
  itemNo: string;
  size: string;
  gsm: string;
  bf: string;
  color: string;
  unit: string;
  quantity: string;
  rate: string;
  delivery: string;
  gstPercent: string;
  gstAmt: string;
  amount: string;
  supplier: string;
  article: string;
}

