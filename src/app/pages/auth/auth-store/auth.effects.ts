import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess, register } from './auth.actions';
import { AuthService } from '../services/auth-service';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ email, password }) => {
        return this.authService.login(email, password).pipe(
          map((res) =>
            loginSuccess({
              user: res.data,
              token: res.token,
            }),
          ),
          catchError((err) =>
            of(
              loginFailure({
                error: err.error?.message || 'Login failed',
              }),
            ),
          ),
        );
      }),
    ),
  );
}
