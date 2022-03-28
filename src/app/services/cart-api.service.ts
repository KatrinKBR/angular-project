import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private http: HttpClient) { }

  getAllItems<Cart>() {
    return this.http.get<Cart>(environment.CART_URL)
  }

  getItem<Cart>(id: number) {
    return this.http.get<Cart>(`${environment.CART_URL}/${id}`)
  }

  postItem<Cart>(body: any) {
    return this.http.post<Cart>(environment.CART_URL, body)
  }

  putItem<Cart>(body: any, id: number) {
    return this.http.put<Cart>(`${environment.CART_URL}/${id}`, body)
  }

  deleteItem<Cart>(body: any, id: number) {
    return this.http.delete<Cart>(`${environment.CART_URL}/${id}`, body)
  }

}
