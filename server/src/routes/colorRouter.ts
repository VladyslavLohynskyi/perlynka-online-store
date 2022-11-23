import { Router } from 'express';
import colorController from '../controllers/colorController';

import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { Role } from '../models/userModel';

export const colorRouter = Router();
colorRouter.post(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   colorController.create,
);
colorRouter.get('/', colorController.getAll);
colorRouter.delete(
   '/:id',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   colorController.delete,
);
colorRouter.put(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   colorController.update,
);
