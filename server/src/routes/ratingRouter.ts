import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import ratingController from '../controllers/ratingController';

export const ratingRouter = Router();
ratingRouter.post('/', authMiddleware, ratingController.addRating);
ratingRouter.get('/:id', ratingController.getAvgRating);
