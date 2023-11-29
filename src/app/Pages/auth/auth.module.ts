import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SharedModule } from 'src/app/shared/shared.module';









@NgModule({
  declarations: [
    LoginComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule

    ,SharedModule
    ,ReactiveFormsModule
    ,FormsModule
  ],
  exports : [LoginComponent , ForgetPasswordComponent]
})
export class AuthModule { }
