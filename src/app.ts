import { subscribe } from './providers/pubsub';
import handlerPositionTracker from './handler/position-tracker';
import handlerTrackerCompany from './handler/tracker-company';
import handlerJourney from './handler/journey';
import Redis from 'ioredis';
import { CONFIGURE_REDIS } from './providers/constants/config-redis.const';
import { KeysChannelPubSub } from './shared/config/keys-channel-pubsub.contant';

export default class App {
  constructor() {}

  async initSubscribe() {
    subscribe(new Redis(CONFIGURE_REDIS), KeysChannelPubSub.POSITION_TRACKER, async (payload) => {
      console.log(KeysChannelPubSub.POSITION_TRACKER, payload);
      await handlerPositionTracker.execute(JSON.parse(payload));
    })
      .then(() => console.log('Subscribe Position Tracker running'))
      .catch(console.error);

    subscribe(new Redis(CONFIGURE_REDIS), KeysChannelPubSub.TRACKER_COMPANY, async (payload) => {
      console.log(KeysChannelPubSub.TRACKER_COMPANY, payload);
      await handlerTrackerCompany.execute(JSON.parse(payload));
    })
      .then(() => console.log('Subscribe Tracker Company running'))
      .catch(console.error);

    subscribe(new Redis(CONFIGURE_REDIS), KeysChannelPubSub.REMOVE_TRACKER_COMPANY, async (payload) => {
      console.log(KeysChannelPubSub.REMOVE_TRACKER_COMPANY, payload);
      await handlerTrackerCompany.remove(JSON.parse(payload));
    })
      .then(() => console.log('Subscribe Remove Tracker Company running'))
      .catch(console.error);

    subscribe(new Redis(CONFIGURE_REDIS), KeysChannelPubSub.JOURNEY_START, async (payload) => {
      console.log(KeysChannelPubSub.JOURNEY_START, payload);
      await handlerJourney.execute(JSON.parse(payload));
    })
      .then(() => console.log('Subscribe Journey Start running'))
      .catch(console.error);
  }
}
