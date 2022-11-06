import { TrackerModel } from '../../entities/tracker';
import { ITracker } from './interfaces/Tracker.interface';

export default {
  async execute(payload: ITracker) {
    if (payload.id) {
      try {
        const tracker = await TrackerModel.findOne({ identifier: payload.id });

        const data = {
          id: payload.id,
          companyId: payload.companyId ? payload.companyId : tracker.companyId,
          vehicleId: payload.vehicleId ? payload.vehicleId : tracker.vehicleId,
          trackerId: payload.trackerId ? payload.trackerId : tracker.trackerId,
          vehicle: payload.vehicle ? payload.vehicle : tracker.vehicle,
          tracker: payload.tracker ? payload.tracker : tracker.tracker,
        };

        if (tracker) {
          await this.remove(payload);
        }

        await TrackerModel.create([data]);
      } catch (error) {
        console.log(error);
      }
    }
  },

  async remove(payload: ITracker) {
    if (payload.id) {
      try {
        await TrackerModel.deleteMany({ id: payload.id, companyId: payload.companyId });
      } catch (error) {
        console.log(error);
      }
    }
  },
};
