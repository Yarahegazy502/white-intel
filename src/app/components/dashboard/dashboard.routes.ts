import { CorporateComponent } from './components/corporate/corporate.component';
import { CombolistComponent } from './components/combolist/combolist.component';
import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'Accounts', loadComponent: () => import('./components/accounts/accounts.component').then(c => c.AccountsComponent)
  },
  {
    path: 'Combolist', loadComponent: () => import('./components/combolist/combolist.component').then(c => c.CombolistComponent)
  },
  {
    path: 'Corporate', loadComponent: () => import('./components/corporate/corporate.component').then(c => c.CorporateComponent)
  }
]
