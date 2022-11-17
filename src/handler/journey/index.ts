import { JourneyModel } from '../../entities/journey';
import { pubSubTimeHistogram } from '../../metrics';
import { IJourneyService } from './interfaces/IJourneyService.interface';
import { JourneyStart } from './interfaces/journey.interface';

export class JourneyService implements IJourneyService {
  constructor() {}

  async store(payload: JourneyStart) {
    const initRequest = new Date().getTime();
    try {
      if (payload.id) {
        await JourneyModel.deleteMany({ id: payload.id });
        await JourneyModel.create([payload]);

        const timeRequest = new Date().getTime() - initRequest;

        pubSubTimeHistogram.observe(
          {
            name: 'JourneyService:store',
            time: timeRequest,
          },
          timeRequest,
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
