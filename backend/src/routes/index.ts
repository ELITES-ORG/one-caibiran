import { Router } from 'express';
import { healthRouter } from '../modules/health/health.routes.js';

/**
 * All application routes hang off /api/v1. Versioning the prefix from day one
 * costs nothing now and avoids a painful migration once another client ships
 * against a released contract. See ADR 0005.
 */
export const apiRouter: Router = Router();

apiRouter.use('/health', healthRouter);
