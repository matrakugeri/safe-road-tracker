import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { nonAuthGuard } from './core/guards/non-auth-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'map',
  },
  {
    path: '',
    loadComponent: () => import('../app/layout/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/containers/login/login').then((m) => m.Login),
        canMatch: [nonAuthGuard],
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('../app/pages/auth/containers/sign-up/sign-up').then((m) => m.SignUp),
        canMatch: [nonAuthGuard],
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: 'map',
        loadComponent: () => import('./pages/map/containers/map/map').then((m) => m.Map),
        canMatch: [authGuard],
      },
      {
        path: 'report',
        loadComponent: () =>
          import('./pages/report/containers/report/report').then((m) => m.Report),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'map',
  },
];
