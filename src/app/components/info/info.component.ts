import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CartItem } from 'src/app/models/cartItem';
import { MovieDetails } from 'src/app/models/movie';
import { MovieApiService } from 'src/app/services/movie-api.service';
import { environment } from 'src/environments/environment';
import {Toast} from 'bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import * as actions from 'src/app/store/actions/cart.actions';


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
  cartItems: Array<CartItem> = [];

  constructor(private route: ActivatedRoute, private movieApiService: MovieApiService, private store: Store<AppState>) { }

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
    this.store.select('cart').subscribe((cart) => {
      this.cartItems = cart;
    });
  }

  checkItemExists(id: number) {
    return this.cartItems.find(item => item.id === id)
  }

  addToCart(id: number) {
    let cartItemInfo = this.checkItemExists(id)
    if (cartItemInfo) {
      let countItem = cartItemInfo.count;
      this.store.dispatch(actions.deleteItemCart({payload: cartItemInfo}));
      cartItemInfo = {
        id: this.movieInfo.id,
        title: this.movieInfo.title,
        count: countItem + 1,
        price: this.movieInfo.price
      }
      this.store.dispatch(actions.addItemCart({payload: cartItemInfo}));
    } else {
      cartItemInfo = {
        id: this.movieInfo.id,
        title: this.movieInfo.title,
        count: 1,
        price: this.movieInfo.price
      }
      this.store.dispatch(actions.addItemCart({payload: cartItemInfo}));
    }
    this.showCartToaster(cartItemInfo.title, cartItemInfo.price);
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
