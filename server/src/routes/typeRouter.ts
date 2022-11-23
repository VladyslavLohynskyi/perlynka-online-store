import { Router } from 'express';
import typeController from '../controllers/typeController';

export const typeRouter = Router();
typeRouter.post('/', typeController.create);
typeRouter.get('/', typeController.getAll);
typeRouter.delete('/:id', typeController.delete);
typeRouter.put('/', typeController.update);
