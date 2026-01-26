import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { authReducer } from './pages/auth/auth-store/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './pages/auth/auth-store/auth.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    provideHttpClient(withInterceptors([AuthInterceptor])),
  ],
};
