import dotenv from 'dotenv';
dotenv.config();
import App from './app';
import { JourneyService } from './handler/journey';
import { PositionTrackerService } from './handler/position-tracker';
import { TrackerCompanyService } from './handler/tracker-company';
import { SubscribeService } from './subscribe-service';

const app = new App(
  new SubscribeService(new TrackerCompanyService(), new PositionTrackerService(), new JourneyService()),
);
app.initSubscribe();
app.initHttpServer();
app.initMetricsServer();

console.log('Consumer running');
