import { Request, Response, RequestHandler } from 'express';
import { routeService } from '../services/route.service';
import { sanitizeInput } from '../utils/validators';

function getUserId(req: Request): string {
  if (!req.user?.id) throw new Error('Unauthorized');
  return req.user.id;
}

export const routeController = {
  create: (async (req: Request, res: Response) => {
    try {
      const sanitizedData = sanitizeInput(req.body);
      const userId = getUserId(req);
      const route = await routeService.create(sanitizedData, userId);
      res.status(201).json(route);
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler,

  getAll: (async (req: Request, res: Response) => {
    try {
      const userId = getUserId(req);
      const routes = await routeService.getAll(userId);
      res.status(200).json(routes);
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler,

  getById: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = getUserId(req);
      const route = await routeService.getById(id, userId);
      res.status(200).json(route);
    } catch (error: any) {
      if (error.message === 'Route not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message === 'Unauthorized') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler,

  update: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const sanitizedData = sanitizeInput(req.body);
      const userId = getUserId(req);
      const route = await routeService.update(id, sanitizedData, userId);
      res.status(200).json(route);
    } catch (error: any) {
      if (error.message === 'Route not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message === 'Unauthorized') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler,

  delete: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = getUserId(req);
      const result = await routeService.delete(id, userId);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Route not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message === 'Unauthorized') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler,

  addStops: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { stops } = sanitizeInput(req.body);
      const userId = getUserId(req);
      const result = await routeService.addStops(id, stops, userId);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Route not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message === 'Unauthorized') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler,

  removeStop: (async (req: Request, res: Response) => {
    try {
      const { id, destinationId } = req.params;
      const userId = getUserId(req);
      const result = await routeService.removeStop(id, destinationId, userId);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Route not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message === 'Unauthorized') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler,

  reorderStops: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { stops } = sanitizeInput(req.body);
      const userId = getUserId(req);
      const result = await routeService.reorderStops(id, stops, userId);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Route not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      if (error.message === 'Unauthorized') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler
}; 