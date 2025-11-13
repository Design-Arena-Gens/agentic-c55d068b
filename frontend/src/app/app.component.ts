import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
        <li><a routerLink="/contas-pagar" routerLinkActive="active">Contas a Pagar</a></li>
        <li><a routerLink="/contas-receber" routerLinkActive="active">Contas a Receber</a></li>
        <li><a routerLink="/plano-contas" routerLinkActive="active">Plano de Contas</a></li>
      </ul>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'ERP Financeiro';
}
