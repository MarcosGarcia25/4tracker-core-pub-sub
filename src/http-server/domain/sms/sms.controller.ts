import { Request, Response } from 'express';
import { BaseController } from '../../../base/BaseController';
import { HttpStatus } from '../../../shared/enum/HttpStatus.enum';
import { ISmsService } from '../../services/interfaces/ISmsService.interface';
import { SentCommand } from './interfaces';

export class SmsController extends BaseController {
  constructor(private smsService: ISmsService) {
    super();
  }

  async sendCommand(request: Request, response: Response): Promise<Response> {
    const { createdAt, message, phoneNumber, tracker, trackerId, vehicle, vehicleId } = request.body as SentCommand;

    try {
      const payload = await this.smsService.sendCommand({
        createdAt,
        message,
        phoneNumber,
        tracker,
        trackerId,
        vehicle,
        vehicleId,
      });

      return this.success(response, HttpStatus.OK, payload);
    } catch (error) {
      return this.error(response, error);
    }
  }
}
