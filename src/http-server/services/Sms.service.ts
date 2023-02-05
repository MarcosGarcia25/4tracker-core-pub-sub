import { BaseService } from '../../base/BaseService';
import { SMSSentModel } from '../../entities/command-sent';
import { TrackerModel } from '../../entities/tracker';
import { SmsProvider } from '../../providers/SmsProvider';
import { ErrorCode } from '../../shared/enum/ErrorCode.enum';
import { HttpStatus } from '../../shared/enum/HttpStatus.enum';
import { SentCommand } from '../domain/sms/interfaces';
import { ISmsService } from './interfaces/ISmsService.interface';

export class SmsService extends BaseService implements ISmsService {
  async sendCommand(payload: SentCommand): Promise<any> {
    const tracker = await TrackerModel.findOne({ trackerId: payload.trackerId });

    if (!tracker) {
      throw this.error(HttpStatus.NOT_FOUND, 'Rastreador não encontrado.', ErrorCode.TRACKER_GET_FAILED);
    }

    if (!tracker.tracker?.phoneNumber) {
      throw this.error(HttpStatus.NOT_FOUND, 'Rastreador não tem um número atribuído.', ErrorCode.TRACKER_GET_FAILED);
    }

    const smsProvider = new SmsProvider();

    payload.tracker = tracker.tracker;
    payload.vehicleId = tracker.vehicleId;
    payload.vehicle = tracker.vehicle;
    payload.phoneNumber = tracker.tracker?.phoneNumber;
    payload.createdAt = new Date().toISOString();

    const trackerCommand = [...tracker.tracker?.device?.commands].find((command) => command.label === payload.message);

    console.log('[sendCommand]', trackerCommand);

    await smsProvider.send(trackerCommand?.command, payload.phoneNumber);

    return await SMSSentModel.create(payload);
  }
}
