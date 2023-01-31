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
    const limitHour = 24;
    if (this.dateUtilService.createDate(payload.endDate).diff(payload.startDate) > 1000 * 60 * 60 * limitHour) {
      throw this.error(
        HttpStatus.BAD_REQUEST,
        `A data e hora deve estar dentro de ${limitHour} horas`,
        ErrorCode.ERROR_FIELD,
      );
    }

    if (this.dateUtilService.createDate(payload.endDate).diff(payload.startDate) < 0) {
      throw this.error(HttpStatus.BAD_REQUEST, `A data inicial deve ser menor que a final`, ErrorCode.ERROR_FIELD);
    }

    return await this.positionRepository.findByVehicleAndPeriod(payload);
  }
}
