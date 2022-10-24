import dotenv from 'dotenv';
import { App } from './app';
dotenv.config();

const app = new App();
app.init();

console.log('Consumer running');
