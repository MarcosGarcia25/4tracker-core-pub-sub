import { Tracker, Vehicle } from '../../../handler/tracker-company/interfaces/Tracker.interface';

export interface ILocationCoordinatesPayload {
  type: string;
  coordinates: Array<number>;
}
export interface ICoordinatesPayload {
  trackerId: string | number;
  latitude: string;
  longitude: string;
  location: ILocationCoordinatesPayload;
  speed: number;
  companyId: string;
  vehicleId: string;
  userId?: string;
  journeyId?: string;
  lastJourneyStatus?: string;
  createdAt: Date;
  vehicle: Vehicle;
  tracker: Tracker;
  trackerState: string;
  user?: object;
  journey?: object;
  timestamp: Date;
  isNewPosition: boolean
}

export interface Decoder {
  id: string;
  longitude: string;
  latitude: string;
  speed: number;
  timestamp: string;
  createdAt: Date;
}
