import { TrackerModel } from '../../entities/tracker';
import { IUpdateTracker } from './interfaces/UpdateTracker.interface';

export default {
  async execute(payload: IUpdateTracker) {
    try {
      const tracker = await TrackerModel.findOne({ identifier: payload.identifier });

      if (tracker) {
        await TrackerModel.findOneAndUpdate({ identifier: payload.identifier }, { companyId: payload.companyId });
      } else {
        await TrackerModel.create([
          {
            identifier: payload.identifier,
            companyId: payload.companyId,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
