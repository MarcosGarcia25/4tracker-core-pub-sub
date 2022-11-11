import { Router } from 'express';
import { positionController } from '../domain/position';

const positionRouter = Router();

positionRouter
  .get('/vehicleByCompanyCoordinate', (request, response) =>
    positionController.findDriverByCompanyAndCoordinate(request, response),
  )
  .get('/:companyId', (request, response) => positionController.getAllByCompany(request, response));

export { positionRouter };
