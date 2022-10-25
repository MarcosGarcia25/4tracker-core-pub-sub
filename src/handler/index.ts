import { publish } from '../providers/pubsub';
import { PositionModel } from '../entities/position';
import { ICoordinatesPayload } from './interfaces/coordinates-payload.interface';

export default {
  async execute(message: string) {
    try {
      const coordinate = JSON.parse(message);
      const coordinates: ICoordinatesPayload = {
        id: coordinate.id,
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        speed: coordinate.speed,
      };

      await PositionModel.create([coordinates]);
      await publish('position', coordinates);

      console.log('[INFO][COORDINATES]: ', coordinates);
    } catch (error) {
      console.log(error);
    }
  },
};
