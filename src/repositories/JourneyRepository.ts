import { JourneyModel } from '../entities/journey';
import { ICacheProvider } from '../providers/cache/interfaces/ICacheProvider.interfaces';
import { EXPIRATION_TIME_CACHE } from '../shared/config/cache.constant';
import { IJourneyRepository } from './interfaces/IJourneyRepository';

export class JourneyRepository implements IJourneyRepository {
  constructor(private cacheProvider: ICacheProvider) {}

  async findByCompany(companyId: string) {
    let journey = null;
    const keyCache = `journey:company:${companyId}`;

    const journeyCache = await this.cacheProvider.get(keyCache);

    if (journeyCache) {
      journey = JSON.parse(journeyCache);
    } else {
      journey = await JourneyModel.aggregate([
        {
          $match: {
            companyId,
          },
        },
        {
          $group: {
            id: { $last: '$_id' },
            _id: {
              userId: '$userId',
              companyId: '$companyId',
            },
            journeyId: { $last: '$journeyId' },
            vehicleId: { $last: '$vehicleId' },
            journey: { $last: '$journey' },
            user: { $last: '$user' },
            vehicle: { $last: '$vehicle' },
            company: { $last: '$company' },
          },
        },
      ]);

      journey = this.removeKeyGroup(journey);

      await this.cacheProvider.setEx(keyCache, EXPIRATION_TIME_CACHE.FIVE_MINUTES, JSON.stringify(journey));
    }

    return journey;
  }

  private removeKeyGroup(journeys: Array<any>) {
    return journeys.map((journey) => {
      journey.userId = journey['_id'].userId;
      journey.companyId = journey['_id'].companyId;

      delete journey['_id'];

      return journey;
    });
  }
}
