import { createAction, props } from '@ngrx/store';
import { User } from '../models/user-model';

export const login = createAction(`[User Login]`, props<{ email: string; password: string }>());
export const loginSuccess = createAction(
  `[User Login Success]`,
  props<{ user: User; token: string }>(),
);
export const loginFailure = createAction(`[User Login Failure]`, props<{ error: string }>());

export const register = createAction(`[User Register]`);
