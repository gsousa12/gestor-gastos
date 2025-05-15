import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, delay as rxjsDelay } from 'rxjs';

@Injectable()
export class DelayInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Adiciona 5 segundos de delay (5000 milissegundos)
    return next.handle().pipe(rxjsDelay(2000));
  }
}
