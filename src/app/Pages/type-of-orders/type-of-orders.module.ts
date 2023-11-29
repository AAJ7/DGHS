import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeOfOrdersRoutingModule } from './type-of-orders-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment.development';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeliveryTypesComponent } from './delivery-types/delivery-types.component';



@NgModule({
  declarations: [
    DeliveryTypesComponent
  ],
  imports: [
    CommonModule,
    TypeOfOrdersRoutingModule,
    NgxChartsModule,
    NgxDatatableModule,
    AgmCoreModule.forRoot({
      apiKey: environment.APIKey
    }),
    SidebarModule,
    NavbarModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TypeOfOrdersModule { }
