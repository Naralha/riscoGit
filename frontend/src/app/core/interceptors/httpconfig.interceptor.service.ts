import { SpinnerService } from '../../shared/services/spinner.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NotificacaoService } from 'src/app/shared/services/notificacao.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private spinner: SpinnerService,
    private notify: NotificacaoService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.showSpinner();
    // const token: string = localStorage.getItem('token');

    // if (token) {
    //     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    // }
    // if (!request.headers.has('Content-Type')) {
    //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    // }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next
      .handle(request)
      .pipe(
        catchError((err) => {
          this.spinner.hideSpinner();
          switch (err.status) {
            case 500:
              this.notify.showError(err.status, err.statusText);
              break;
            case 504:
              this.notify.showError(err.status, err.statusText);
              break;
          }
          console.log('HTTP Interceptor error >', err);
          return err;
        })
      )
      .pipe(
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            this.spinner.hideSpinner();
          }
          console.log('HTTP Interceptor success >', evt);
          return evt;
        })
      );
  }
}
