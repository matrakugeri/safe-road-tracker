import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const authSelector = createFeatureSelector<AuthState>('auth');

export const stateSelector = createSelector(authSelector, (state: AuthState) => state);
export const userSelector = createSelector(authSelector, (state: AuthState) => state.user);
export const loadingSelector = createSelector(authSelector, (state: AuthState) => state.loading);

export const isLoggedIn = createSelector(authSelector, (state) => state.user !== null);
export const authChecked = createSelector(authSelector, (state: AuthState) => state.authChecked);
