import { createAction, props } from '@ngrx/store';

export const login = createAction(`[User Login]`, props<{ email: string; password: string }>);
export const loginSuccess = createAction(`[User Login Success]`);
export const loginFailure = createAction(`[User Login Failure]`);

export const register = createAction(`[User Register]`);
