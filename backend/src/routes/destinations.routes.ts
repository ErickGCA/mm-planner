import { Router } from 'express';
import { destinationsController } from '../controllers/destinations.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate, destinationSchema, destinationUpdateSchema } from '../utils/validators';

const destinationsRouter = Router();

destinationsRouter.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Destinations
 *   description: Endpoints para gerenciar destinos de viagem
 */

/**
 * @swagger
 * /api/destinations:
 *   post:
 *     summary: Cria um novo destino
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - latitude
 *               - longitude
 *             properties:
 *               name:
 *                 type: string
 *                 example: São Paulo
 *               latitude:
 *                 type: number
 *                 example: -23.5505
 *               longitude:
 *                 type: number
 *                 example: -46.6333
 *     responses:
 *       201:
 *         description: Destino criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *
 *   get:
 *     summary: Lista todos os destinos do usuário
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de destinos
 *       401:
 *         description: Não autorizado
 */

destinationsRouter.post('/', validate(destinationSchema), destinationsController.create);
destinationsRouter.get('/', destinationsController.getAll);
destinationsRouter.get('/:id', destinationsController.getById);
destinationsRouter.put('/:id', validate(destinationUpdateSchema), destinationsController.update);
destinationsRouter.delete('/:id', destinationsController.delete);

/**
 * @swagger
 * /api/destinations/{id}:
 *   get:
 *     summary: Busca um destino pelo ID
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do destino
 *     responses:
 *       200:
 *         description: Destino encontrado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Destino não encontrado
 *
 *   put:
 *     summary: Atualiza um destino pelo ID
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do destino
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: São Paulo
 *               latitude:
 *                 type: number
 *                 example: -23.5505
 *               longitude:
 *                 type: number
 *                 example: -46.6333
 *     responses:
 *       200:
 *         description: Destino atualizado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Destino não encontrado
 *
 *   delete:
 *     summary: Remove um destino pelo ID
 *     tags: [Destinations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do destino
 *     responses:
 *       200:
 *         description: Destino removido
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Destino não encontrado
 */

export default destinationsRouter;