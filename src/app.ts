import { subscribe } from './providers/pubsub';
import handlerCoordinates from './handler';

subscribe('position-tracker', async (message) => {
  console.log(`[INFO]`, message);
  await handlerCoordinates.execute(message);
})
  .then(() => console.log('on position-tracker'))
  .catch((error) => console.error(error));
