import dotenv from 'dotenv';
dotenv.config();
import App from './app';
import { JourneyService } from './handler/journey';
import { PositionTrackerService } from './handler/position-tracker';
import { TrackerCompanyService } from './handler/tracker-company';
import { CacheProvider } from './providers/cache';
import { SubscribeService } from './subscribe-service';

const app = new App(
  new SubscribeService(
    new TrackerCompanyService(new CacheProvider()),
    new PositionTrackerService(new CacheProvider()),
    new JourneyService(),
  ),
);
app.initSubscribe();
app.initHttpServer();
app.initMetricsServer();

console.log('Consumer running');
