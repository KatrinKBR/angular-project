import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { CartApiService } from 'src/app/services/cart-api.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  cartData!: Cart[];
  onDestroy$ = new Subject<any>();

  constructor(private cartApiService: CartApiService) { }

  ngOnInit(): void {
    this.cartApiService.getItems<Cart>().pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data) => {
        this.cartData = data
        console.log(this.cartData)
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

  calculateTotal() {
    let sum: number = 0
    for (let element of this.cartData) {
      sum += element.price
    }
    return sum
  }

  shop() {
    console.log("Compra exitosa")
  }

}
