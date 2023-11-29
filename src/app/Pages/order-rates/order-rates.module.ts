import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderRatesRoutingModule } from './order-rates-routing.module';
import { BaseOrderRatesComponent } from './base-order-rates/base-order-rates.component';


@NgModule({
  declarations: [
    BaseOrderRatesComponent
  ],
  imports: [
    CommonModule,
    OrderRatesRoutingModule,
    SidebarModule,
    NavbarModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderRatesModule { }
