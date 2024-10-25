import { Router } from 'express';

import mainCarouselController from '../controllers/mainCarouselController';
import authMiddleware from '../middleware/authMiddleware';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware';
import { Role } from '../models/userModel';

export const mainCarouselRouter = Router();
mainCarouselRouter.post(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   mainCarouselController.createSlide,
);
mainCarouselRouter.delete(
   '/',
   authMiddleware,
   checkRoleMiddleware(Role.ADMIN),
   mainCarouselController.deleteSlide,
);
mainCarouselRouter.get('/', mainCarouselController.getSlides);
