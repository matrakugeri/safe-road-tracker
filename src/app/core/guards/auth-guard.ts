import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { stateSelector, userSelector } from '../../pages/auth/auth-store/auth.selectors';

export const authGuard: CanMatchFn = (): boolean | UrlTree => {
  const store = inject(Store);
  const router = inject(Router);
  const user = store.selectSignal(userSelector);
  const state = store.selectSignal(stateSelector);

  return user() ? true : router.createUrlTree(['/login']);
};
