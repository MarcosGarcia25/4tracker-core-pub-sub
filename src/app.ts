import { app } from './http-server/app';
import { ISubscribeService } from './subscribe-service/interface/ISubscribeService.interface';
import './entities';
export default class App {
  constructor(private subscribeService: ISubscribeService) {}

  async initSubscribe() {
    await this.subscribeService.journeyStart();
    await this.subscribeService.positionTracker();
    await this.subscribeService.trackerCompany();
    await this.subscribeService.removeTrackerCompany();
  }

  async initHttpServe() {
    const PORT = process.env.API_PORT || 6000;
    app.listen(PORT, () => console.log('Server online port', PORT));
  }
}
