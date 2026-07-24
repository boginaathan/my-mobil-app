import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'room/:id',
    loadComponent: () => import('./pages/room-detail/room-detail.page').then((m) => m.RoomDetailPage),
  },
  {
    path: 'device/:id',
    loadComponent: () => import('./pages/device-detail/device-detail.page').then((m) => m.DeviceDetailPage),
  },
];
