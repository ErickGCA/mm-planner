import { Request, Response, RequestHandler } from 'express';
import { userService } from '../services/user.service';
import { sanitizeInput } from '../utils/validators';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export const authController = {
  register: (async (req: Request, res: Response) => {
    try {

      const sanitizedData = sanitizeInput(req.body);
      
      const newUser = await userService.create(sanitizedData);
      res.status(201).json(newUser);
    } catch (error: any) {
      if (error.message === 'Email already in use.') {
        res.status(409).json({ message: error.message });
        return;
      }
      
      console.error('Register error:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler,

  login: (async (req: Request, res: Response) => {
    try {
      const { email, password } = sanitizeInput(req.body);

      const user = await userService.findByEmail(email);
      if (!user) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Credenciais inválidas' });
        return;
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      const { password: _, ...userWithoutPassword } = user;

      res.status(200).json({ user: userWithoutPassword, token });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }) as RequestHandler,

  validate: (async (req: Request, res: Response) => {
    try {
      res.status(200).json({ message: 'Token válido' });
    } catch (error: any) {
      console.error('Token validation error:', error);
      res.status(401).json({ message: 'Token inválido' });
    }
  }) as RequestHandler,
};