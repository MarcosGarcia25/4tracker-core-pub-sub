import { TrackerModel } from '../entities/tracker';
import { ITrackerVehicleRepository } from './interfaces/ITrackerVehicleRepository';

export class TrackerVehicleRepository implements ITrackerVehicleRepository {
  async findByVehicle(vehicleId: string) {
    console.log(vehicleId)
    return await TrackerModel.findOne({ vehicleId });
  }
}
