import Redis from 'ioredis';
import { KeysChannelPubSub } from '../shared/config/keys-channel-pubsub.contant';
import { CONFIGURE_REDIS_PUBSUB } from '../providers/pubsub/constants/config-redis.const';
import { subscribe } from '../providers/pubsub';
import { ITrackerCompanyService } from '../handler/tracker-company/interfaces/ITrackerCompanyService.interface';
import { IPositionTrackerService } from '../handler/position-tracker/interfaces/IPositionTrackerService.interface';
import { IJourneyService } from '../handler/journey/interfaces/IJourneyService.interface';

export class SubscribeService {
  constructor(
    private trackerCompanyService: ITrackerCompanyService,
    private positionTrackerService: IPositionTrackerService,
    private journeyService: IJourneyService,
  ) {}

  async positionTracker() {
    subscribe(new Redis(CONFIGURE_REDIS_PUBSUB), KeysChannelPubSub.POSITION_TRACKER, async (payload) => {
      console.log(KeysChannelPubSub.POSITION_TRACKER, payload);
      await this.positionTrackerService.store(JSON.parse(payload));
    })
      .then(() => console.log('Subscribe Position Tracker running'))
      .catch(console.error);
  }

  async trackerCompany() {
    subscribe(new Redis(CONFIGURE_REDIS_PUBSUB), KeysChannelPubSub.TRACKER_COMPANY, async (payload) => {
      console.log(KeysChannelPubSub.TRACKER_COMPANY, payload);
      await this.trackerCompanyService.store(JSON.parse(payload));
    })
      .then(() => console.log('Subscribe Tracker Company running'))
      .catch(console.error);
  }

  async removeTrackerCompany() {
    subscribe(new Redis(CONFIGURE_REDIS_PUBSUB), KeysChannelPubSub.REMOVE_TRACKER_COMPANY, async (payload) => {
      console.log(KeysChannelPubSub.REMOVE_TRACKER_COMPANY, payload);
      await this.trackerCompanyService.delete(JSON.parse(payload));
    })
      .then(() => console.log('Subscribe Remove Tracker Company running'))
      .catch(console.error);
  }

  async journeyStart() {
    subscribe(new Redis(CONFIGURE_REDIS_PUBSUB), KeysChannelPubSub.JOURNEY_START, async (payload) => {
      console.log(KeysChannelPubSub.JOURNEY_START, payload);
      await this.journeyService.store(JSON.parse(payload));
    })
      .then(() => console.log('Subscribe Journey Start running'))
      .catch(console.error);
  }
}
