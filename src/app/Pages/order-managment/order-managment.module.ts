import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagmentRoutingModule } from './order-managment-routing.module';
import { TransportationPeriodComponent } from './transportation-period/transportation-period.component';
import { DeliveryTypeComponent } from './delivery-type/delivery-type.component';
import { OrderComponent } from './order/order.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { NavbarModule } from '../navbar/navbar.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TransportationPeriodComponent,
    DeliveryTypeComponent,
    OrderComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    OrderManagmentRoutingModule,
    NavbarModule,
    SidebarModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderManagmentModule { }
