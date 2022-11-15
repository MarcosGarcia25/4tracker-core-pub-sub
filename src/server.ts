import dotenv from 'dotenv';
dotenv.config();
import App from './app';
import { SubscribeService } from './subscribe-service';

const app = new App(new SubscribeService());
app.initSubscribe();
app.initHttpServer();
app.initMetricsServer();

console.log('Consumer running');
