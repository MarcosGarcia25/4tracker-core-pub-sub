import Redis, { RedisKey } from 'ioredis';
import { CONFIGURE_REDIS } from '../pubsub/constants/config-redis.const';
import { ICacheProvider } from './interfaces/ICacheProvider.interfaces';

export class CacheProvider implements ICacheProvider {
  redis: Redis;

  constructor() {
    this.redis = new Redis(CONFIGURE_REDIS);
  }

  async set(key: RedisKey, value: string | number | Buffer): Promise<any> {
    await this.redis.set(key, value);
  }

  async setEx(key: RedisKey, seconds: string | number, value: string | number | Buffer): Promise<any> {
    await this.redis.setex(key, seconds, value);
  }

  async get(key: RedisKey): Promise<string> {
    return await this.redis.get(key);
  }

  async delete(key: RedisKey): Promise<number> {
    return await this.redis.del(key);
  }
}
