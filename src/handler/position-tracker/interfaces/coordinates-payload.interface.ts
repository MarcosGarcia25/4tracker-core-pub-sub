export interface ICoordinatesPayload {
  trackerId: string | number;
  latitude: string;
  longitude: string;
  speed: number;
  companyId: string;
  vehicleId: string;
  createdAt: Date;
}

export interface Decoder {
  id: string;
  longitude: string;
  latitude: string;
  speed: number;
  createdAt: Date;
}
