import { RedisKey } from 'ioredis';

export interface ICacheProvider {
  set(key: RedisKey, value: string | number | Buffer): Promise<any>;
  setEx(key: RedisKey, seconds: string | number, value: string | number | Buffer): Promise<any>;
  get(key: RedisKey): Promise<string>;
  delete(key: RedisKey): Promise<number>;
}
