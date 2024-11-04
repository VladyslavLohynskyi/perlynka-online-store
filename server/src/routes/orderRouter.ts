import { Router } from 'express';
import ordersController from '../controllers/orderController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { Role } from '../models/userModel';

export const ordersRouter = Router();

ordersRouter.post('/', ordersController.create);

ordersRouter.get(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   ordersController.getAll,
);

ordersRouter.delete(
   '/:id',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   ordersController.deleteOne,
);

ordersRouter.put(
   '/:id',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   ordersController.updateStatus,
);

export default ordersRouter;
