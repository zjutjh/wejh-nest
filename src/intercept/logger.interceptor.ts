import {
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const now = Date.now();
    // const req = context.getArgs();
    // console.log(req);
    return call$.pipe(
      tap(() =>
        Logger.log(
          JSON.stringify({
            request: context.getClass().name + ':' + context.getHandler().name,
            // params: req.params,
            // query: req.query,
            // body: req.body,
            duration: `${Date.now() - now}ms`,
          }),
          'Request',
        ),
      ),
    );
  }
}
