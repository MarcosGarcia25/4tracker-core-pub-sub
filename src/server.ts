import dotenv from 'dotenv';
dotenv.config();
import App from './app';
import { SubscribeService } from './subscribe-service';

const app = new App(new SubscribeService());
app.initSubscribe();
app.initHttpServe();

console.log('Consumer running');
