import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsTagsRoutingModule } from './statistics-tags-routing.module';
import { StatisticsTagsComponent } from './statistics-tags/statistics-tags.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StatisticsTagsComponent
  ],
  imports: [
    CommonModule,
    StatisticsTagsRoutingModule,
    NgxDatatableModule,
    SidebarModule,
    NavbarModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StatisticsTagsModule { }
