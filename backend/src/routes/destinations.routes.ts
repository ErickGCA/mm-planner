import { Router } from 'express';
import { destinationsController } from '../controllers/destinations.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate, destinationSchema } from '../utils/validators';

const destinationsRouter = Router();

destinationsRouter.use(authMiddleware);

destinationsRouter.post('/', validate(destinationSchema), destinationsController.create);
destinationsRouter.get('/', destinationsController.getAll);

export default destinationsRouter;