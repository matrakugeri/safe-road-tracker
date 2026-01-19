import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'map',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/containers/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/containers/register/register').then((m) => m.Register),
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
