import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api.service';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  movieInfo: any;
  onDestroy$ = new Subject<any>();
  
  constructor(private route: ActivatedRoute, private movieApiService: MovieApiService) { }

  ngOnInit(): void {
    let movieId = this.route.snapshot.params['id'];
    this.movieApiService.getMovieInfo(movieId).pipe(takeUntil(this.onDestroy$))
    .subscribe((data) => (this.movieInfo = data))
  }
}
