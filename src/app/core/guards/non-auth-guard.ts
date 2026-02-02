import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  isLoggedIn,
  loadingSelector,
  stateSelector,
  userSelector,
} from '../../pages/auth/auth-store/auth.selectors';
import { filter, map, Observable, switchMap, take } from 'rxjs';

export const nonAuthGuard: CanMatchFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(isLoggedIn).pipe(
    take(1),
    map((isLoggedIn) => (!isLoggedIn ? true : router.createUrlTree(['/map']))),
  );
};
