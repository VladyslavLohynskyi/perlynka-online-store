import { Router } from 'express';
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
export const userRouter = Router();

userRouter.post('/registration', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/users', authMiddleware, userController.getUsersByRole);
userRouter.get('/', authMiddleware, userController.getUserByEmail);
userRouter.put('/role', authMiddleware, userController.changeRole);
userRouter.get('/activate/:link', userController.activate);
userRouter.get('/refresh', userController.refresh);
userRouter.get('/logout', userController.logout);
userRouter.post('/forgot-password', userController.forgotPassword);
userRouter.get(
   '/forgot-password/check/:id/:token',
   userController.checkForgotToken,
);
userRouter.post('/forgot-password/change', userController.forgotPasswordChange);
