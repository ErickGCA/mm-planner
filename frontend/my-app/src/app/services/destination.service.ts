import { api } from '../lib/api';
import { Destination } from './route.service';

export interface DestinationCreationData {
  name: string;
  latitude: number;
  longitude: number;
}

export interface DestinationUpdateData {
  name?: string;
  latitude?: number;
  longitude?: number;
}

export const destinationService = {
  async createDestination(data: DestinationCreationData): Promise<Destination> {
    try {
      const response = await api.post<Destination>('/destinations', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao criar destino.');
    }
  },

  async getAllDestinations(): Promise<Destination[]> {
    try {
      const response = await api.get<Destination[]>('/destinations');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar destinos.');
    }
  },

  async getDestinationById(id: string): Promise<Destination> {
    try {
      const response = await api.get<Destination>(`/destinations/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar destino por ID.');
    }
  },

  async updateDestination(id: string, data: DestinationUpdateData): Promise<Destination> {
    try {
      const response = await api.put<Destination>(`/destinations/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar destino.');
    }
  },

  async deleteDestination(id: string): Promise<{ message: string }> {
    try {
      const response = await api.delete<{ message: string }>(`/destinations/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar destino.');
    }
  },
};