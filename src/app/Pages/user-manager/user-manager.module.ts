import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagerRoutingModule } from './user-manager-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsLocationsComponent } from './clients-locations/clients-locations.component';


@NgModule({
  declarations: [
    ClientsComponent,
    ClientsLocationsComponent
  ],
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    NgxDatatableModule,
    SidebarModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserManagerModule { }
