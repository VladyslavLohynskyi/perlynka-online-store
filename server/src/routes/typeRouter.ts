import { Router } from 'express';
import typeController from '../controllers/typeController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { Role } from '../models/userModel';

export const typeRouter = Router();
typeRouter.post(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   typeController.create,
);
typeRouter.get('/', typeController.getAll);
typeRouter.delete(
   '/:id',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   typeController.delete,
);
typeRouter.put(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   typeController.update,
);
