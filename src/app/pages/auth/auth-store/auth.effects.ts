import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadCurrentUser,
  loadCurrentUserSuccess,
  loadCurrentUserFailure,
  login,
  loginFailure,
  loginSuccess,
  register,
  registerSuccess,
  logout,
  logoutSuccess,
  setUser,
} from './auth.actions';
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
          map((res) => {
            console.log(res);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            return loginSuccess({
              user: res.data.user,
            });
          }),
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
            map((res) => {
              localStorage.setItem('user', JSON.stringify(res.data.user));
              return registerSuccess({
                user: res.data.user,
              });
            }),
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
  checkUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentUser),
      switchMap(() =>
        this.authService.isLoggedIn().pipe(
          map((res) =>
            loadCurrentUserSuccess({
              user: res.data.user,
            }),
          ),
          catchError((err) => of(loadCurrentUserFailure())),
        ),
      ),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() => {
        return this.authService.logout().pipe(
          map((res) => {
            localStorage.clear();
            this.router.navigate(['/login']);
            return logoutSuccess();
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
