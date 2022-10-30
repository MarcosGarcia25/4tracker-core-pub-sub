export interface IUpdateTracker {
  id: string;
  companyId: string;
  vehicleId: string;
  trackerId: string;
  vehicle: Vehicle;
  tracker: Tracker;
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
