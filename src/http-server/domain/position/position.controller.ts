import { Request, Response } from 'express';
import { IPositionService } from '../../services/interfaces/IPositionService.interface';
import { BaseController } from '../../../base/BaseController';
import { HttpStatus } from '../../../shared/enum/HttpStatus.enum';
import { IDriverByCompanyAndCoordinate, IFindByVehicleAndPeriod } from './interfaces';

export class PositionController extends BaseController {
  constructor(private positionService: IPositionService) {
    super();
  }

  async getAllByCompany(request: Request, response: Response): Promise<Response> {
    const companyId = request.params.companyId;

    try {
      const payload = await this.positionService.getAllByCompany(companyId);

      return this.success(response, HttpStatus.OK, payload);
    } catch (error) {
      return this.error(response, error);
    }
  }

  async getAllDriversByCompany(request: Request, response: Response): Promise<Response> {
    const companyId = request.params.companyId;

    try {
      const payload = await this.positionService.getAllDriversByCompany(companyId);

      return this.success(response, HttpStatus.OK, payload);
    } catch (error) {
      return this.error(response, error);
    }
  }

  async findDriverByCompanyAndCoordinate(request: Request, response: Response): Promise<Response> {
    const { companyId, latitude, longitude, maxDistance, status } =
      request.query as unknown as IDriverByCompanyAndCoordinate;

    try {
      const payload = await this.positionService.findDriverByCompanyAndCoordinate({
        companyId,
        latitude,
        longitude,
        maxDistance,
        status,
      });

      return this.success(response, HttpStatus.OK, payload);
    } catch (error) {
      return this.error(response, error);
    }
  }

  async findDriverByVehicleAndPeriod(request: Request, response: Response): Promise<Response> {
    const { endDate, startDate, vehicleId } = request.query as unknown as IFindByVehicleAndPeriod;

    try {
      const payload = await this.positionService.getAllByVehicleAndPeriod({ endDate, startDate, vehicleId });

      return this.success(response, HttpStatus.OK, payload);
    } catch (error) {
      return this.error(response, error);
    }
  }
}
