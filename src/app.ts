import { app } from './http-server/app';
import { ISubscribeService } from './subscribe-service/interface/ISubscribeService.interface';
import './entities';
import { appMetrics } from './metrics';
export default class App {
  constructor(private subscribeService: ISubscribeService) {}

  async initSubscribe() {
    await this.subscribeService.journeyStart();
    await this.subscribeService.positionTracker();
    await this.subscribeService.trackerCompany();
    await this.subscribeService.trackerDevice();
  }

  async initHttpServer() {
    const PORT = process.env.API_PORT || 6000;
    app.listen(PORT, () => console.log('Server online port', PORT));
  }

  async initMetricsServer() {
    const METRICS_PORT = process.env.METRICS_PORT || 6001;
    appMetrics.listen(METRICS_PORT, () => console.log('Metrics online port', METRICS_PORT));
  }
}
