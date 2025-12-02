import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: Array<{ field: string; message: string }>;
  timestamp: string;
  path: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Handle validation errors from class-validator
    if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse
    ) {
      const response = exceptionResponse as any;

      if (Array.isArray(response.message)) {
        // Validation errors from class-validator
        errorResponse.message = 'Validation failed';
        errorResponse.errors = response.message.map((msg: string) => {
          // Parse validation error messages
          const match = msg.match(/^(\w+)\s+(.+)$/);
          return match
            ? { field: match[1], message: match[2] }
            : { field: 'unknown', message: msg };
        });
      } else if (typeof response.message === 'string') {
        errorResponse.message = response.message;
      }
    }

    // Log error (exclude sensitive data)
    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${errorResponse.message}`,
      exception.stack,
    );

    response.status(status).json(errorResponse);
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof Error ? exception.message : 'Internal server error';

    const errorResponse: ErrorResponse = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Log error
    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(status).json(errorResponse);
  }
}
