import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseOrderRatesComponent } from './base-order-rates/base-order-rates.component';

const routes: Routes = [
  {
    path : "base-order-rates" , component : BaseOrderRatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRatesRoutingModule { }
