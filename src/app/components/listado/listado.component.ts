import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api.service';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  movieData: any = []
  moviePosterPath: string = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2'
  onDestroy$ = new Subject<any>();

  constructor(private movieApiService: MovieApiService) { }

  ngOnInit(): void {
    this.movieApiService.getMovies().pipe(takeUntil(this.onDestroy$))
    .subscribe((data) => (this.movieData = data.results))
  }

}
