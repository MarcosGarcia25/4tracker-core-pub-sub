import { Router } from 'express';
import { PermissionMiddleware } from '../../middlewares/PermissionMiddleware';
import { journeyRouter } from './journey.router';
import { positionRouter } from './position.router';
import { smsRouter } from './sms.router';
import { trackerRouter } from './tracker.router';

const router = Router();

router
  .use(PermissionMiddleware.jwtDecode)
  .use(PermissionMiddleware.isAuthenticated)
  .use('/position', positionRouter)
  .use('/tracker', trackerRouter)
  .use('/journey', journeyRouter)
  .use('/sms', smsRouter);

export { router };
