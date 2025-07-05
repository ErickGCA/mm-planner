import { prisma } from '../config/database';

type DestinationCreationData = {
  name: string;
  latitude: number;
  longitude: number;
};

export const destinationsService = {
  create: async (data: DestinationCreationData, userId?: string) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    return await prisma.destination.create({
      data: {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
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
  },

  getById: async (id: string, userId?: string) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    const destination = await prisma.destination.findFirst({
      where: { id, userId }
    });
    
    if (!destination) {
      throw new Error('Destination not found');
    }
    
    return destination;
  },

  update: async (id: string, data: Partial<DestinationCreationData>, userId?: string) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    const destination = await prisma.destination.findFirst({
      where: { id, userId }
    });
    
    if (!destination) {
      throw new Error('Destination not found');
    }
    
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.latitude !== undefined) updateData.latitude = data.latitude;
    if (data.longitude !== undefined) updateData.longitude = data.longitude;
    
    return await prisma.destination.update({
      where: { id },
      data: updateData
    });
  },

  delete: async (id: string, userId?: string) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    
    const destination = await prisma.destination.findFirst({
      where: { id, userId }
    });
    
    if (!destination) {
      throw new Error('Destination not found');
    }
    
    await prisma.destination.delete({
      where: { id }
    });
    
    return { message: 'Destination deleted successfully' };
  }
}; 