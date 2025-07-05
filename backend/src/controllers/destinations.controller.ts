import { Request, Response, RequestHandler } from 'express';
import { destinationsService } from '../services/destinations.service';
import { sanitizeInput } from '../utils/validators';

export const destinationsController = {
  create: (async (req: Request, res: Response) => {
    try {
      const sanitizedData = sanitizeInput(req.body);
      
      const destination = await destinationsService.create(sanitizedData, req.user?.id);
      res.status(201).json(destination);
    } catch (error: any) {
      console.error('Create destination error:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler,

  getAll: (async (req: Request, res: Response) => {
    try {
      const destinations = await destinationsService.getAll(req.user?.id);
      res.status(200).json(destinations);
    } catch (error: any) {
      console.error('Get destinations error:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler,

  getById: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const destination = await destinationsService.getById(id, req.user?.id);
      res.status(200).json(destination);
    } catch (error: any) {
      if (error.message === 'Destination not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      console.error('Get destination by id error:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler,

  update: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const sanitizedData = sanitizeInput(req.body);
      
      const destination = await destinationsService.update(id, sanitizedData, req.user?.id);
      res.status(200).json(destination);
    } catch (error: any) {
      if (error.message === 'Destination not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      console.error('Update destination error:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler,

  delete: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await destinationsService.delete(id, req.user?.id);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Destination not found') {
        res.status(404).json({ message: error.message });
        return;
      }
      console.error('Delete destination error:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler
};
