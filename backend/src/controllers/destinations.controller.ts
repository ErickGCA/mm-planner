import { Request, Response, RequestHandler } from 'express';
import { destinationsService } from '../services/destinations.service';
import { sanitizeInput } from '../utils/validators';

export const destinationsController = {
  create: (async (req: Request, res: Response) => {
    try {
      // Sanitizar dados de entrada
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
  }) as RequestHandler
};
