import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private http: HttpClient) { }

  getItems<Cart>() {
    return this.http.get<Cart[]>(environment.CART_URL)
  }

  postItem<Cart>(body: any) {
    return this.http.post<Cart>(environment.CART_URL, body)
  }
}
