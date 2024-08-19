import { Router } from 'express';
import { brandRouter } from './brandRouter';
import { colorRouter } from './colorRouter';
import { seasonRouter } from './seasonRouter';
import { shoesRouter } from './shoesRouter';
import { sizeRouter } from './sizeRouter';
import { typeRouter } from './typeRouter';
import { userRouter } from './userRouter';
import { basketRouter } from './basketRouter';
import { ratingRouter } from './ratingRouter';
import { checkoutRouter } from './checkoutRouter';
import { newsletterSubscriptionRouter } from './newsletterSubscriptionRouter';

export const router = Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/color', colorRouter);
router.use('/brand', brandRouter);
router.use('/season', seasonRouter);
router.use('/size', sizeRouter);
router.use('/shoes', shoesRouter);
router.use('/basket', basketRouter);
router.use('/rating', ratingRouter);
router.use('/checkout', checkoutRouter);
router.use('/newsletter-subscription', newsletterSubscriptionRouter);
