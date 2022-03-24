import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PATH_URL } from '../utils/config.url';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(PATH_URL.MOVIE_LIST)
  }

  getMovieInfo(id: number): Observable<any> {
    return this.http.get(PATH_URL.MOVIE_DETAILS(id))
  }
}
