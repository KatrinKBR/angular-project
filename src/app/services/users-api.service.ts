import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  token: string = ''

  constructor(private http: HttpClient) { }

  login(body: any) {
    return this.http.post('http://localhost:8080/login', body)
  }

  register(body: any) {
    return this.http.post('http://localhost:8080/register', body)
  }

  datos() {
    return this.http.get('http://localhost:8080/datos')
  }

  logout() {
    return this.http.get('http://localhost:8080/logout')
  }
}
