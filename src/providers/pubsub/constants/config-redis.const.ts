import { RedisOptions } from 'ioredis';

export const CONFIGURE_REDIS: RedisOptions = {
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
};
