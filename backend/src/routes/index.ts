import { Router } from 'express';
import authRouter from './auth.routes';
import destinationsRouter from './destinations.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/destinations', destinationsRouter);

export default router;