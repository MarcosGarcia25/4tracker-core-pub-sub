import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { IDateUtilService } from './interfaces/IDateUtilService.interface';

dayjs.extend(utc);
dayjs.extend(timezone);

export class DateUtilService implements IDateUtilService {
  createDateUTC(input: string): dayjs.Dayjs {
    return this.createDate(input).utc();
  }

  createDate(input: string): dayjs.Dayjs {
    return dayjs(input);
  }

  unixToDate(input: number): Date {
    return dayjs.unix(input).toDate();
  }

  unixToTimestamp(input: number): dayjs.Dayjs {
    return dayjs.unix(input);
  }
}
