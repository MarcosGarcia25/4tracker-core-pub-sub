import { Request, Response } from 'express';
import { IPositionService } from '../../services/interfaces/IPositionService.interface';
import { BaseController } from '../../../base/BaseController';
import { HttpStatus } from '../../../shared/enum/HttpStatus.enum';
import { IDriverByCompanyAndCoordinate } from '../../../repositories/interfaces/IPositionRepository';
import { IJourneyService } from '../../services/interfaces/IJourneyService.interface';

export class JourneyController extends BaseController {
  constructor(private journeyService: IJourneyService) {
    super();
  }

  async getAllByCompany(request: Request, response: Response): Promise<Response> {
    const companyId = request.params.companyId;

    try {
      const payload = await this.journeyService.getAllByCompany(companyId);

      return this.success(response, HttpStatus.OK, payload);
    } catch (error) {
      return this.error(response, error);
    }
  }
}
