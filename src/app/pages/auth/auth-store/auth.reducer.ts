import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user-model';
import { register } from './auth.actions';

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
  // on(register, (state:AuthState) => {state.user = }),
);
