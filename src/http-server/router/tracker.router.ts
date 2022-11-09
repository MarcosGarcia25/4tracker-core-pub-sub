import { Router } from 'express';
import { trackerController } from '../domain/tracker';

const trackerRouter = Router();

trackerRouter.get('/:vehicleId', (request, response) => trackerController.getAllByVehicle(request, response));

export { trackerRouter };
