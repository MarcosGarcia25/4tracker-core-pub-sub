import { Decoder } from './coordinates-payload.interface';

export interface IPositionTrackerService {
  store(coordinate: Decoder): Promise<void>;
}
