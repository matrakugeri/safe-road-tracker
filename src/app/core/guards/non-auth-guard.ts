import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { userSelector } from '../../pages/auth/auth-store/auth.selectors';

export const nonAuthGuard: CanMatchFn = (): boolean | UrlTree => {
  const store = inject(Store);
  const router = inject(Router);
  const user = store.selectSignal(userSelector);

  return !user() ? true : router.createUrlTree(['/map']);
};
