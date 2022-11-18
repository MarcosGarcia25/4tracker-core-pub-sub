import { ITracker, VehicleTrackerHistoryStatus } from './Tracker.interface';

export interface ITrackerCompanyService {
  store(payload: ITracker): Promise<void>;
  delete(payload: ITracker, status: VehicleTrackerHistoryStatus): Promise<void>;
}
