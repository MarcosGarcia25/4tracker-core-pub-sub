import { IDriverByCompanyAndCoordinate } from "../../domain/position/interfaces";

export interface IPositionService {
  getAllByCompany(companyId: string);
  findDriverByCompanyAndCoordinate(payload: IDriverByCompanyAndCoordinate);
  getAllDriversByCompany(companyId: string);
}
