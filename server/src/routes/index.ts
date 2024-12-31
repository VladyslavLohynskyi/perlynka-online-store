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
import { newsletterSubscriptionRouter } from './newsletterSubscriptionRouter';
import { mainCarouselRouter } from './mainCarouselRouter';
import { ordersRouter } from './orderRouter';

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
router.use('/newsletter-subscription', newsletterSubscriptionRouter);
router.use('/main-carousel', mainCarouselRouter);
router.use('/order', ordersRouter);
