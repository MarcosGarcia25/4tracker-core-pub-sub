import { PositionModel } from '../entities/position';
import { CacheProvider } from '../providers/cache';
import { ICacheProvider } from '../providers/cache/interfaces/ICacheProvider.interfaces';
import { EXPIRATION_TIME_CACHE } from '../shared/config/cache.constant';
import { UtilsService } from '../shared/utils/utils.service';
import { IDriverByCompanyAndCoordinate, IPositionRepository } from './interfaces/IPositionRepository';

export class PositionRepository implements IPositionRepository {
  constructor(private cacheProvider: ICacheProvider) {}

  async findByCompany(companyId: string) {
    let positions = null;
    const keyCache = `positions:company:${companyId}`;

    const positionsCache = await this.cacheProvider.get(keyCache);

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
        { $sort: { timestamp: -1, createdAt: -1 } },
      ]);

      positions = this.removeKeyGroup(positions);

      await this.cacheProvider.setEx(keyCache, EXPIRATION_TIME_CACHE.TWO_MINUTE, JSON.stringify(positions));
    }

    return positions;
  }

  async findDriverByCompanyAndCoordinate(payload: IDriverByCompanyAndCoordinate) {
    const keyCache = UtilsService.buildKeyForCacheWithParams('positions:closest', payload);

    let positions = [];
    const positionsCache = await this.cacheProvider.get(keyCache);
    if (positionsCache) {
      positions = JSON.parse(positionsCache);
    } else {
      const journeyStatus = payload.status ? { lastJourneyStatus: payload.status } : null;
      positions = await PositionModel.aggregate([
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
            isNewPosition: true,
            ...journeyStatus,
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
            lastJourneyStatus: { $last: '$lastJourneyStatus' },
            user: { $last: '$user' },
            journey: { $last: '$journey' },
            distance: { $last: '$distance' },
          },
        },
        { $sort: { distance: 1 } },
      ]);

      positions = this.removeKeyGroup(positions);
      await this.cacheProvider.setEx(keyCache, EXPIRATION_TIME_CACHE.TRIRTY_SECONDS, JSON.stringify(positions));
    }

    return positions;
  }

  async findDriversByCompany(companyId: string) {
    let positions = null;
    const keyCache = `positions:drivers:company:${companyId}`;

    const positionsCache = await this.cacheProvider.get(keyCache);

    if (positionsCache) {
      positions = JSON.parse(positionsCache);
    } else {
      positions = await PositionModel.aggregate([
        {
          $match: {
            companyId,
            user: {
              $exists: true,
              $ne: null,
            },
          },
        },
        {
          $group: {
            id: { $last: '$_id' },
            latitude: { $last: '$latitude' },
            longitude: { $last: '$longitude' },
            trackerId: { $last: '$trackerId' },
            _id: {
              userId: '$userId',
              companyId: '$companyId',
            },
            vehicleId: { $last: '$vehicleId' },
            speed: { $last: '$speed' },
            vehicle: { $last: '$vehicle' },
            tracker: { $last: '$tracker' },
            createdAt: { $last: '$createdAt' },
            journeyId: { $last: '$journeyId' },
            user: { $last: '$user' },
            journey: { $last: '$journey' },
          },
        },
      ]);

      positions = this.removeKeyGroup(positions);

      await this.cacheProvider.setEx(keyCache, EXPIRATION_TIME_CACHE.TWO_MINUTE, JSON.stringify(positions));
    }

    return positions;
  }

  private removeKeyGroup(positions: Array<any>) {
    return positions.map((position) => {
      if (position['_id'].vehicleId) position.vehicleId = position['_id'].vehicleId;
      if (position['_id'].companyId) position.companyId = position['_id'].companyId;
      if (position['_id'].userId) position.userId = position['_id'].userId;

      delete position['_id'];

      return position;
    });
  }
}
