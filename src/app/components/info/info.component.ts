import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { MovieDetails } from 'src/app/models/movie';
import { CartApiService } from 'src/app/services/cart-api.service';
import { MovieApiService } from 'src/app/services/movie-api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  movieInfo!: MovieDetails;
  moviePosterPath = environment.MOVIE_POSTER_URL;
  onDestroy$ = new Subject<any>();

  constructor(private route: ActivatedRoute, private movieApiService: MovieApiService, private cartApiService: CartApiService) { }

  ngOnInit(): void {
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

  priceSetter(runtime: number) {
    return runtime >= 120 ? 5000 : 4000
  }

  addToCart() {
    this.cartApiService.postItem<Cart>({id: this.movieInfo.id, title: this.movieInfo.title, price: this.movieInfo.price}).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => console.log('Se ha producido un error', error)
    });
  }
}
