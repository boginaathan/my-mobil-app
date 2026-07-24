import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('../dashboard/dashboard.page').then((m) => m.DashboardPage) },
      { path: 'devices', loadComponent: () => import('../devices/devices.page').then((m) => m.DevicesPage) },
      { path: 'statistics', loadComponent: () => import('../statistics/statistics.page').then((m) => m.StatisticsPage) },
      { path: 'settings', loadComponent: () => import('../settings/settings.page').then((m) => m.SettingsPage) },
    ],
  },
];
