import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private baseUrl = '/api/content';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  create(content: any): Observable<any> {
    return this.http.post(this.baseUrl, content, { headers: this.getAuthHeaders() });
  }

  update(id: string, content: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, content, { headers: this.getAuthHeaders() });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
