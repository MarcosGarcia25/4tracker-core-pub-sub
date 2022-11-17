import { JourneyStart } from './journey.interface';

export interface IJourneyService {
  store(payload: JourneyStart);
}
