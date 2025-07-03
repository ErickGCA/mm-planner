import { prisma } from '../config/database';

// Tipo para criação de destino
type DestinationCreationData = {
  name: string;
  description?: string;
  location: string;
  budget?: number;
  startDate?: string;
  endDate?: string;
};

export const destinationsService = {
  create: async (data: DestinationCreationData, userId?: string) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    return await prisma.destination.create({
      data: {
        name: data.name,
        description: data.description,
        location: data.location,
        budget: data.budget,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        userId
      }
    });
  },

  getAll: async (userId?: string) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    return await prisma.destination.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }
}; 