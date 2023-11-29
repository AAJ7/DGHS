import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryTypesComponent } from './delivery-types/delivery-types.component';

const routes: Routes =
[
  {
    path : "delivery_types" , component : DeliveryTypesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeOfOrdersRoutingModule { }
