import { Router } from 'express';
import { sendCommand } from '../../schemas/sms';
import { smsController } from '../domain/sms';
import { trackerController } from '../domain/tracker';

const smsRouter = Router();

smsRouter.post('/send-command', sendCommand, (request, response) => smsController.sendCommand(request, response));

export { smsRouter };
