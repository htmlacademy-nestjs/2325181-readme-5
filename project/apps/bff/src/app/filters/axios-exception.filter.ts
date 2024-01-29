import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';
import { INTERNAL_SERVER_ERROR_MESSAGE } from '../app.constant';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(error: AxiosError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.statusText || INTERNAL_SERVER_ERROR_MESSAGE;

    response
      .status(status)
      .json({
        statusCode: status,
        message,
      });
  }
}
