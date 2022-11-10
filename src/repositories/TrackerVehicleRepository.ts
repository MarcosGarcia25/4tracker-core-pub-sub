import { TrackerModel } from '../entities/tracker';
import { ITrackerVehicleRepository } from './interfaces/ITrackerVehicleRepository';

export class TrackerVehicleRepository implements ITrackerVehicleRepository {
  async findByVehicle(vehicleId: string) {
    return await TrackerModel.findOne({ vehicleId });
  }
}
