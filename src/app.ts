import { subscribe } from './providers/pubsub';
import handlerCoordinates from './handler';

subscribe('position-tracker', async (message) => {
  console.log(`[INFO]`, message);
  await handlerCoordinates.execute(message);
}).catch((error) => console.error(error));
