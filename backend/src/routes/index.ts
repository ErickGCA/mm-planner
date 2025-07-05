import { Router } from 'express';
import authRouter from './auth.routes';
import destinationsRouter from './destinations.routes';
import routeRouter from './route.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/destinations', destinationsRouter);
router.use('/routes', routeRouter);

export default router;