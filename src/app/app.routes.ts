import { Routes } from '@angular/router';
import { dashboardRoutes } from './components/dashboard/dashboard.routes';
import {authGuard} from './services/auth.guard'

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'Login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: '', loadComponent: () => import('./components/dashboard/dashboard.component').then(c => c.DashboardComponent), children: dashboardRoutes
  ,    canActivate: [authGuard],},
];
