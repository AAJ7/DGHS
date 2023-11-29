import { Injectable } from '@angular/core';
import {HttpRequest , HttpHandler , HttpEvent , HttpInterceptor , HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private toast:NgToastService , private Router:Router){ }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // console.log(JSON.parse(localStorage.getItem("token")!));

    const NewRequest = request.clone({
        headers : request.headers.set("Accept-Language", "en").set("api-token", "gh-general").set("Authorization" , "Bearer " + JSON.parse(localStorage.getItem("token")!)),
        url: environment.baseUrl + request.url

      }
    );
    if (request.url.endsWith('.svg') || request.url.endsWith('.png') || request.url.endsWith('.jpeg') || request.url.endsWith('.jpg')) {
      return next.handle(request);
    }
    return next.handle(NewRequest).pipe (
      catchError((error) => {
        if(error instanceof HttpErrorResponse) {
          if(error.error instanceof ErrorEvent) {
            this.toast.error({detail:"ERROR",summary:"An Error Event Occured",duration: 5000 });
          }
          else {
            switch(error.status) {
              case 401:
                this.toast.error({detail:"ERROR",summary:"Unauthorized",duration: 5000 });
                localStorage.clear();
                this.Router.navigateByUrl('auth/login', { replaceUrl: true });
                break;
              case 403:
                this.toast.error({detail:"ERROR",summary:"Forbidden",duration: 5000 });
                break;
              case 404:
                this.toast.error({detail:"ERROR",summary:"Not Found",duration: 5000 });
                break;
              case 500:
                this.toast.error({detail:"ERROR",summary:"Internal Server Error",duration: 5000 });
                break;
            }
          }
        }
        else {
          this.toast.error({detail:"ERROR",summary:"An Error Occured",duration: 5000 });
        }
        return throwError( () => new Error(error.statusCode) );
      }
      )
    );
  }
}
