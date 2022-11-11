import { TrackerModel } from '../../entities/tracker';
import { CacheProvider } from '../../providers/cache';
import { EXPIRATION_TIME_CACHE } from '../../shared/config/cache.constant';
import { ITracker } from './interfaces/Tracker.interface';

export default {
  async execute(payload: ITracker) {
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
        };

        if (tracker) {
          await this.remove(payload);
        }

        if (data.vehicle && data.tracker) {
          const tracker = await TrackerModel.create([data]);
          const keyCache = `tracker:${payload.id}`;
          await CacheProvider.setEx(keyCache, EXPIRATION_TIME_CACHE.FIVE_MINUTES, JSON.stringify(tracker));
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

  async remove(payload: ITracker) {
    if (payload.id) {
      try {
        const keyCache = `tracker:${payload.id}`;
        await TrackerModel.deleteMany({ id: payload.id });
        await CacheProvider.delete(keyCache);
      } catch (error) {
        console.log(error);
      }
    }
  },
};
