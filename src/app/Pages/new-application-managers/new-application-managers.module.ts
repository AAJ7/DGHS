import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewApplicationManagersRoutingModule } from './new-application-managers-routing.module';
import { AdminsComponent } from './admins/admins.component';
import { DriversComponent } from './drivers/drivers.component';
import { NavbarModule } from '../navbar/navbar.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminsComponent,
    DriversComponent
  ],
  imports: [
    CommonModule,
    NewApplicationManagersRoutingModule,
    NavbarModule,
    SidebarModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class NewApplicationManagersModule { }
