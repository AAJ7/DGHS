import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorOccurredComponent } from './error-occurred/error-occurred.component';

const routes: Routes =
[
  { path : "" , component : ErrorOccurredComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorOccurredRoutingModule { }
