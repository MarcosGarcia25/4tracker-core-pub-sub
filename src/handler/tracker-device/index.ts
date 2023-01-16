import { TrackerModel } from '../../entities/tracker';
import { IDevice } from './interfaces/Device.interface';
import { ITrackerDeviceService } from './interfaces/ITrackerDeviceService.interface';

export class TrackerDeviceService implements ITrackerDeviceService {
  async update(payload: IDevice): Promise<void> {
    await TrackerModel.updateMany(
      { 'tracker.device.id': payload.id },
      {
        $set: {
          'tracker.device': payload,
        },
      },
    );
  }
}
