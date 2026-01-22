import { apiClient }  from "./apiClient"

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
import { ArticleData } from '@/types/@types.ArticleData';


export const articleService = {
  createArticle: (data: ArticleData) => {
    return apiClient.post(`${API_BASE}/articles`, data);
  },

  getArticles: (params?: any) => {
    return apiClient.get(`${API_BASE}/articles`, params);
  },

  getArticleById: (id: string) => {
    return apiClient.get(`${API_BASE}/articles/${id}`);
  },

  updateArticle: (id: string, data: ArticleData) => {
    return apiClient.put(`${API_BASE}/articles/${id}`, data);
  },

  deleteArticle: (id: string) => {
    return apiClient.delete(`${API_BASE}/articles/${id}`);
  },
};
