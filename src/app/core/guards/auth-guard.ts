import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  isLoggedIn,
  loadingSelector,
  stateSelector,
  userSelector,
} from '../../pages/auth/auth-store/auth.selectors';
import { filter, map, Observable, switchMap, take } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);
  const loggedIn = store.select(isLoggedIn);

  return loggedIn.pipe(
    map((isLoggedIn) => {
      if (!isLoggedIn) {
        return router.createUrlTree(['/login']);
      }
      return true;
    }),
  );
};
