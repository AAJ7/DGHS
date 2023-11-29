import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordUpdatedSuccessfullyComponent } from './password-updated-successfully/password-updated-successfully.component';

const routes: Routes =
[
  { path : "" , component : PasswordUpdatedSuccessfullyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordUpdatedSuccessfullyRoutingModule { }
