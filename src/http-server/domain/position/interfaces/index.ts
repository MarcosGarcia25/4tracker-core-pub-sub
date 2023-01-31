export interface IDriverByCompanyAndCoordinate {
  companyId: string;
  latitude: number;
  longitude: number;
  maxDistance: number;
  status: JourneyStatus;
}

export interface IFindByVehicleAndPeriod {
  vehicleId: string;
  startDate: string;
  endDate: string;
}

export enum JourneyStatus {
  DRIVING = 'DRIVING',
  FINISHED = 'FINISHED',
}
