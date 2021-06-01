import { StatusController } from '@/controllers/StatusController';
import { Router } from 'express';

/**
 * This file will handle status route.
 * This route is public and requires no parameters.
 * @exports express.Router
 */
const status = Router();

status.get('/status', StatusController.getStatus);

export { status };
