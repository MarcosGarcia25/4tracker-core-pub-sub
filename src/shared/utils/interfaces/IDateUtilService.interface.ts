import { Dayjs } from 'dayjs';

export interface IDateUtilService {
  createDateUTC(input?: Dayjs);
  createDate(input?: Dayjs);
  unixToDate(input?: number);
  unixToTimestamp(input: number);
}
