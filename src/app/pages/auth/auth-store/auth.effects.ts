import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, register } from './auth.actions';
import { AuthService } from '../services/auth-service';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  signup = createEffect(() => this.actions$.pipe(ofType(login)));
}
