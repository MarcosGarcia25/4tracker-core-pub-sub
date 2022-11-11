import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import messagesSchemas from './constants/messagesSchemas.constant';
import { ErrorCode } from '../shared/enum/ErrorCode.enum';
import { HttpStatus } from '../shared/enum/HttpStatus.enum';

const lastVehicleByCompanyCoordinateSchema = async (request: Request, response: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    companyId: Joi.string().uuid().label('companyId').required().messages(messagesSchemas),
    latitude: Joi.number().label('latitude').required().messages(messagesSchemas),
    longitude: Joi.string().label('longitude').required().messages(messagesSchemas),
    maxDistance: Joi.number().label('maxDistance').optional().messages(messagesSchemas),
  });

  const validate = schema.validate(request.query);

  if (validate.error) {
    const errorHandler = validate.error.details.map((err) => err.message);
    return response.status(HttpStatus.BAD_REQUEST).json({
      code: ErrorCode.ERROR_FIELD,
      message: errorHandler,
    });
  }

  next();
};

export { lastVehicleByCompanyCoordinateSchema };
