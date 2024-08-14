import { Router } from 'express';
import newsletterSubscriptionController from '../controllers/newsletterSubscriptionController';

export const newsletterSubscriptionRouter = Router();
newsletterSubscriptionRouter.post('/', newsletterSubscriptionController.create);
