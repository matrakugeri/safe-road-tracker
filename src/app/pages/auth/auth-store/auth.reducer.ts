import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user-model';
import {
  clearError,
  login,
  loginFailure,
  loginSuccess,
  register,
  registerFailure,
  registerSuccess,
} from './auth.actions';

export interface AuthState {
  user: null | User;
  token: null | string;
  loading: boolean;
  loaded: boolean;
  error: null | string;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  loaded: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => {
    console.log('test');
    return {
      ...state,
      loading: true,
    };
  }),
  on(loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loaded: true,
    loading: false,
  })),
  on(loginFailure, (state, { error }) => {
    console.log(error);
    return { ...state, error, loading: false };
  }),
  on(register, (state) => ({
    ...state,
    loading: true,
  })),
  on(registerSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    loaded: true,
    loading: false,
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(clearError, (state) => ({
    ...state,
    error: null,
  })),
);
