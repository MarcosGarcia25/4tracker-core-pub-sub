import { Tracker, Vehicle } from "src/handler/tracker-company/interfaces/UpdateTracker.interface";

export interface ICoordinatesPayload {
  trackerId: string | number;
  latitude: string;
  longitude: string;
  speed: number;
  companyId: string;
  vehicleId: string;
  createdAt: Date;
  vehicle: Vehicle;
  tracker: Tracker;
}


export interface Decoder {
  id: string;
  longitude: string;
  latitude: string;
  speed: number;
  createdAt: Date;
}
