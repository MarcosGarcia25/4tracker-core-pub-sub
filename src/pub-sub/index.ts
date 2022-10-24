import { subscribe } from '../providers/pubsub';
import handlerCoordinates from '../handler';

export class PubSub {
  constructor() {}

  async init() {
    await subscribe('position-tracker', async (message) => {
      console.log(`[INFO]`, message);
      await handlerCoordinates.execute(message);
    });
  }
}
