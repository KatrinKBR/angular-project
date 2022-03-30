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

  }

  getUsers<User>(url: string) {
    return this.http.get<User>(url)
  }

  postUser<User>(url: string, body: any) {
    return this.http.post<User>(url, body)
  }

  putUser<User>(url: string, id: number, body: any) {
    return this.http.put<User>(`${url}/${id}`, body)
  }

  deleteUser<User>(url: string, id: number) {
    return this.http.delete<User>(`${url}/${id}`);
  }
}
