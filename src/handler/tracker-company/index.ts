import { TrackerModel } from '../../entities/tracker';
import { ITracker } from './interfaces/Tracker.interface';

export default {
  async execute(payload: ITracker) {
    if (payload.id) {
      try {
        const tracker = await TrackerModel.findOne({ identifier: payload.id });

        const data = {
          companyId: payload.companyId,
          vehicleId: payload.vehicleId,
          trackerId: payload.trackerId,
          vehicle: payload.vehicle ? payload.vehicle : tracker.vehicle,
          tracker: payload.tracker ? payload.tracker : tracker.tracker,
        };
        const key = { id: payload.id };

        if (tracker) {
          await TrackerModel.findOneAndUpdate(key, data);
        } else {
          await TrackerModel.create([
            {
              ...key,
              ...data,
            },
          ]);
        }
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
