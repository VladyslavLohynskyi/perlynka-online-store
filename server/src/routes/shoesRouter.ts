import { Router } from 'express';
import shoesController from '../controllers/shoesController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { Role } from '../models/userModel';
export const shoesRouter = Router();
shoesRouter.post(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   shoesController.create,
);
shoesRouter.get('/', shoesController.getAll);
shoesRouter.get('/:id', shoesController.getOne);
shoesRouter.delete(
   '/:id',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   shoesController.deleteOne,
);
shoesRouter.put(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   shoesController.update,
);