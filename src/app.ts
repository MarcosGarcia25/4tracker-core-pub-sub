import { subscribe } from './providers/pubsub';
import handlerCoordinates from './handler';

subscribe('position-tracker', async (payload) => {
  await handlerCoordinates.execute(payload);
}).then(() => console.log('Consumer running'));
