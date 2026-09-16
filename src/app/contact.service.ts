
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactRequest } from '../models/contact-request';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8082/api/contact';

  constructor(private http: HttpClient) {}

  submitContactForm(data: ContactRequest): Observable<string> {
    console.log('API URL used:', this.apiUrl);
    return this.http.post(this.apiUrl, data, { responseType: 'text' });
  }
}
