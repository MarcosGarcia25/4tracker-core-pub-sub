import { BaseService } from '../../base/BaseService';
import { IJourneyRepository } from '../../repositories/interfaces/IJourneyRepository';
import { IJourneyService } from './interfaces/IJourneyService.interface';

export class JourneyService extends BaseService implements IJourneyService {
  constructor(private journeyRepository: IJourneyRepository) {
    super();
  }

  async getAllByCompany(companyId: string) {
    return await this.journeyRepository.findByCompany(companyId);
  }
}
