export interface IPositionRepository {
  findByCompany(companyId: string);
  findDriverByCompanyAndCoordinate(payload: IDriverByCompanyAndCoordinate);
}

export interface IDriverByCompanyAndCoordinate {
  companyId: string;
  latitude: number;
  longitude: number;
  maxDistance: number;
  status: JourneyStatus;
}

export enum JourneyStatus {
  DRIVING = 'DRIVING',
  FINISHED = 'FINISHED',
}
