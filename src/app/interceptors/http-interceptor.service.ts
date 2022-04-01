import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersApiService } from '../services/users-api.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private usersApi: UsersApiService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let req;
      if (request.url.indexOf('themoviedb') > -1)  {
        req = request.clone();
      } else {
        req = request.clone({
          headers: this.addToken(request.headers)
        });
      }

      return next.handle(req);
  }

  private addToken(headers: HttpHeaders) : HttpHeaders {
    const token = ''
    headers = headers.append('access-token', this.usersApi.token)

    return headers;
  }
}