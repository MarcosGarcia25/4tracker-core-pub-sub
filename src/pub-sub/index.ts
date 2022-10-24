import { subscribe } from '../providers/pubsub';
import handlerCoordinates from '../handler';

export class PubSub {
  constructor() {}

  async init() {
    subscribe('position-tracker', async (message) => {
      await handlerCoordinates.execute(message);
    });
  }
}
