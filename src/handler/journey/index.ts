import { JourneyModel } from '../../entities/journey';
import { JourneyStart } from './interfaces/journey.interface';

export default {
  async execute(payload: JourneyStart) {
    try {
      if (payload.id) {
        const journey = await JourneyModel.findOne({
          vehicleId: '6689c072-3efd-4e10-a5da-1ac9ddab4e51',
        });

        console.log('JourneyStart', journey.vehicle.trackersHistory.find(history => history.tracker.identifier === '927328'));

        // await JourneyModel.deleteMany({ id: payload.id });

        // await JourneyModel.create([payload]);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
