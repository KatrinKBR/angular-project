import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(private http: HttpClient) { }

  getUsers<User>(url: string) {
    return this.http.get<User>(url)
  }

  postUser<User>(url: string, body: any) {
    return this.http.post<User>(url, body)
  }
}
