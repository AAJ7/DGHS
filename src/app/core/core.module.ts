import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SharedModule } from '../shared/shared.module';
import { NgToastModule } from 'ng-angular-popup';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgToastModule

  ],
  providers:
  [
    {
      provide: HTTP_INTERCEPTORS ,
      useClass: AuthInterceptor ,
      multi: true
    },
  ],
})
export class CoreModule { }
