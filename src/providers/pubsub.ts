import Redis from 'ioredis';
const clientPublish = new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
});

const clientSubscribe = new Redis({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
});

clientPublish.on('error', (error) => {
  console.error(error);
});

clientSubscribe.on('error', (error) => {
  console.error(error);
});

export async function publish(channel, value) {
  return clientPublish.publish(channel, JSON.stringify(value));
}

export async function subscribe(channel, callback) {
  clientSubscribe.on('message', (channel, message) => {
    callback(message);
  });

  clientSubscribe.subscribe(channel);
}
