import { PositionService } from '../../services/Position.service';
import { PositionRepository } from '../../../repositories/PositionRepository';
import { PositionController } from './position.controller';

export const positionController = new PositionController(new PositionService(new PositionRepository()));
