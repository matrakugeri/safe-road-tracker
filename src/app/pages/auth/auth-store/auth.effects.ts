import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess, register, registerSuccess } from './auth.actions';
import { AuthService } from '../services/auth-service';
import { catchError, debounceTime, delay, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  router = inject(Router);
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
                error: err.error.message,
              }),
            ),
          ),
        );
      }),
    ),
  );
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap((action) => {
        return this.authService
          .register({
            firstName: action.firstName,
            lastName: action.lastName,
            email: action.email,
            password: action.password,
          })
          .pipe(
            map((res) =>
              registerSuccess({
                user: res.data,
                token: res.token,
              }),
            ),
            catchError((err) => {
              return of(
                loginFailure({
                  error: err.error.message,
                }),
              );
            }),
          );
      }),
    ),
  );
  success$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess, registerSuccess),
        tap({
          next: (action) => this.router.navigate(['/map']),
        }),
      ),
    { dispatch: false },
  );
}
