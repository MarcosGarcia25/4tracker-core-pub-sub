import { BaseService } from '../../base/BaseService';
import { IDriverByCompanyAndCoordinate, IPositionRepository } from '../../repositories/interfaces/IPositionRepository';
import { IPositionService } from './interfaces/IPositionService.interface';

export class PositionService extends BaseService implements IPositionService {
  constructor(private positionRepository: IPositionRepository) {
    super();
  }

  async getAllByCompany(companyId: string) {
    return await this.positionRepository.findByCompany(companyId);
  }

  async findDriverByCompanyAndCoordinate(payload: IDriverByCompanyAndCoordinate) {
    return await this.positionRepository.findDriverByCompanyAndCoordinate(payload);
  }

  async getAllDriversByCompany(companyId: string) {
    return await this.positionRepository.findDriversByCompany(companyId);
  }
}
