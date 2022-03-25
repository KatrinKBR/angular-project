import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(environment.MOVIE_LIST)
  }

  getMovieInfo(id: number): Observable<any> {
    return this.http.get(environment.MOVIE_DETAILS(id))
  }
}
