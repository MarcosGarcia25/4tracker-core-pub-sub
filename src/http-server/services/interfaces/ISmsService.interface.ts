import { SentCommand } from '../../domain/sms/interfaces';

export interface ISmsService {
  sendCommand(payload: SentCommand): Promise<any>;
}
