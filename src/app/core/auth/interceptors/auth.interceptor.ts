import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
){
  const token = inject(AuthService)._token();

  const newRequest = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`)
  })
  return next(newRequest);
}
