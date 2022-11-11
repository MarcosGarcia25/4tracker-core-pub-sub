import { Router } from 'express';
import { lastVehicleByCompanyCoordinateSchema } from '../../schemas/positionTracker';
import { positionController } from '../domain/position';

const positionRouter = Router();

positionRouter
  .get('/vehicleByCompanyCoordinate/last', lastVehicleByCompanyCoordinateSchema, (request, response) =>
    positionController.findDriverByCompanyAndCoordinate(request, response),
  )
  .get('/:companyId', (request, response) => positionController.getAllByCompany(request, response));

export { positionRouter };
