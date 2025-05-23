// src/common/interceptors/transform-response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        // Ambil statusCode dari return handler atau default dari response
        const statusCode = data?.statusCode ?? response.statusCode;

        // Set HTTP status code
        response.status(statusCode);

        return {
          statusCode,
          status: data?.status || 'success',
          message: data?.message || 'OK',
          data: data?.data ?? data,
        };
      }),
    );
  }
}
