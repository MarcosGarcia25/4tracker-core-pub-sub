import { TrackerModel } from '../../entities/tracker';
import { IUpdateTracker } from './interfaces/UpdateTracker.interface';

export default {
  async execute(payload: IUpdateTracker) {
    try {
      const tracker = await TrackerModel.findOne({ identifier: payload.id });

      if (tracker) {
        await TrackerModel.findOneAndUpdate(
          { id: payload.id },
          { companyId: payload.companyId, vehicleId: payload.vehicleId },
        );
      } else {
        await TrackerModel.create([
          {
            id: payload.id,
            companyId: payload.companyId,
            vehicleId: payload.vehicleId,
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
