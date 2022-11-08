import { Tracker, Vehicle } from '../../../handler/tracker-company/interfaces/Tracker.interface';

export interface ICoordinatesPayload {
  trackerId: string | number;
  latitude: string;
  longitude: string;
  speed: number;
  companyId: string;
  vehicleId: string;
  userId?: string;
  journeyId?: string;
  createdAt: Date;
  vehicle: Vehicle;
  tracker: Tracker;
  user?: object;
  journey?: object;
}

export interface Decoder {
  id: string;
  longitude: string;
  latitude: string;
  speed: number;
  createdAt: Date;
}
