import { RedisOptions } from 'ioredis';

export const CONFIGURE_REDIS: RedisOptions = {
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  db: Number(process.env.REDIS_DB)
};

export const CONFIGURE_REDIS_PUBSUB: RedisOptions = {
  port: Number(process.env.REDIS_PUBSUB_PORT),
  host: process.env.REDIS_PUBSUB_HOST,
};
