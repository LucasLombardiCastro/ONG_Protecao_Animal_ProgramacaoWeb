import axios, { AxiosError } from 'axios';
import { sessionStorage } from '../utils/api';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const sessao = sessionStorage.get();
  if (sessao?.token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${sessao.token}`;
  }
  return config;
});

interface BackendErrorBody { mensagem?: string }

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<BackendErrorBody>) => {
    const ehLogin = Boolean(error.config?.url?.includes('/auth/login'));
    if (error.response?.status === 401 && !ehLogin) {
      sessionStorage.clear();
      if (typeof window !== 'undefined') window.location.href = '/authentication/login';
    }
    const mensagem = error.response?.data?.mensagem || 'Erro de conexão com o servidor. Tente novamente.';
    return Promise.reject(new Error(mensagem));
  }
);

export default api;
