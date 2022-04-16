import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { deleteItemCart } from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  cartData: CartItem[] = [];
  onDestroy$ = new Subject<any>();

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.getCartItems()
  }

  calculateTotal() {
    let sum: number = 0
    for (let element of this.cartData) {
      sum += element.price
    }
    return sum
  }

  getCartItems() {
    this.store.select('cart').subscribe((cart) => {
      this.cartData = cart;
    });
  }

  deleteItem(item: CartItem) {
    this.store.dispatch(deleteItemCart({payload: item}));
    this.getCartItems()
  }

  shop() {
    console.log("Compra exitosa")
  }

}
