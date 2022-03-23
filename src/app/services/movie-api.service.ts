import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    let url: string = `https://api.themoviedb.org/3/discover/movie?api_key=5fe1a295cfdf0cd4bad8244749f1d833&language=es-ES&sort_by=popularity.desc&include_adult=false&page=1`
    return this.http.get(url)
  }

  getMovieInfo(id: number): Observable<any> {
    let url: string = `https://api.themoviedb.org/3/movie/${id}?api_key=5fe1a295cfdf0cd4bad8244749f1d833&language=es-ES`
    return this.http.get(url)
  }
}
