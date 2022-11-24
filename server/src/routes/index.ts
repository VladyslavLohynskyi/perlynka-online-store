import { Router } from 'express';
import { brandRouter } from './brandRouter';
import { colorRouter } from './colorRouter';
import { seasonRouter } from './seasonRouter';
import { sizeRouter } from './sizeRouter';
import { typeRouter } from './typeRouter';
import { userRouter } from './userRouter';
export const router = Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/color', colorRouter);
router.use('/brand', brandRouter);
router.use('/season', seasonRouter);
router.use('/size', sizeRouter);
