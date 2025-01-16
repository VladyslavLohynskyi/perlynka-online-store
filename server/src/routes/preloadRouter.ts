import { Router } from 'express';
import preloadController from '../controllers/preloadController';

export const preloadRouter = Router();

preloadRouter.get(
   '/',

   preloadController.getPreloadData,
);

export default preloadRouter;
