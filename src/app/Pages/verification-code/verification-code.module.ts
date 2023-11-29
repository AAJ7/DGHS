import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerificationCodeRoutingModule } from './verification-code-routing.module';
import { VerificationCodeComponent } from './verification-code/verification-code.component';

import { NgxOtpInputModule } from 'ngx-otp-input';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    VerificationCodeComponent
  ],
  imports: [
    CommonModule,
    VerificationCodeRoutingModule

    ,NgxOtpInputModule
    ,SharedModule
  ],
  exports : [VerificationCodeComponent]
})
export class VerificationCodeModule { }
