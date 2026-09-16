import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ContactRequest } from '../models/contact-request';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly apiUrl = 'http://localhost:8082/api/contact';

  constructor(private readonly http: HttpClient) {}

  submitContactForm(payload: ContactRequest): Observable<string> {
    return this.http.post(this.apiUrl, payload, { responseType: 'text' });
  }
}
