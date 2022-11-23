import { Router } from 'express';
import { typeRouter } from './typeRouter';
import { userRouter } from './userRouter';
export const router = Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
