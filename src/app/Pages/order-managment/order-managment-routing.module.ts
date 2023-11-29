import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportationPeriodComponent } from './transportation-period/transportation-period.component';
import { DeliveryTypeComponent } from './delivery-type/delivery-type.component';
import { OrderComponent } from './order/order.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {
    path : "transportation-period" , component : TransportationPeriodComponent
  }
  ,
  {
    path : "delivery-type" , component : DeliveryTypeComponent
  }
  ,
  {
    path : "order" , component : OrderComponent
  }
  ,
  {
    path : "invoice" , component : InvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagmentRoutingModule { }
