import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStepsRoutingModule } from './order-steps-routing.module';
import { OrderStepsComponent } from './order-steps/order-steps.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderStepsComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    OrderStepsRoutingModule,
    SidebarModule,
    NavbarModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OrderStepsModule { }
