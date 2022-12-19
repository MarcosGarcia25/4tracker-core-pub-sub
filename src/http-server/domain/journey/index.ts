import { CacheProvider } from '../../../providers/cache';
import { JourneyRepository } from '../../../repositories/JourneyRepository';
import { JourneyService } from '../../services/Journey.service';
import { JourneyController } from './journey.controller';

export const journeyController = new JourneyController(new JourneyService(new JourneyRepository(new CacheProvider())));
