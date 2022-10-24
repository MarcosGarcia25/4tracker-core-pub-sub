import { publish } from '../providers/pubsub';
// import { PositionModel } from '../entities/position';
import { ICoordinatesPayload } from './interfaces/coordinates-payload.interface';

export default {
  async execute(message: string) {
    const coordinate = JSON.parse(message);
    const coordinates: ICoordinatesPayload = {
      id: coordinate.id,
      latitude: coordinate.y,
      longitude: coordinate.x,
      speed: coordinate.speed,
    };

    // await PositionModel.create([coordinates]);
    await publish('position', JSON.stringify(coordinates));

    console.log('[INFO][COORDINATES]: ', coordinates);
  },
};
