import { Dayjs } from 'dayjs';

export interface IDateUtilService {
  createDateUTC(input: string): Dayjs;
  createDate(input: string): Dayjs;
  unixToDate(input: number): Date;
  unixToTimestamp(input: number): Dayjs;
}
