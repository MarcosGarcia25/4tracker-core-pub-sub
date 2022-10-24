import { PubSub } from './pub-sub';

export class App {
  private pubsub: PubSub;

  constructor() {
    this.pubsub = new PubSub();
  }

  init() {
    this.pubsub.init();
  }
}
