import { Router } from 'express';
import { routeController } from '../controllers/route.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const routeRouter = Router();

routeRouter.use(authMiddleware);

routeRouter.post('/', routeController.create);
routeRouter.get('/', routeController.getAll);
routeRouter.get('/:id', routeController.getById);
routeRouter.put('/:id', routeController.update);
routeRouter.delete('/:id', routeController.delete);

routeRouter.post('/:id/stops', routeController.addStops);
routeRouter.delete('/:id/stops/:destinationId', routeController.removeStop);
routeRouter.patch('/:id/stops/reorder', routeController.reorderStops);

export default routeRouter; 