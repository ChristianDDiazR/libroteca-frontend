import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  {
    path: 'books',
    loadChildren: () => import('./features/books/books-routing.module').then(m => m.BooksRoutingModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile-routing.module').then(m => m.ProfileRoutingModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'lists',
    loadChildren: () => import('./features/lists/lists-routing.module').then(m => m.ListsRoutingModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/books' }
];

