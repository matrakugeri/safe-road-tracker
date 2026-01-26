import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export const AuthInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const clonedReq = req.clone({
    withCredentials: true,
  });
  return next(clonedReq);
};
