import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentMethodsRoutingModule } from './payment-methods-routing.module';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaymentMethodsComponent
  ],
  imports: [
    CommonModule,
    PaymentMethodsRoutingModule,
    NgxDatatableModule,
    SidebarModule,
    NavbarModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PaymentMethodsModule { }
