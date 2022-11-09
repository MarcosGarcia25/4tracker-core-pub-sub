import { ITrackerVehicleRepository } from '../../repositories/interfaces/ITrackerVehicleRepository';
import { BaseService } from '../../base/BaseService';
import { ITrackerService } from './interfaces/ITrackerService.interface';

export class TrackerService extends BaseService implements ITrackerService {
  constructor(private trackerVehicleRepository: ITrackerVehicleRepository) {
    super();
  }

  async getAllByVehicle(vehicleId: string) {
    return await this.trackerVehicleRepository.findByVehicle(vehicleId);
  }
}
