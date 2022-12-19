import { Router } from 'express';
import { journeyController } from '../domain/journey';

const journeyRouter = Router();

journeyRouter.get('/drivers/:companyId', (request, response) => journeyController.getAllByCompany(request, response));

export { journeyRouter };
