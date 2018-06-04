import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GyanmatrixService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  signUp(userDetails): Observable<any> {
    return this.http.post(`${this.url}/api/v1/users/register`, { email: userDetails.email, password: userDetails.password });
  }

  login(userDetails): Observable<any> {
    return this.http.post(`${this.url}/api/v1/users/login`, { email: userDetails.email, password: userDetails.password });
  }

  getAllPlayers(token): Observable<any> {
    return this.http.get(`${this.url}/api/v1/players`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    });
  }
}
