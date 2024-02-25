import { Router } from 'express';
import checkoutController from '../controllers/checkoutController';

export const checkoutRouter = Router();
checkoutRouter.post('/', checkoutController.create);
