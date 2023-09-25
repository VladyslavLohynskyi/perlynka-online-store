import { Router } from 'express';
import brandController from '../controllers/brandController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { Role } from '../models/userModel';

export const brandRouter = Router();
brandRouter.post(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   brandController.create,
);

brandRouter.get('/', brandController.getAll);
brandRouter.delete(
   '/:id',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   brandController.delete,
);
brandRouter.put(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   brandController.update,
);
