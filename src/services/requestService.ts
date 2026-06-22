import api from '../lib/axios';
import { AdoptionRequest, Request, RequestStatus, VolunteerRequest } from '../types/domain';

export interface NovaSolicitacaoAdocao {
  nome: string; telefone: string; email?: string;
  animal_id?: string; animal_nome: string; animal_foto: string;
}
export interface NovaSolicitacaoVoluntario {
  nome: string; telefone: string; email?: string;
  disponibilidade: string; interesse: string;
}

export const requestService = {
  async listAll(): Promise<Request[]> {
    const { data } = await api.get<Request[]>('/requests');
    return data;
  },
  async createAdoption(payload: NovaSolicitacaoAdocao, data: string): Promise<AdoptionRequest> {
    const { data: criada } = await api.post<AdoptionRequest>('/requests', { tipo: 'adocao', data, ...payload });
    return criada;
  },
  async createVolunteer(payload: NovaSolicitacaoVoluntario, data: string): Promise<VolunteerRequest> {
    const { data: criada } = await api.post<VolunteerRequest>('/requests', { tipo: 'voluntario', data, ...payload });
    return criada;
  },
  async updateStatus(id: number, status: RequestStatus): Promise<void> {
    await api.put(`/requests/${id}`, { status });
  },
  async updateNotes(id: number, notas: string): Promise<void> {
    await api.put(`/requests/${id}`, { notas });
  },
};