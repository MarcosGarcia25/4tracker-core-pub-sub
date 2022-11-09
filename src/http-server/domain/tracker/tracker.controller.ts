import { Request, Response } from 'express';
import { ITrackerService } from '../../services/interfaces/ITrackerService.interface';
import { BaseController } from '../../../base/BaseController';
import { HttpStatus } from '../../../shared/enum/HttpStatus.enum';

export class TrackerController extends BaseController {
  constructor(private trackerService: ITrackerService) {
    super();
  }

  async getAllByVehicle(request: Request, response: Response): Promise<Response> {
    const vehicleId = request.params.vehicleId;

    try {
      const payload = await this.trackerService.getAllByVehicle(vehicleId);

      return this.success(response, HttpStatus.OK, payload);
    } catch (error) {
      return this.error(response, error);
    }
  }
}
