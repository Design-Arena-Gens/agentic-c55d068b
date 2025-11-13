import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContaReceber } from '../models/conta-receber.model';

@Injectable({
  providedIn: 'root'
})
export class ContaReceberService {
  private apiUrl = 'http://localhost:8080/api/contas-receber';

  constructor(private http: HttpClient) {}

  findAll(): Observable<ContaReceber[]> {
    return this.http.get<ContaReceber[]>(this.apiUrl);
  }

  findById(id: number): Observable<ContaReceber> {
    return this.http.get<ContaReceber>(`${this.apiUrl}/${id}`);
  }

  findByStatus(status: string): Observable<ContaReceber[]> {
    return this.http.get<ContaReceber[]>(`${this.apiUrl}/status/${status}`);
  }

  save(conta: ContaReceber): Observable<ContaReceber> {
    return this.http.post<ContaReceber>(this.apiUrl, conta);
  }

  update(id: number, conta: ContaReceber): Observable<ContaReceber> {
    return this.http.put<ContaReceber>(`${this.apiUrl}/${id}`, conta);
  }

  receber(id: number, conta: ContaReceber): Observable<ContaReceber> {
    return this.http.put<ContaReceber>(`${this.apiUrl}/${id}/receber`, conta);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
