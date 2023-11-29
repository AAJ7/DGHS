import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company/company.component';
import { NavbarModule } from '../navbar/navbar.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NgxCheckboxModule } from 'ngx-checkbox';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriversComponent } from './drivers/drivers.component';
import { DmCooperateCComponent } from './dm-cooperate-c/dm-cooperate-c.component';


@NgModule({
  declarations: [
    CompanyComponent,
    DriversComponent,
    DmCooperateCComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    NavbarModule,
    SidebarModule,
    NgxCheckboxModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CompanyModule { }
