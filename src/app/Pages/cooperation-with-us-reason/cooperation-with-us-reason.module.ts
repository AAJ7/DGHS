import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CooperationWithUsReasonRoutingModule } from './cooperation-with-us-reason-routing.module';
import { CooperationWithUsReasonComponent } from './cooperation-with-us-reason/cooperation-with-us-reason.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CooperationWithUsReasonComponent
  ],
  imports: [
    CommonModule,
    CooperationWithUsReasonRoutingModule,
    NgxDatatableModule,
    SidebarModule,
    NavbarModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CooperationWithUsReasonModule { }
