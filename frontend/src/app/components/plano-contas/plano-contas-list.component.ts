import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanoContas } from '../../models/plano-contas.model';
import { PlanoContasService } from '../../services/plano-contas.service';

@Component({
  selector: 'app-plano-contas-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h1>Plano de Contas</h1>

      <div *ngIf="loading" class="loading">Carregando...</div>

      <div *ngIf="error" class="error">{{ error }}</div>

      <table *ngIf="!loading && contas.length > 0">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Natureza</th>
            <th>Nível</th>
            <th>Aceita Lançamento</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let conta of contas">
            <td>{{ conta.codigo }}</td>
            <td style="padding-left: {{ conta.nivel * 20 }}px">{{ conta.nome }}</td>
            <td>{{ conta.tipo }}</td>
            <td>{{ conta.natureza }}</td>
            <td>{{ conta.nivel }}</td>
            <td>{{ conta.aceitaLancamento ? 'Sim' : 'Não' }}</td>
            <td>
              <span class="status-badge" [class.status-pago]="conta.ativo" [class.status-cancelado]="!conta.ativo">
                {{ conta.ativo ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <p *ngIf="!loading && contas.length === 0" class="loading">Nenhuma conta encontrada</p>
    </div>
  `
})
export class PlanoContasListComponent implements OnInit {
  contas: PlanoContas[] = [];
  loading = false;
  error = '';

  constructor(private service: PlanoContasService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;
    this.error = '';
    this.service.findAll().subscribe({
      next: (data) => {
        this.contas = data.sort((a, b) => a.codigo.localeCompare(b.codigo));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar plano de contas';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
