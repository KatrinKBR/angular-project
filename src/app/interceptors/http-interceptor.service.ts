import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersApiService } from '../services/users-api.service';

/* @Injectable({
  providedIn: 'root'
}) */
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private usersApi: UsersApiService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const cloneReq = req.clone({
        headers: this.addToken(req.headers)
      });

      return next.handle(cloneReq);
  }

  private addToken(headers: HttpHeaders) : HttpHeaders {
    const token = ''
    headers = headers.append('access-token', this.usersApi.token)

    return headers;
  }
}