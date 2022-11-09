export interface ISuccessResponse {
  content: any;
}

export interface IPaginateResponse {
  content: any;
  pagination: IPagination;
}

export interface IPagination {
  total: number;
  numberOfElements: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}

export interface IErrorResponse {
  code: string;
  message: string;
}
