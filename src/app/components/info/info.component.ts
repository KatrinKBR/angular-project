import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MovieDetails } from 'src/app/models/movie';
import { MovieApiService } from 'src/app/services/movie-api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  movieInfo!: MovieDetails;
  moviePosterPath = environment.MOVIE_POSTER;
  onDestroy$ = new Subject<any>();

  constructor(private route: ActivatedRoute, private movieApiService: MovieApiService) { }

  ngOnInit(): void {
    let movieId = this.route.snapshot.params['id'];
    this.movieApiService.getMovieInfo(movieId).pipe(takeUntil(this.onDestroy$))
      .subscribe(data => {
        this.movieInfo = data;
        this.movieInfo.price = this.priceSetter(this.movieInfo.runtime)
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
}
