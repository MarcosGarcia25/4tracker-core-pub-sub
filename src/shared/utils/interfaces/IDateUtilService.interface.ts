export interface IDateUtilService {
  createDateUTC(input: string);
  createDate(input: string);
  unixToDate(input?: number);
  unixToTimestamp(input: number);
}
