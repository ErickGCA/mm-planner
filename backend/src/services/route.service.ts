import { prisma } from '../config/database';

export type RouteCreationData = {
  name: string;
  description?: string;
};

export type RouteStopInput = {
  destinationId: string;
  order: number;
};

export const routeService = {
  create: async (data: RouteCreationData, userId: string) => {
    return await prisma.route.create({
      data: {
        name: data.name,
        description: data.description,
        userId
      }
    });
  },

  getAll: async (userId: string) => {
    return await prisma.route.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { stops: { include: { destination: true }, orderBy: { order: 'asc' } } }
    });
  },

  getById: async (id: string, userId: string) => {
    const route = await prisma.route.findFirst({
      where: { id, userId },
      include: { stops: { include: { destination: true }, orderBy: { order: 'asc' } } }
    });
    if (!route) throw new Error('Route not found');
    return route;
  },

  update: async (id: string, data: Partial<RouteCreationData>, userId: string) => {
    const route = await prisma.route.findFirst({ where: { id, userId } });
    if (!route) throw new Error('Route not found');
    return await prisma.route.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description
      }
    });
  },

  delete: async (id: string, userId: string) => {
    const route = await prisma.route.findFirst({ where: { id, userId } });
    if (!route) throw new Error('Route not found');
    await prisma.route.delete({ where: { id } });
    return { message: 'Route deleted successfully' };
  },

  addStops: async (routeId: string, stops: RouteStopInput[], userId: string) => {
    const route = await prisma.route.findFirst({ where: { id: routeId, userId } });
    if (!route) throw new Error('Route not found');
    await prisma.routeStop.deleteMany({ where: { routeId } });
    const createdStops = await prisma.routeStop.createMany({
      data: stops.map(stop => ({
        routeId,
        destinationId: stop.destinationId,
        order: stop.order
      })),
      skipDuplicates: true
    });
    return createdStops;
  },

  removeStop: async (routeId: string, destinationId: string, userId: string) => {
    const route = await prisma.route.findFirst({ where: { id: routeId, userId } });
    if (!route) throw new Error('Route not found');
    await prisma.routeStop.delete({ where: { routeId_destinationId: { routeId, destinationId } } });
    return { message: 'Stop removed successfully' };
  },

  reorderStops: async (routeId: string, stops: RouteStopInput[], userId: string) => {
    const route = await prisma.route.findFirst({ where: { id: routeId, userId } });
    if (!route) throw new Error('Route not found');
    for (const stop of stops) {
      await prisma.routeStop.update({
        where: { routeId_destinationId: { routeId, destinationId: stop.destinationId } },
        data: { order: stop.order }
      });
    }
    return { message: 'Stops reordered successfully' };
  }
}; 