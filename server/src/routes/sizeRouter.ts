import { Router } from 'express';
import sizeController from '../controllers/sizeController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { Role } from '../models/userModel';
export const sizeRouter = Router();
sizeRouter.post(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   sizeController.create,
);
sizeRouter.get('/', sizeController.getAll);
sizeRouter.delete(
   '/:id',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   sizeController.delete,
);
sizeRouter.put(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   sizeController.update,
);
