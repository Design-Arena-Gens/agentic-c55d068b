import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContaPagarListComponent } from './components/conta-pagar/conta-pagar-list.component';
import { ContaReceberListComponent } from './components/conta-receber/conta-receber-list.component';
import { PlanoContasListComponent } from './components/plano-contas/plano-contas-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contas-pagar', component: ContaPagarListComponent },
  { path: 'contas-receber', component: ContaReceberListComponent },
  { path: 'plano-contas', component: PlanoContasListComponent }
];
