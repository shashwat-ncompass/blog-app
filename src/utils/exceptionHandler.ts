import {
  Res,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

export class customError extends Error {
  statusCode: number;
  data: { message: string; error: string };

  constructor(status: number, message: string, error: string) {
    super(message);
    this.statusCode = status ? status : 500;
    this.data = {
      message: message,
      error: error,
    };
  }
}

@Catch(customError)
export class MyExceptionsFilter implements ExceptionFilter {
  catch(exception: customError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    response.status(exception.statusCode).json({
      statusCode: exception.statusCode,
      data: exception.data,
    });
  }
}
