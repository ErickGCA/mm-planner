import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validate, registerSchema, loginSchema } from '../utils/validators';

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), authController.register);
authRouter.post('/login', validate(loginSchema), authController.login);

export default authRouter;