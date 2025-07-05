/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: Endpoints para gerenciar rotas de viagem
 */

/**
 * @swagger
 * /api/routes:
 *   post:
 *     summary: Cria uma nova rota de viagem
 *     tags: [Routes]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Viagem para São Paulo"
 *               description:
 *                 type: string
 *                 example: "Rota turística pela capital paulista"
 *     responses:
 *       201:
 *         description: Rota criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *
 *   get:
 *     summary: Lista todas as rotas do usuário
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de rotas com seus destinos
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /api/routes/{id}:
 *   get:
 *     summary: Busca uma rota pelo ID
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da rota
 *     responses:
 *       200:
 *         description: Rota encontrada com destinos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Rota não encontrada
 *
 *   put:
 *     summary: Atualiza uma rota pelo ID
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da rota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Viagem para São Paulo"
 *               description:
 *                 type: string
 *                 example: "Rota turística pela capital paulista"
 *     responses:
 *       200:
 *         description: Rota atualizada
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Rota não encontrada
 *
 *   delete:
 *     summary: Remove uma rota pelo ID
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da rota
 *     responses:
 *       200:
 *         description: Rota removida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Rota não encontrada
 */

/**
 * @swagger
 * /api/routes/{id}/stops:
 *   post:
 *     summary: Adiciona vários destinos de uma vez à rota
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da rota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stops
 *             properties:
 *               stops:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - destinationId
 *                     - order
 *                   properties:
 *                     destinationId:
 *                       type: string
 *                       example: "uuid-do-destino"
 *                     order:
 *                       type: integer
 *                       example: 1
 *                 example:
 *                   - destinationId: "uuid-destino-1"
 *                     order: 1
 *                   - destinationId: "uuid-destino-2"
 *                     order: 2
 *     responses:
 *       200:
 *         description: Destinos adicionados à rota
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Rota não encontrada
 */

/**
 * @swagger
 * /api/routes/{id}/stops/{destinationId}:
 *   delete:
 *     summary: Remove um destino específico da rota
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da rota
 *       - in: path
 *         name: destinationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do destino a ser removido
 *     responses:
 *       200:
 *         description: Destino removido da rota
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Rota ou destino não encontrado
 */

/**
 * @swagger
 * /api/routes/{id}/stops/reorder:
 *   patch:
 *     summary: Reordena os destinos de uma rota
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da rota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - stops
 *             properties:
 *               stops:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - destinationId
 *                     - order
 *                   properties:
 *                     destinationId:
 *                       type: string
 *                       example: "uuid-do-destino"
 *                     order:
 *                       type: integer
 *                       example: 1
 *                 example:
 *                   - destinationId: "uuid-destino-2"
 *                     order: 1
 *                   - destinationId: "uuid-destino-1"
 *                     order: 2
 *     responses:
 *       200:
 *         description: Destinos reordenados
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Rota não encontrada
 */

/**
 * @swagger
 * /api/routes/{id}/distance:
 *   get:
 *     summary: Calcula distância e tempo total da rota
 *     tags: [Routes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da rota
 *     responses:
 *       200:
 *         description: Cálculo de distância e tempo da rota
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 routeId:
 *                   type: string
 *                 routeName:
 *                   type: string
 *                 totalDistance:
 *                   type: string
 *                   example: "150.5 km"
 *                 totalDuration:
 *                   type: string
 *                   example: "2h 30m"
 *                 totalDistanceValue:
 *                   type: number
 *                   example: 150500
 *                 totalDurationValue:
 *                   type: number
 *                   example: 9000
 *                 segments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       distance:
 *                         type: string
 *                       duration:
 *                         type: string
 *                       distanceValue:
 *                         type: number
 *                       durationValue:
 *                         type: number
 *       400:
 *         description: Rota deve ter pelo menos 2 destinos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Rota não encontrada
 *       500:
 *         description: Erro ao calcular distância (verificar API key do Google Maps)
 */

import { Router } from 'express';
import { routeController } from '../controllers/route.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
// (Opcional: importar validações se desejar)

const routeRouter = Router();

routeRouter.use(authMiddleware);

// CRUD de rotas
routeRouter.post('/', routeController.create);
routeRouter.get('/', routeController.getAll);
routeRouter.get('/:id', routeController.getById);
routeRouter.put('/:id', routeController.update);
routeRouter.delete('/:id', routeController.delete);

// RouteStops
routeRouter.post('/:id/stops', routeController.addStops); // Adiciona vários destinos de uma vez
routeRouter.delete('/:id/stops/:destinationId', routeController.removeStop); // Remove destino da rota
routeRouter.patch('/:id/stops/reorder', routeController.reorderStops); // Reordena stops

// Cálculo de distância
routeRouter.get('/:id/distance', routeController.calculateDistance); // Calcula distância e tempo da rota

export default routeRouter; 