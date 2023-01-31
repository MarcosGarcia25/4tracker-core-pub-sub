import { PositionService } from '../../services/Position.service';
import { PositionRepository } from '../../../repositories/PositionRepository';
import { PositionController } from './position.controller';
import { CacheProvider } from '../../../providers/cache';
import { DateUtilService } from '../../../shared/utils/date-util.service';

export const positionController = new PositionController(
  new PositionService(new PositionRepository(new CacheProvider()), new DateUtilService()),
);
