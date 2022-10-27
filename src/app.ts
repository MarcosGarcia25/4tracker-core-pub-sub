import { subscribe } from './providers/pubsub';
import handlerPositionTracker from './handler/position-tracker';
import handlerTrackerCompany from './handler/tracker-company';

subscribe('position-tracker', async (payload) => {
  await handlerPositionTracker.execute(JSON.parse(payload));
})
  .then(() => console.log('Subscribe Position Tracker running'))
  .catch(console.error);

subscribe('tracker-company', async (payload) => {
  await handlerTrackerCompany.execute(JSON.parse(payload));
})
  .then(() => console.log('Subscribe Tracker Company running'))
  .catch(console.error);

subscribe('remove-tracker-company', async (payload) => {
  await handlerTrackerCompany.remove(JSON.parse(payload));
})
  .then(() => console.log('Subscribe Remove Tracker Company running'))
  .catch(console.error);
