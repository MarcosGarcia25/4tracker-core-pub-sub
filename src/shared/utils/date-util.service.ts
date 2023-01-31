import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { IDateUtilService } from './interfaces/IDateUtilService.interface';

dayjs.extend(utc);
dayjs.extend(timezone);

export class DateUtilService implements IDateUtilService {
  createDateUTC(input: string) {
    return this.createDate(input).utc();
  }

  createDate(input: string) {
    return dayjs(input);
  }

  unixToDate(input: number) {
    return dayjs.unix(input).toDate();
  }

  unixToTimestamp(input: number) {
    return dayjs.unix(input);
  }
}
