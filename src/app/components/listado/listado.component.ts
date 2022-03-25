import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api.service';
import { Movie } from 'src/app/models/movie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  moviePosterPath = environment.MOVIE_POSTER;
  movieData: Movie[] = [];
  onDestroy$ = new Subject<any>();

  constructor(private movieApiService: MovieApiService) { }

  ngOnInit(): void {
    this.movieApiService.getMovies().pipe(takeUntil(this.onDestroy$))
    .subscribe((data) => (this.movieData = data.results))
  }
}