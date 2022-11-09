import { Response } from 'express';
import { HttpStatus } from '../shared/enum/HttpStatus.enum';
import { IErrorResponse, IPaginateResponse, ISuccessResponse } from './interfaces/response.interface';

export class BaseController {
  protected success(response: Response, httpStatus: number, payload: object): Response {
    const successResponse: ISuccessResponse = {
      content: payload,
    };

    return response.status(httpStatus || HttpStatus.OK).send(successResponse);
  }

  protected error(response: Response, error): Response {
    const errorResponse: IErrorResponse = {
      code: error.code,
      message: error.message,
    };
    return response.status(error.statusCode || HttpStatus.EXPECTATION_FAILED).json(errorResponse);
  }

  protected paginate(payload: Array<any>, page: number, limit: number, response: Response) {
    const [result, total] = payload;
    const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    const paginate: IPaginateResponse = {
      content: result,
      pagination: {
        total,
        numberOfElements: result.length,
        currentPage: +page,
        nextPage: nextPage,
        prevPage: prevPage,
        lastPage: lastPage,
      },
    };

    return response.status(HttpStatus.OK).send(paginate);
  }
}
