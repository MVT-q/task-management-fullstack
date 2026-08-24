import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Projects } from './pages/projects/projects';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'projects', component: Projects },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
