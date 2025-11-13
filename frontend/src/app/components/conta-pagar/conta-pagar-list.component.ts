import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContaPagar } from '../../models/conta-pagar.model';
import { ContaPagarService } from '../../services/conta-pagar.service';

@Component({
  selector: 'app-conta-pagar-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h1>Contas a Pagar</h1>

      <div style="margin: 20px 0;">
        <button class="btn btn-primary" (click)="filterByStatus('')">Todas</button>
        <button class="btn btn-warning" (click)="filterByStatus('PENDENTE')">Pendentes</button>
        <button class="btn btn-success" (click)="filterByStatus('PAGO')">Pagas</button>
        <button class="btn btn-danger" (click)="filterByStatus('VENCIDO')">Vencidas</button>
      </div>

      <div *ngIf="loading" class="loading">Carregando...</div>

      <div *ngIf="error" class="error">{{ error }}</div>

      <table *ngIf="!loading && contas.length > 0">
        <thead>
          <tr>
            <th>Fornecedor</th>
            <th>Descrição</th>
            <th>Nº Documento</th>
            <th>Emissão</th>
            <th>Vencimento</th>
            <th>Valor Original</th>
            <th>Valor Total</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let conta of contas">
            <td>{{ conta.fornecedorNome }}</td>
            <td>{{ conta.descricao }}</td>
            <td>{{ conta.numeroDocumento }}</td>
            <td>{{ conta.dataEmissao | date: 'dd/MM/yyyy' }}</td>
            <td>{{ conta.dataVencimento | date: 'dd/MM/yyyy' }}</td>
            <td>{{ conta.valorOriginal | currency: 'BRL' }}</td>
            <td>{{ conta.valorTotal | currency: 'BRL' }}</td>
            <td><span class="status-badge status-{{ conta.status.toLowerCase() }}">{{ conta.status }}</span></td>
            <td class="actions">
              <button class="btn btn-success" *ngIf="conta.status === 'PENDENTE'" (click)="pagar(conta)">Pagar</button>
              <button class="btn btn-danger" (click)="delete(conta.id!)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="!loading && contas.length === 0" class="loading">Nenhuma conta a pagar encontrada</p>
    </div>
  `
})
export class ContaPagarListComponent implements OnInit {
  contas: ContaPagar[] = [];
  loading = false;
  error = '';

  constructor(private service: ContaPagarService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.error = '';
    this.service.findAll().subscribe({
      next: (data) => {
        this.contas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar contas a pagar';
        this.loading = false;
        console.error(err);
      }
    });
  }

  filterByStatus(status: string): void {
    this.loading = true;
    this.error = '';

    if (status === '') {
      this.loadAll();
      return;
    }

    this.service.findByStatus(status).subscribe({
      next: (data) => {
        this.contas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao filtrar contas';
        this.loading = false;
        console.error(err);
      }
    });
  }

  pagar(conta: ContaPagar): void {
    const pagamento: ContaPagar = {
      ...conta,
      dataPagamento: new Date().toISOString().split('T')[0],
      valorPago: conta.valorTotal,
      status: 'PAGO'
    };

    this.service.pagar(conta.id!, pagamento).subscribe({
      next: () => {
        this.loadAll();
      },
      error: (err) => {
        this.error = 'Erro ao realizar pagamento';
        console.error(err);
      }
    });
  }

  delete(id: number): void {
    if (confirm('Deseja realmente excluir esta conta?')) {
      this.service.delete(id).subscribe({
        next: () => {
          this.loadAll();
        },
        error: (err) => {
          this.error = 'Erro ao excluir conta';
          console.error(err);
        }
      });
    }
  }
}
