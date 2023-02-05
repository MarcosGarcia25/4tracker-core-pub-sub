import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import messagesSchemas from './constants/messagesSchemas.constant';
import { ErrorCode } from '../shared/enum/ErrorCode.enum';
import { HttpStatus } from '../shared/enum/HttpStatus.enum';
import { CommandType } from '../http-server/domain/sms/interfaces';

const sendCommand = async (request: Request, response: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    trackerId: Joi.string().uuid().label('trackerId').required().messages(messagesSchemas),
    message: Joi.string()
      .label('message')
      .valid(...Object.values(CommandType))
      .required()
      .messages(messagesSchemas),
  });

  const validate = schema.validate(request.body);

  if (validate.error) {
    const errorHandler = validate.error.details.map((err) => err.message);
    return response.status(HttpStatus.BAD_REQUEST).json({
      code: ErrorCode.ERROR_FIELD,
      message: errorHandler,
    });
  }

  next();
};

export { sendCommand };
