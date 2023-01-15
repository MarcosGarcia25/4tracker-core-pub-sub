import { IDevice } from './Device.interface';

export interface ITrackerDeviceService {
  update(payload: IDevice): Promise<void>;
}
