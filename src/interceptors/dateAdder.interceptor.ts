import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DateAddedInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = new Date();
    const format = now.toLocaleDateString('es-COL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const request = context.switchToHttp().getRequest();
    request.now = format;
    return next.handle();
  }
}
