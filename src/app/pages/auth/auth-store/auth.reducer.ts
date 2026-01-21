import { createReducer } from '@ngrx/store';
import { User } from '../models/user-model';

interface AuthState {
  user: null | User;
  token: null | string;
}

const initialState = {
  user: null,
  token: null,
};

export const authReducer = createReducer(initialState);
