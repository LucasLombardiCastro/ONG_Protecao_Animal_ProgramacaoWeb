import api from '../lib/axios';
import { Animal } from '../types/domain';

export type AnimalPayload = Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>;

export const animalService = {
  async listAll(): Promise<Animal[]> {
    const { data } = await api.get<Animal[]>('/animais');
    return data;
  },
  async getById(id: string): Promise<Animal> {
    const { data } = await api.get<Animal>(`/animais/${id}`);
    return data;
  },
  async create(animal: AnimalPayload): Promise<Animal> {
    const { data } = await api.post<Animal>('/animais', animal);
    return data;
  },
  async update(id: string, animal: Partial<AnimalPayload>): Promise<Animal> {
    const { data } = await api.put<{ mensagem: string; animal: Animal }>(`/animais/${id}`, animal);
    return data.animal;
  },
  async remove(id: string): Promise<void> {
    await api.delete(`/animais/${id}`);
  },
};