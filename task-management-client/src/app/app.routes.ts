import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Projects } from './pages/projects/projects';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'projects', component: Projects, canActivate: [authGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
