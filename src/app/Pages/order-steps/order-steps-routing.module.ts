import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderStepsComponent } from './order-steps/order-steps.component';

const routes: Routes = [
  {path : "", component:OrderStepsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderStepsRoutingModule { }
