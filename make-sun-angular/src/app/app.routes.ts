import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component'; // Importe o componente de login

// Defina suas rotas
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Outras rotas
];
