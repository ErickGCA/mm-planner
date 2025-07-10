import { api } from '../lib/api';

export interface Destination {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RouteStop {
  id: string;
  order: number;
  routeId: string;
  destinationId: string;
  destination: Destination;
  createdAt: string;
}

export interface Route {
  id: string;
  name: string;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  stops: RouteStop[];
}

export interface RouteCreationData {
  name: string;
  description?: string;
}

export interface RouteUpdateData {
  name?: string;
  description?: string;
}

export interface RouteStopInput {
  destinationId: string;
  order: number;
}

export interface RouteLeg {
  distance: string;
  duration: string;
  encodedPolyline: string;
}

export interface RouteCalculationResult {
  totalDistance: string;
  totalDuration: string;
  legs: RouteLeg[];
}

export const routeService = {
  async createRoute(data: RouteCreationData): Promise<Route> {
    try {
      const response = await api.post<Route>('/routes', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao criar rota.');
    }
  },

  async getAllRoutes(): Promise<Route[]> {
    try {
      const response = await api.get<Route[]>('/routes');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar rotas.');
    }
  },

  async getRouteById(id: string): Promise<Route> {
    try {
      const response = await api.get<Route>(`/routes/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar rota por ID.');
    }
  },

  async updateRoute(id: string, data: RouteUpdateData): Promise<Route> {
    try {
      const response = await api.put<Route>(`/routes/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar rota.');
    }
  },

  async deleteRoute(id: string): Promise<{ message: string }> {
    try {
      const response = await api.delete<{ message: string }>(`/routes/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar rota.');
    }
  },

  async addStopsToRoute(routeId: string, stops: RouteStopInput[]): Promise<any> {
    try {
      const response = await api.post(`/routes/${routeId}/stops`, { stops });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao adicionar paradas na rota.');
    }
  },

  async reorderRouteStops(routeId: string, stops: RouteStopInput[]): Promise<any> {
    try {
      const response = await api.patch(`/routes/${routeId}/stops/reorder`, { stops });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao reordenar paradas na rota.');
    }
  },

  async removeRouteStop(routeId: string, destinationId: string): Promise<{ message: string }> {
    try {
      const response = await api.delete<{ message: string }>(`/routes/${routeId}/stops/${destinationId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao remover parada da rota.');
    }
  },

  async calculateRoute(routeId: string): Promise<RouteCalculationResult> {
    try {
      const response = await api.get<RouteCalculationResult>(`/routes/${routeId}/distance`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Erro ao calcular rota.');
    }
  },
};