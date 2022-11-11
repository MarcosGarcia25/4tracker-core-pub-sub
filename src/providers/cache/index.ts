import Redis, { RedisKey } from 'ioredis';
import { CONFIGURE_REDIS } from '../pubsub/constants/config-redis.const';

const redis = new Redis(CONFIGURE_REDIS);

export const CacheProvider = {
  set: async (key: RedisKey, value: string | number | Buffer): Promise<any> => {
    await redis.set(key, value);
  },

  setEx: async (key: RedisKey, seconds: string | number, value: string | number | Buffer): Promise<any> => {
    await redis.setex(key, seconds, value);
  },

  get: async (key: RedisKey): Promise<string> => {
    return await redis.get(key);
  },
};
