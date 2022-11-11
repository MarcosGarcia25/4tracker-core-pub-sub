import { BaseService } from '../../base/BaseService';
import { CacheProvider } from '../../providers/cache';
import { IPositionRepository } from '../../repositories/interfaces/IPositionRepository';
import { IPositionService } from './interfaces/IPositionService.interface';

export class PositionService extends BaseService implements IPositionService {
  constructor(private positionRepository: IPositionRepository) {
    super();
  }

  async getAllByCompany(companyId: string) {
    return await this.positionRepository.findByCompany(companyId);
  }
}
