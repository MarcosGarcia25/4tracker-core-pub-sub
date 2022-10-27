import Redis from 'ioredis';
import { CONFIGURE_REDIS } from './constants/config-redis.const';

const clientPublish = new Redis(CONFIGURE_REDIS);

export async function publish(channel, value) {
  return await clientPublish.publish(channel, JSON.stringify(value));
}

export async function subscribe(clientSubscribe, channel, callback) {
  clientSubscribe.on('message', (channel, message) => {
    callback(message);
  });

  clientSubscribe.subscribe(channel);
}
