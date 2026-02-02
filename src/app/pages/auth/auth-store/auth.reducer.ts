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
  logout,
  logoutSuccess,
  register,
  registerFailure,
  registerSuccess,
  setUser,
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
  on(loginSuccess, (state, { user }) => {
    console.log(user);
    return { ...state, user, error: null, loaded: true, loading: false, authChecked: true };
  }),
  on(loginFailure, (state, { error }) => {
    console.log(error);
    return { ...state, error, loading: false, authChecked: false };
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
    authChecked: false,
    error,
  })),
  on(loadCurrentUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
  })),
  on(loadCurrentUserSuccess, (state, { user }) => {
    console.log('user set', user);
    return {
      ...state,
      loading: false,
      loaded: true,
      user,
      authChecked: true,
      error: null,
    };
  }),
  on(loadCurrentUserFailure, (state) => ({
    ...state,
    loading: false,
    authChecked: false,
  })),
  on(logout, (state) => ({
    ...state,
    loading: true,
    authChecked: false,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    loading: false,
    user: null,
  })),
  on(setUser, (state, { user }) => ({
    ...state,
    user,
  })),
  on(clearError, (state) => ({
    ...state,
    error: null,
  })),
);
