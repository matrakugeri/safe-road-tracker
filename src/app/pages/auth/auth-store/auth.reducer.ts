import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user-model';
import {
  clearError,
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
  login,
  loginFailure,
  loginSuccess,
  register,
  registerFailure,
  registerSuccess,
} from './auth.actions';

export interface AuthState {
  user: null | User;
  loading: boolean;
  loaded: boolean;
  authChecked: boolean;
  error: null | string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  loaded: false,
  authChecked: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => {
    console.log('test');
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
    loaded: true,
    loading: false,
    authChecked: true,
  })),
  on(loginFailure, (state, { error }) => {
    console.log(error);
    return { ...state, error, loading: false };
  }),
  on(register, (state) => ({
    ...state,
    loading: true,
  })),
  on(registerSuccess, (state, { user }) => ({
    ...state,
    user,
    loaded: true,
    loading: false,
    authChecked: true,
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(loadCurrentUser, (state) => ({
    ...state,
  })),
  on(loadCurrentUserSuccess, (state, { user }) => ({
    ...state,
    user,
    authChecked: true,
    error: null,
  })),
  on(loadCurrentUserFailure, (state) => ({
    ...state,
    authChecked: true,
  })),
  on(clearError, (state) => ({
    ...state,
    error: null,
  })),
);
