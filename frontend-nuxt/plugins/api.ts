import axios from 'axios';
import Cookies from 'js-cookie';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: useRuntimeConfig().public.apiBase
  });

  api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  return {
    provide: {
      api: {
        getProducts: () => api.get('/products'),
        getProduct: (id: number) => api.get(`/products/${id}`),
        createOrder: (orderData: any) => api.post('/orders', orderData),
        login: (credentials: { email: string; password: string }) => api.post('/accounts/login', credentials),
        register: (accountData: { email: string; password: string }) => api.post('/accounts/register', accountData),
        updateRole: (id: number, role: string) => api.put(`/accounts/${id}/role`, { role }),
        getCurrentUser: () => api.get('/accounts/me')
      }
    }
  };
});