import { JourneyModel } from '../../entities/journey';
import { pubSubTimeHistogram } from '../../metrics';
import { JourneyStart } from './interfaces/journey.interface';

export default {
  async execute(payload: JourneyStart) {
    const initRequest = new Date().getTime();
    try {
      if (payload.id) {
        await JourneyModel.deleteMany({ id: payload.id });
        await JourneyModel.create([payload]);

        const timeRequest = new Date().getTime() - initRequest;

        pubSubTimeHistogram.observe(
          {
            name: 'journeyStart',
            time: `${timeRequest}ms`,
          },
          timeRequest,
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
};
