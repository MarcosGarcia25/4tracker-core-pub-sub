import { BaseService } from '../../base/BaseService';
import { IPositionRepository } from '../../repositories/interfaces/IPositionRepository';
import { ErrorCode } from '../../shared/enum/ErrorCode.enum';
import { HttpStatus } from '../../shared/enum/HttpStatus.enum';
import { IDateUtilService } from '../../shared/utils/interfaces/IDateUtilService.interface';
import { IDriverByCompanyAndCoordinate, IFindByVehicleAndPeriod } from '../domain/position/interfaces';
import { IPositionService } from './interfaces/IPositionService.interface';

export class PositionService extends BaseService implements IPositionService {
  constructor(private positionRepository: IPositionRepository, private dateUtilService: IDateUtilService) {
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

  async getAllByVehicleAndPeriod(payload: IFindByVehicleAndPeriod) {
    return await this.positionRepository.findByVehicleAndPeriod(payload);
  }
}
