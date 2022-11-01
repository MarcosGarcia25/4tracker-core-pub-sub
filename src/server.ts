import dotenv from 'dotenv';
dotenv.config();
import App from './app';

const app = new App();
app.initSubscribe();

console.log('Consumer running');
