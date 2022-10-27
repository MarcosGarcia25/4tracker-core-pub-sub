import { TrackerModel } from '../../entities/tracker';
import { IUpdateTracker } from './interfaces/UpdateTracker.interface';

export default {
  async execute(payload: IUpdateTracker) {
    try {
      const tracker = await TrackerModel.findOne({ identifier: payload.identifier });

      if (tracker) {
        await TrackerModel.findOneAndUpdate(
          { identifier: payload.identifier },
          { companyId: payload.companyId, vehicleId: payload.vehicleId },
        );
      } else {
        await TrackerModel.create([
          {
            identifier: payload.identifier,
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
      await TrackerModel.deleteMany({ identifier: payload.identifier, companyId: payload.companyId });
    } catch (error) {
      console.log(error);
    }
  },
};
