import {MiddlewareFunction} from '@nestjs/common';
import {createNamespace} from 'cls-hooked';

export class SessionMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return async (req: any, res, next) => {
      const session = createNamespace('session');
      session.run(() => {
        session.set('context', {
          req,
          res,
        });
        next();
      });
    };
  }
}
