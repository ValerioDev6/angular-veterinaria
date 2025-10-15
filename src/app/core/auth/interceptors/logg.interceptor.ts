import {
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { map } from 'rxjs';

export const LoggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('REQUEST...');
  console.log(req.body);
  console.log(req.url);
  console.log(req.method);

  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        console.log('RESPONSE...');
        console.log(event.body);
      }
      return event;
    }),
  );
};
