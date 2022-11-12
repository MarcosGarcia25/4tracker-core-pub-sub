import { publish } from '../../providers/pubsub';
import { PositionModel } from '../../entities/position';
import { Decoder, ICoordinatesPayload } from './interfaces/coordinates-payload.interface';
import { TrackerModel } from '../../entities/tracker';
import { JourneyModel } from '../../entities/journey';
import { CacheProvider } from '../../providers/cache';
import { EXPIRATION_TIME_CACHE } from '../../shared/config/cache.constant';

export default {
  async execute(coordinate: Decoder) {
    try {
      if (coordinate?.id) {
        const tracker = await this.getTrackerById(coordinate.id);

        const journey = await JourneyModel.findOne({ vehicleId: tracker?.vehicleId }).sort({
          _id: -1,
        });

        const lastHistoryJourney = journey?.journey?.journeyHistory?.sort(
          // @ts-ignore
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        if (tracker) {
          const coordinates: ICoordinatesPayload = {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            location: {
              type: 'Point',
              coordinates: [Number(coordinate.latitude), Number(coordinate.longitude)],
            },
            speed: coordinate.speed,
            trackerId: coordinate.id,
            companyId: tracker?.companyId,
            vehicleId: tracker?.vehicleId,
            vehicle: tracker.vehicle,
            tracker: tracker.tracker,
            userId: journey?.user ? journey?.user?.id : '',
            journeyId: journey?.journey ? journey?.journey?.id : '',
            lastJourneyStatus: journey?.journey ? lastHistoryJourney[0]?.status : '',
            user: journey?.user ? journey?.user : {},
            journey: journey?.journey ? journey?.journey : {},
            createdAt: coordinate.createdAt,
          };

          await PositionModel.create([coordinates]);

          delete coordinates?.location?.type;
          await publish('position', coordinates);

          console.log('[CORE][INFO][COORDINATES]', coordinates);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getTrackerById(id: string) {
    let tracker = null;
    const keyCache = `tracker:${id}`;

    const trackerCache = await CacheProvider.get(keyCache);

    if (trackerCache) {
      tracker = JSON.parse(trackerCache);
    } else {
      tracker = await TrackerModel.findOne({ id });
      await CacheProvider.setEx(keyCache, EXPIRATION_TIME_CACHE.ONE_HOUR, JSON.stringify(tracker));
    }

    return tracker;
  },
};
