import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorOccurredRoutingModule } from './error-occurred-routing.module';
import { ErrorOccurredComponent } from './error-occurred/error-occurred.component';


@NgModule({
  declarations: [
    ErrorOccurredComponent
  ],
  imports: [
    CommonModule,
    ErrorOccurredRoutingModule,
  ],
  exports : [ErrorOccurredComponent]
})
export class ErrorOccurredModule { }
