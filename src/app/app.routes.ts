import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/containers/auth/auth').then((m) => m.Auth),
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
    redirectTo: 'auth',
  },
];
