import Redis from 'ioredis';
const client = new Redis();

client.on('error', (error) => {
  console.error(error);
});

export async function publish(channel, value) {
  return client.publish(channel, JSON.stringify(value));
}

export async function subscribe(channel, callback) {
  client.on('message', (channel, message) => {
    callback(message);
  });

  client.subscribe(channel);
}
