import { TrackerModel } from '../../entities/tracker';
import { IDevice } from './interfaces/Device.interface';
import { ITrackerDeviceService } from './interfaces/ITrackerDeviceService.interface';

export class TrackerDeviceService implements ITrackerDeviceService {
  async update(payload: IDevice): Promise<void> {
    const trackers = await TrackerModel.find({ 'tracker.device.id': payload.id });

    for (let tracker of trackers) {
      const newTracker = tracker.tracker;
      newTracker.device = payload;

      await TrackerModel.updateMany(
        { trackerId: tracker.trackerId },
        {
          $set: {
            tracker: newTracker,
          },
        },
      );
    }
  }
}
