import { publish } from '../../providers/pubsub';
import { PositionModel } from '../../entities/position';
import { Decoder, ICoordinatesPayload } from './interfaces/coordinates-payload.interface';
import { TrackerModel } from '../../entities/tracker';
import { JourneyModel } from '../../entities/journey';
import { CacheProvider } from '../../providers/cache';
import { EXPIRATION_TIME_CACHE } from '../../shared/config/cache.constant';
import { pubSubTimeHistogram } from '../../metrics';
import { IPositionTrackerService } from './interfaces/IPositionTrackerService.interface';
import { ICacheProvider } from '../../providers/cache/interfaces/ICacheProvider.interfaces';
import { VehicleTrackerHistoryStatus } from '../tracker-company/interfaces/Tracker.interface';

export class PositionTrackerService implements IPositionTrackerService {
  constructor(private cacheProvider: ICacheProvider) {}

  async store(coordinate: Decoder): Promise<void> {
    const initRequest = new Date().getTime();
    try {
      if (coordinate?.id) {
        const tracker = await this.getTrackerById(coordinate.id);

        if (tracker) {
          const journey = await JourneyModel.findOne({ vehicleId: tracker?.vehicleId }).sort({
            _id: -1,
          });

          const lastHistoryJourney = journey?.journey?.journeyHistory?.sort(
            // @ts-ignore
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );

          await PositionModel.updateMany({ vehicleId: tracker?.vehicleId }, { isNewPosition: false });

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
            timestamp: new Date(coordinate.timestamp),
            isNewPosition: true,
          };

          await PositionModel.create([coordinates]);

          delete coordinates?.location?.type;
          await publish('position', coordinates);

          const timeRequest = new Date().getTime() - initRequest;

          pubSubTimeHistogram.observe(
            {
              name: 'PositionTrackerService:store',
              time: timeRequest,
            },
            timeRequest,
          );

          console.log('[CORE][INFO][COORDINATES]', coordinates, `[TIME] ${timeRequest}ms`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async getTrackerById(id: string): Promise<any> {
    let tracker = null;
    const keyCache = `tracker:${id}`;

    const trackerCache = await this.cacheProvider.get(keyCache);

    if (trackerCache) {
      tracker = JSON.parse(trackerCache);
      if (tracker?.status === VehicleTrackerHistoryStatus.INACTIVE) {
        tracker = null;
      }
    } else {
      tracker = await TrackerModel.findOne({ id, status: VehicleTrackerHistoryStatus.ACTIVE });
      await this.cacheProvider.setEx(keyCache, EXPIRATION_TIME_CACHE.ONE_HOUR, JSON.stringify(tracker));
    }

    return tracker;
  }
}
