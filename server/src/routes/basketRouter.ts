import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';

export const basketRouter = Router();
import BasketController from '../controllers/basketController';

basketRouter.post('/', authMiddleware, BasketController.addToBasket);
basketRouter.get('/', authMiddleware, BasketController.getBasket);
basketRouter.delete(
   '/:id',
   authMiddleware,
   BasketController.deleteOneShoesFromBasket,
);
