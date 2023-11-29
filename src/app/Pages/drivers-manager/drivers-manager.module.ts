import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriversManagerRoutingModule } from './drivers-manager-routing.module';
import { DriversManagersComponent } from './drivers-managers/drivers-managers.component';
import { NavbarModule } from '../navbar/navbar.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriversComponent } from './drivers/drivers.component';

@NgModule({
  declarations: [
    DriversManagersComponent,
    DriversComponent
  ],
  imports: [
    CommonModule,
    DriversManagerRoutingModule,
    NavbarModule,
    SidebarModule,
    NgxChartsModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DriversManagerModule { }
