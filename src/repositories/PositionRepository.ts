import { PositionModel } from '../entities/position';
import { IPositionRepository } from './interfaces/IPositionRepository';

export class PositionRepository implements IPositionRepository {
  async findByCompany(companyId: string) {
    const positions = await PositionModel.aggregate([
      {
        $match: {
          companyId,
        },
      },
      {
        $group: {
          id: { $last: '$_id' },
          latitude: { $last: '$latitude' },
          longitude: { $last: '$longitude' },
          trackerId: { $last: '$trackerId' },
          _id: {
            vehicleId: '$vehicleId',
            companyId: '$companyId',
          },
          speed: { $last: '$speed' },
          vehicle: { $last: '$vehicle' },
          tracker: { $last: '$tracker' },
          createdAt: { $last: '$createdAt' },
          userId: { $last: '$userId' },
          journeyId: { $last: '$journeyId' },
          user: { $last: '$user' },
          journey: { $last: '$journey' },
        },
      },
    ]);

    return positions.map((position) => {
      position.vehicleId = position['_id'].vehicleId;
      position.companyId = position['_id'].companyId;

      delete position['_id'];

      return position;
    });
  }
}
