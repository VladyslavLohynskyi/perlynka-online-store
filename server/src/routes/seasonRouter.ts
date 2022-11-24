import { Router } from 'express';
import seasonController from '../controllers/seasonController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { Role } from '../models/userModel';

export const seasonRouter = Router();
seasonRouter.post(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   seasonController.create,
);
seasonRouter.get('/', seasonController.getAll);
seasonRouter.delete(
   '/:id',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   seasonController.delete,
);
seasonRouter.put(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   seasonController.update,
);
