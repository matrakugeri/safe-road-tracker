import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  loadingSelector,
  stateSelector,
  userSelector,
} from '../../pages/auth/auth-store/auth.selectors';
import { filter, map, Observable, switchMap, take } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const store = inject(Store);
  const router = inject(Router);
  const user = store.select(userSelector);
  const loading = store.select(loadingSelector);
  const state = store.selectSignal(stateSelector);

  return loading.pipe(
    filter((loading) => !loading),
    switchMap(() => user),
    take(1),
    map((user) => {
      console.log(user);
      if (user) return true;
      return router.createUrlTree(['/login']);
    }),
  );
  // console.log(user());

  // if (user() && state().authChecked) return true;
  // return router.createUrlTree(['/login']);

  // return user() ? true : router.createUrlTree(['/login']);
};
