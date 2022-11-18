import { VehicleTrackerHistoryStatus } from '../enum/VehicleTrackerHistoryStatus.enum';

export interface ITracker {
  id: string;
  companyId: string;
  vehicleId: string;
  trackerId: string;
  vehicle: Vehicle;
  tracker: Tracker;
  status: VehicleTrackerHistoryStatus;
}

export interface Vehicle {
  id: string;
  model: string;
  manufacturer: string;
  yearManufacture: string;
  color: string;
  photo: string;
}

export interface Tracker {
  id: string;
  identifier: string;
  manufacturer: string;
  model: string;
}
