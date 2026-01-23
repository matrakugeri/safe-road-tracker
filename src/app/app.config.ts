import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { authReducer } from './pages/auth/auth-store/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './pages/auth/auth-store/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
  ],
};
