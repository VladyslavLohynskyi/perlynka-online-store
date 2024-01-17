import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';

export const basketRouter = Router();
import BasketController from '../controllers/basketController';

basketRouter.post('/', authMiddleware, BasketController.addToBasket);
basketRouter.get('/', authMiddleware, BasketController.getBasket);
basketRouter.get(
   '/totalCount',
   authMiddleware,
   BasketController.getCountOfShoesInBasket,
);
basketRouter.delete(
   '/:id/:sizeId',
   authMiddleware,
   BasketController.deleteOneShoesFromBasket,
);
basketRouter.delete('/', authMiddleware, BasketController.deleteAllFromBasket);
basketRouter.put('/increment', authMiddleware, BasketController.incrementCount);
basketRouter.put('/decrement', authMiddleware, BasketController.decrementCount);
