import axios, { AxiosError } from 'axios';
import { sessionStorage } from '../utils/api';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
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

// flag: se já está fazendo refresh, se falhar, não tenta novavemte para não entrar em loop
let ehRefresh = false;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<BackendErrorBody>) => {
    const urlOriginal = error.config?.url ?? '';
    const ehAuth = urlOriginal.includes('/auth/login') || urlOriginal.includes('/auth/refresh');

    if (error.response?.status === 401 && !ehRefresh && !ehAuth) {
      ehRefresh = true;

      try {
        
        // Tenta fazer o refresh
        const { data } = await axios.get<{ token: string }>('/api/auth/refresh', { withCredentials: true });
        const token = data.token;
        
        // Salva o novo token
        const sessaoAtual = sessionStorage.get();
        if (sessaoAtual) {
          sessionStorage.set({ ...sessaoAtual, token });
        }

        // Repete a requisição atual com o novo token
        if (error.config) {
          error.config.headers = error.config.headers ?? {};
          error.config.headers.Authorization = `Bearer ${token}`;
          ehRefresh = false;
          return api.request(error.config);
        }
      } catch {
        // Refresh falhou, desloga
        ehRefresh = false;
        sessionStorage.clear();
        if (typeof window !== undefined) {
          window.location.href = '/authentication/login';
        }
      }
    }
    const mensagem = error.response?.data?.mensagem || 'Erro de conexão com o servidor. Tente novamente.';
    return Promise.reject(new Error(mensagem));
  }
);

export default api;
