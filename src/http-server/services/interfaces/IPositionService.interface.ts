import { IDriverByCompanyAndCoordinate } from '../../../repositories/interfaces/IPositionRepository';

export interface IPositionService {
  getAllByCompany(companyId: string);
  findDriverByCompanyAndCoordinate(payload: IDriverByCompanyAndCoordinate);
}
