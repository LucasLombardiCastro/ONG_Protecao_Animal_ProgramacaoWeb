import api from '../lib/axios';

export interface AuthUser { id: number; nome: string; email: string; }
export interface LoginResponse { usuario: AuthUser; token: string; }

export const authService = {
  async login(email: string, senha: string): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', { email, senha });
    return data;
  },
};