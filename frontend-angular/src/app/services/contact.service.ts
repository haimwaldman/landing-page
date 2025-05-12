import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpClient) {}

  sendMessage(data: { name: string; email: string; message: string }) {
    return this.http.post('/api/contact', data);
  }
}
