import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes =
[
  { path : "" , redirectTo : "/auth/login" , pathMatch : "full" } ,
  { path : "auth/login" , component : LoginComponent } ,
  { path : "auth/forget-password" , component : ForgetPasswordComponent } ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
