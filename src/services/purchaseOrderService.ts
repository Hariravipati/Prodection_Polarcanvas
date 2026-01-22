import { apiClient } from './apiClient';
import { PurchaseOrderData } from '@/types/@types.PurchaseOrderData';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';


export const purchaseOrderService = {
  createPurchaseOrder: (data: PurchaseOrderData) => {
    return apiClient.post(`${API_BASE}/purchase-orders`, data);
  },

  getPurchaseOrders: (params?: any) => {
    return apiClient.get(`${API_BASE}/purchase-orders`, params);
  },

  getPurchaseOrderById: (id: string) => {
    return apiClient.get(`${API_BASE}/purchase-orders/${id}`);
  },

  updatePurchaseOrder: (id: string, data: PurchaseOrderData) => {
    return apiClient.put(`${API_BASE}/purchase-orders/${id}`, data);
  },

  deletePurchaseOrder: (id: string) => {
    return apiClient.delete(`${API_BASE}/purchase-orders/${id}`);
  },
};