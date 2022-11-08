import { publish } from '../../providers/pubsub';
import { PositionModel } from '../../entities/position';
import { Decoder, ICoordinatesPayload } from './interfaces/coordinates-payload.interface';
import { TrackerModel } from '../../entities/tracker';
import { JourneyModel } from '../../entities/journey';

export default {
  async execute(coordinate: Decoder) {
    try {
      if (coordinate?.id) {
        const tracker = await TrackerModel.findOne({ id: coordinate.id });

        const journey = await JourneyModel.aggregate([
          {
            $match: {
              vehicleId: tracker?.vehicleId,
            },
          },
          {
            $group: {
              id: { $last: '$_id' },
              _id: {
                userId: '$vehicleId',
                vehicleId: '$companyId',
              },
              journeyId: { $last: '$journeyId' },
              journey: { $last: '$journey' },
              user: { $last: '$user' },
              vehicle: { $last: '$vehicle' },
            },
          },
        ])[0];

        const trackersHistory = journey.vehicle.trackersHistory.find(
          (history) => history.tracker.identifier === coordinate.id && history.status === 'ACTIVE',
        );

        if (tracker) {
          const coordinates: ICoordinatesPayload = {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            speed: coordinate.speed,
            trackerId: coordinate.id,
            companyId: tracker?.companyId,
            vehicleId: tracker?.vehicleId,
            vehicle: tracker.vehicle,
            tracker: tracker.tracker,
            userId: trackersHistory ? journey?.user?.id : '',
            journeyId: trackersHistory ? journey?.journey?.id : '',
            user: trackersHistory ? journey?.user : {},
            journey: trackersHistory ? journey?.journey : {},
            createdAt: coordinate.createdAt,
          };

          await PositionModel.create([coordinates]);
          await publish('position', coordinates);

          console.log('[CORE][INFO][COORDINATES]', coordinates);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
