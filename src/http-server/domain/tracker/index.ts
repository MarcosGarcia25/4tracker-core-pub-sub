import { TrackerService } from '../../services/Tracker.service';
import { TrackerVehicleRepository } from '../../../repositories/TrackerVehicleRepository';
import { TrackerController } from './tracker.controller';

export const trackerController = new TrackerController(new TrackerService(new TrackerVehicleRepository()));
