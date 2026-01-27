import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { userSelector } from '../pages/auth/auth-store/auth.selectors';
import { loadCurrentUser } from '../pages/auth/auth-store/auth.actions';
import { map } from 'rxjs';

export function initalizeApp() {
  const store = inject(Store);
  const user = store.select(userSelector);
  user.pipe(
    map((user) => {
      if (user) return store.dispatch(loadCurrentUser());
    }),
  );
}
