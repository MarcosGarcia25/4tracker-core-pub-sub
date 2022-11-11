import { PositionModel } from '../entities/position';
import { CacheProvider } from '../providers/cache';
import { EXPIRATION_TIME_CACHE } from '../shared/config/cache.constant';
import { IDriverByCompanyAndCoordinate, IPositionRepository } from './interfaces/IPositionRepository';

export class PositionRepository implements IPositionRepository {
  async findByCompany(companyId: string) {
    let positions = null;
    const keyCache = `positions:company:${companyId}`;

    const positionsCache = await CacheProvider.get(keyCache);

    if (positionsCache) {
      positions = JSON.parse(positionsCache);
    } else {
      positions = await PositionModel.aggregate([
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

      positions = this.removeKeyGroup(positions);

      await CacheProvider.setEx(keyCache, EXPIRATION_TIME_CACHE.ONE_MINUTE, JSON.stringify(positions));
    }

    return positions;
  }

  async findDriverByCompanyAndCoordinate(payload: IDriverByCompanyAndCoordinate) {
    let positions = await PositionModel.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [Number(payload.latitude), Number(payload.longitude)],
          },
          maxDistance: Number(payload.maxDistance) || 10000,
          distanceField: 'distance',
          spherical: true,
        },
      },
      {
        $match: {
          companyId: payload.companyId,
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
          distance: { $last: '$distance' },
        },
      },
    ]).sort({ distance: 'asc' });

    return this.removeKeyGroup(positions);
  }

  private removeKeyGroup(positions: Array<any>) {
    return positions.map((position) => {
      position.vehicleId = position['_id'].vehicleId;
      position.companyId = position['_id'].companyId;

      delete position['_id'];

      return position;
    });
  }
}
