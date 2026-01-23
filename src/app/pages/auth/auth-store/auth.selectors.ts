import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const authSelector = createFeatureSelector<AuthState>('auth');

export const userSelector = createSelector(authSelector, (state: AuthState) => state.user);
export const tokenSelector = createSelector(authSelector, (state: AuthState) => state.token);
export const loadingSelector = createSelector(authSelector, (state: AuthState) => state);
