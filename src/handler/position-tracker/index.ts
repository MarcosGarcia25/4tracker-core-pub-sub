import { publish } from '../../providers/pubsub';
import { PositionModel } from '../../entities/position';
import { Decoder, ICoordinatesPayload } from './interfaces/coordinates-payload.interface';
import { TrackerModel } from '../../entities/tracker';

export default {
  async execute(coordinate: Decoder) {
    try {
      if (coordinate?.id) {
        const tracker = await TrackerModel.findOne({ identifier: coordinate.id });

        const coordinates: ICoordinatesPayload = {
          id: coordinate.id,
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          speed: coordinate.speed,
          companyId: tracker?.companyId,
          vehicleId: tracker?.vehicleId,
          createdAt: coordinate.createdAt,
        };

        await PositionModel.create([coordinates]);
        await publish('position', coordinates);

        console.log('[CORE][INFO][COORDINATES]', coordinates);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
