import { TrackerModel } from '../../entities/tracker';
import { IUpdateTracker } from './interfaces/UpdateTracker.interface';

export default {
  async execute(payload: IUpdateTracker) {
    try {
      const tracker = await TrackerModel.findOne({ identifier: payload.id });

      const data = {
        companyId: payload.companyId,
        vehicleId: payload.vehicleId,
        trackerId: payload.trackerId,
        vehicle: payload.vehicle,
        tracker: payload.tracker,
      };

      if (tracker) {
        await TrackerModel.findOneAndUpdate({ id: payload.id }, data);
      } else {
        await TrackerModel.create([
          {
            id: payload.id,
            ...data,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async remove(payload: IUpdateTracker) {
    try {
      await TrackerModel.deleteMany({ id: payload.id, companyId: payload.companyId });
    } catch (error) {
      console.log(error);
    }
  },
};
