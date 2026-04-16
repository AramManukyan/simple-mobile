import { Routes } from '@angular/router';
import { MICRO_ROUTES } from 'dhomie-app';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'micro', pathMatch: 'full' },
  {
    path: 'micro',
    children: MICRO_ROUTES,
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'items',
        loadComponent: () => import('./pages/items/items.page').then((m) => m.ItemsPage),
      },
      {
        path: 'items/:id',
        loadComponent: () =>
          import('./pages/item-details/item-details.page').then((m) => m.ItemDetailsPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'edit-profile',
        loadComponent: () =>
          import('./pages/edit-profile/edit-profile.page').then((m) => m.EditProfilePage),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
