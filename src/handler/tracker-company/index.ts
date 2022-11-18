import { TrackerModel } from '../../entities/tracker';
import { pubSubTimeHistogram } from '../../metrics';
import { CacheProvider } from '../../providers/cache';
import { ICacheProvider } from '../../providers/cache/interfaces/ICacheProvider.interfaces';
import { EXPIRATION_TIME_CACHE } from '../../shared/config/cache.constant';
import { ITrackerCompanyService } from './interfaces/ITrackerCompanyService.interface';
import { ITracker, VehicleTrackerHistoryStatus } from './interfaces/Tracker.interface';
export class TrackerCompanyService implements ITrackerCompanyService {
  constructor(private cacheProvider: ICacheProvider) {}

  async store(payload: ITracker): Promise<void> {
    const initRequest = new Date().getTime();
    if (payload.id) {
      try {
        const tracker = await TrackerModel.findOne({ id: payload.id });

        const data = {
          id: payload.id,
          companyId: payload?.companyId ? payload?.companyId : tracker?.companyId,
          vehicleId: payload?.vehicleId ? payload?.vehicleId : tracker?.vehicleId,
          trackerId: payload?.trackerId ? payload?.trackerId : tracker?.trackerId,
          vehicle: payload?.vehicle ? payload?.vehicle : tracker?.vehicle,
          tracker: payload?.tracker ? payload?.tracker : tracker?.tracker,
          status: payload?.status ? payload?.status : tracker?.status,
        };

        if (tracker && payload?.status === VehicleTrackerHistoryStatus.ACTIVE) {
          await this.delete(payload);
        }

        if (data.vehicle && data.tracker) {
          const trackerCreated = await TrackerModel.create([data]);
          const keyCache = `tracker:${payload.id}`;
          await this.cacheProvider.setEx(keyCache, EXPIRATION_TIME_CACHE.ONE_HOUR, JSON.stringify(trackerCreated[0]));
        }

        const timeRequest = new Date().getTime() - initRequest;

        pubSubTimeHistogram.observe(
          {
            name: 'TrackerCompanyService:store',
            time: timeRequest,
          },
          timeRequest,
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  async delete(payload: ITracker): Promise<void> {
    const initRequest = new Date().getTime();
    if (payload.id) {
      try {
        const keyCache = `tracker:${payload.id}`;
        await TrackerModel.deleteMany({ id: payload.id });
        await this.cacheProvider.delete(keyCache);

        const timeRequest = new Date().getTime() - initRequest;

        pubSubTimeHistogram.observe(
          {
            name: 'TrackerCompanyService:delete',
            time: timeRequest,
          },
          timeRequest,
        );
      } catch (error) {
        console.log(error);
      }
    }
  }
}
