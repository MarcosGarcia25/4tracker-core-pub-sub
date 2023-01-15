import { SmsService } from '../../services/Sms.service';
import { SmsController } from './sms.controller';

export const smsController = new SmsController(new SmsService());
