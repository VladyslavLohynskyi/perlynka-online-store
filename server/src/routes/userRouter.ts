import { Router } from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
export const userRouter = Router();

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/auth', authMiddleware, userController.check);
userRouter.get('/users', authMiddleware, userController.getUsersByRole);
