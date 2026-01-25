import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    loadComponent: () => import('../app/layout/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/containers/login/login').then((m) => m.Login),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('../app/pages/auth/containers/sign-up/sign-up').then((m) => m.SignUp),
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
