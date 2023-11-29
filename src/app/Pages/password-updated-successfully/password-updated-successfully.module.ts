import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordUpdatedSuccessfullyRoutingModule } from './password-updated-successfully-routing.module';
import { PasswordUpdatedSuccessfullyComponent } from './password-updated-successfully/password-updated-successfully.component';




@NgModule({
  declarations: [




    PasswordUpdatedSuccessfullyComponent
  ],
  imports: [
    CommonModule,
    PasswordUpdatedSuccessfullyRoutingModule,

  ],
  exports : [PasswordUpdatedSuccessfullyComponent]
})
export class PasswordUpdatedSuccessfullyModule { }
