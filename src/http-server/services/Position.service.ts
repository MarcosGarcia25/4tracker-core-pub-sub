import { BaseService } from '../../base/BaseService';
import { CacheProvider } from '../../providers/cache';
import { IPositionRepository } from '../../repositories/interfaces/IPositionRepository';
import { IPositionService } from './interfaces/IPositionService.interface';

export class PositionService extends BaseService implements IPositionService {
  constructor(private positionRepository: IPositionRepository) {
    super();
  }

  async getAllByCompany(companyId: string) {
    let positions = null;
    const posiitonsCache = await CacheProvider.get(`positions:company:${companyId}`);

    if (posiitonsCache) {
      positions = JSON.parse(posiitonsCache);
    } else {
      positions = await this.positionRepository.findByCompany(companyId);
      await CacheProvider.setEx(`positions:company:${companyId}`, 60, JSON.stringify(positions));
    }

    return positions;
  }
}
