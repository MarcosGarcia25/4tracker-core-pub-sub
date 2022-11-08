import { JourneyModel } from '../../entities/journey';
import { JourneyStart } from './interfaces/journey.interface';

export default {
  async execute(payload: JourneyStart) {
    try {
      if (payload.id) {
        await JourneyModel.deleteMany({ id: payload.id });
        await JourneyModel.create([payload]);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
