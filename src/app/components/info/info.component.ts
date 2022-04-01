import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { MovieDetails } from 'src/app/models/movie';
import { CartApiService } from 'src/app/services/cart-api.service';
import { MovieApiService } from 'src/app/services/movie-api.service';
import { environment } from 'src/environments/environment';
import {Toast} from 'bootstrap'


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  @ViewChild('myToast',{static:true}) toastEl!: ElementRef<HTMLDivElement>;
  toast: Toast | null = null;

  movieInfo!: MovieDetails;
  moviePosterPath = environment.MOVIE_POSTER_URL;
  onDestroy$ = new Subject<any>();
  cartItems!: Cart[];

  constructor(private route: ActivatedRoute, private movieApiService: MovieApiService, private cartApiService: CartApiService) { }

  ngOnInit(): void {
    this.getMovieDetails();
    this.getCartItems();
    this.toast = new Toast(this.toastEl.nativeElement,{});
  }

  getMovieDetails() {
    let movieId = this.route.snapshot.params['id'];
    this.movieApiService.getMovieInfo(movieId).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data) => {
        this.movieInfo = data;
        this.movieInfo.price = this.priceSetter(this.movieInfo.runtime)
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

  getCartItems() {
    this.cartApiService.getAllItems<Cart[]>().pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data) => {
        this.cartItems = data
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }

  checkItemExists(id: number) {
    return this.cartItems.find(item => item.id === id)
  }

  addToCart(id: number) {
    let cartItemInfo = this.checkItemExists(id)

    if (cartItemInfo) {
      cartItemInfo.count += 1;
      this.cartApiService.putItem<Cart>(cartItemInfo, id).pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => {
          console.log(`Película añadida exitosamente al carrito`);
          this.showCartToaster(data.title, data.price);
        },
        error: (error) => console.log('Se ha producido un error', error)
      });
    } else {
      cartItemInfo = {
        id: this.movieInfo.id,
        title: this.movieInfo.title,
        count: 1,
        price: this.movieInfo.price
      }
      this.cartApiService.postItem<Cart>(cartItemInfo).pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data) => {
          console.log(`Película añadida exitosamente al carrito`);
          this.showCartToaster(data.title, data.price);
        },
        error: (error) => console.log('Se ha producido un error', error)
      });
    }
  }

  showCartToaster(title: string, price: number){
    let toastContent = document.getElementById('toastContent');
    toastContent?.append(`${title} $${price}`);
    this.toast!.show();
  }

  priceSetter(runtime: number) {
    return runtime >= 120 ? 5000 : 4000
  }

  audioMapper(iso: string) {
    const LANGUAGES: { [key: string]: any } = {
      en: 'Inglés',
      es: 'Español',
      fr: 'Francés',
      it: 'Italiano',
      de: 'Alemán',
      ja: 'Japonés',
      kr: 'Coreano'
    }

    const DEFAULT_LANGUAGE = 'Idioma desconocido'

    return LANGUAGES[iso] || DEFAULT_LANGUAGE
  }

}
