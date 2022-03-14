import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  cartData: any = [
    { titulo: "Harry Potter y la piedra filosofal", precio: 3000 },
    { titulo: "Doctor Sueño", precio: 5000 },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  calculateTotal() {
    let sum: number = 0
    for (let element of this.cartData) {
      sum += element.precio
    }
    return sum
  }

  shop() {
    console.log("Compra exitosa")
  }

}
