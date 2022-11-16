import express, { Request, Response } from 'express';
import cors from 'cors';
import winston from 'winston';
import expressWinston from 'express-winston';
import { router } from './router';
import { restResponseTimeHistogram } from '../metrics';

const app = express();
let initRequest = null;

app
  .use(cors())
  .use(express.json({ limit: '10mb' }))
  .use(express.json())
  .use(
    expressWinston.logger({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: 'YYYY/MM/DD HH:mm:ss' }),
        winston.format.printf((info) => `[${info.timestamp}] [${info.level}]: ${info.message}`),
      ),
      transports: [new winston.transports.Console()],

      meta: false,
      msg: 'HTTP  ',
      expressFormat: true,
      colorize: false,
      ignoreRoute: (request: Request, response: Response) => {
        initRequest = new Date().getTime();
        return ['/metrics'].indexOf(request?.path) !== -1;
      },
      skip: (request: Request, response: Response) => {
        const now = new Date().getTime();
        if (request?.originalUrl) {
          const timeRequest = now - initRequest;
          restResponseTimeHistogram.observe(
            {
              method: request.method,
              route: request?.originalUrl,
              status_code: response.statusCode,
              time: timeRequest,
            },
            timeRequest,
          );
        }

        return false;
      },
    }),
  )
  .use(router);

export { app };
