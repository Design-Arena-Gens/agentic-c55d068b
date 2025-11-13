import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanoContas } from '../models/plano-contas.model';

@Injectable({
  providedIn: 'root'
})
export class PlanoContasService {
  private apiUrl = 'http://localhost:8080/api/plano-contas';

  constructor(private http: HttpClient) {}

  findAll(): Observable<PlanoContas[]> {
    return this.http.get<PlanoContas[]>(this.apiUrl);
  }

  findById(id: number): Observable<PlanoContas> {
    return this.http.get<PlanoContas>(`${this.apiUrl}/${id}`);
  }

  save(planoContas: PlanoContas): Observable<PlanoContas> {
    return this.http.post<PlanoContas>(this.apiUrl, planoContas);
  }

  update(id: number, planoContas: PlanoContas): Observable<PlanoContas> {
    return this.http.put<PlanoContas>(`${this.apiUrl}/${id}`, planoContas);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
