import { IDriverByCompanyAndCoordinate, IFindByVehicleAndPeriod } from '../../http-server/domain/position/interfaces';

export interface IPositionRepository {
  findByCompany(companyId: string);
  findDriverByCompanyAndCoordinate(payload: IDriverByCompanyAndCoordinate);
  findDriversByCompany(companyId: string);
  findByVehicleAndPeriod(payload: IFindByVehicleAndPeriod);
}
