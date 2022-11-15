import express, { Request, Response } from 'express';
import client from 'prom-client';
const appMetrics = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: 'core_rest_response_time_duration_seconds',
  help: 'REST API response time in seconds',
  labelNames: ['method', 'route', 'status_code', 'time'],
});

export const pubSubTimeHistogram = new client.Histogram({
  name: 'core_pub_sub_time_duration_seconds',
  help: 'PubSub response time in seconds',
  labelNames: ['name', 'time'],
});

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics();

appMetrics.get('/metrics', async (request: Request, response: Response) => {
  response.set('Content-Type', client.register.contentType);

  return response.send(await client.register.metrics());
});

export { appMetrics };
