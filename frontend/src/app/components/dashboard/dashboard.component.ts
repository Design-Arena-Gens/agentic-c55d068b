import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaPagarService } from '../../services/conta-pagar.service';
import { ContaReceberService } from '../../services/conta-receber.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h1>Dashboard Financeiro</h1>

      <div class="dashboard-grid">
        <div class="stat-card">
          <div class="stat-label">Contas a Pagar Pendentes</div>
          <div class="stat-value">{{ totalContasPagarPendentes }}</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Contas a Receber Pendentes</div>
          <div class="stat-value">{{ totalContasReceberPendentes }}</div>
        </div>

        <div class="stat-card">
          <div class="stat-label">Total de Contas</div>
          <div class="stat-value">{{ totalContas }}</div>
        </div>
      </div>

      <div class="card" style="margin-top: 30px;">
        <h2>Últimas Contas a Pagar</h2>
        <table *ngIf="ultimasContasPagar.length > 0">
          <thead>
            <tr>
              <th>Fornecedor</th>
              <th>Descrição</th>
              <th>Vencimento</th>
              <th>Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let conta of ultimasContasPagar">
              <td>{{ conta.fornecedorNome }}</td>
              <td>{{ conta.descricao }}</td>
              <td>{{ conta.dataVencimento | date: 'dd/MM/yyyy' }}</td>
              <td>{{ conta.valorTotal | currency: 'BRL' }}</td>
              <td><span class="status-badge status-{{ conta.status.toLowerCase() }}">{{ conta.status }}</span></td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="ultimasContasPagar.length === 0" class="loading">Nenhuma conta a pagar encontrada</p>
      </div>

      <div class="card" style="margin-top: 30px;">
        <h2>Últimas Contas a Receber</h2>
        <table *ngIf="ultimasContasReceber.length > 0">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Descrição</th>
              <th>Vencimento</th>
              <th>Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let conta of ultimasContasReceber">
              <td>{{ conta.clienteNome }}</td>
              <td>{{ conta.descricao }}</td>
              <td>{{ conta.dataVencimento | date: 'dd/MM/yyyy' }}</td>
              <td>{{ conta.valorTotal | currency: 'BRL' }}</td>
              <td><span class="status-badge status-{{ conta.status.toLowerCase() }}">{{ conta.status }}</span></td>
            </tr>
          </tbody>
        </table>
        <p *ngIf="ultimasContasReceber.length === 0" class="loading">Nenhuma conta a receber encontrada</p>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  ultimasContasPagar: any[] = [];
  ultimasContasReceber: any[] = [];
  totalContasPagarPendentes = 0;
  totalContasReceberPendentes = 0;
  totalContas = 0;

  constructor(
    private contaPagarService: ContaPagarService,
    private contaReceberService: ContaReceberService
  ) {}

  ngOnInit(): void {
    this.loadContasPagar();
    this.loadContasReceber();
  }

  loadContasPagar(): void {
    this.contaPagarService.findAll().subscribe({
      next: (data) => {
        this.ultimasContasPagar = data.slice(0, 5);
        this.totalContasPagarPendentes = data.filter(c => c.status === 'PENDENTE').length;
        this.updateTotalContas();
      },
      error: (err) => console.error('Erro ao carregar contas a pagar', err)
    });
  }

  loadContasReceber(): void {
    this.contaReceberService.findAll().subscribe({
      next: (data) => {
        this.ultimasContasReceber = data.slice(0, 5);
        this.totalContasReceberPendentes = data.filter(c => c.status === 'PENDENTE').length;
        this.updateTotalContas();
      },
      error: (err) => console.error('Erro ao carregar contas a receber', err)
    });
  }

  updateTotalContas(): void {
    this.totalContas = this.ultimasContasPagar.length + this.ultimasContasReceber.length;
  }
}
