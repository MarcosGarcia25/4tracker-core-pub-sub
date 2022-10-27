import { publish } from '../../providers/pubsub';
import { PositionModel } from '../../entities/position';
import { Decoder, ICoordinatesPayload } from './interfaces/coordinates-payload.interface';
import { TrackerModel } from '../../entities/tracker';

export default {
  async execute(coordinate: Decoder) {
    try {
      if (coordinate?.id) {
        const tracker = await TrackerModel.findOne({ id: coordinate.id });

        if (tracker) {
          const coordinates: ICoordinatesPayload = {
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            speed: coordinate.speed,
            trackerId: coordinate.id,
            companyId: tracker?.companyId,
            vehicleId: tracker?.vehicleId,
            createdAt: coordinate.createdAt,
          };

          await PositionModel.create([coordinates]);
          await publish('position', coordinates);

          console.log('[CORE][INFO][COORDINATES]', coordinates);
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
