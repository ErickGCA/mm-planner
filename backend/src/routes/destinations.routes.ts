import { Router } from 'express';
import { destinationsController } from '../controllers/destinations.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate, destinationSchema, destinationUpdateSchema } from '../utils/validators';

const destinationsRouter = Router();

destinationsRouter.use(authMiddleware);

destinationsRouter.post('/', validate(destinationSchema), destinationsController.create);
destinationsRouter.get('/', destinationsController.getAll);
destinationsRouter.get('/:id', destinationsController.getById);
destinationsRouter.put('/:id', validate(destinationUpdateSchema), destinationsController.update);
destinationsRouter.delete('/:id', destinationsController.delete);

export default destinationsRouter;