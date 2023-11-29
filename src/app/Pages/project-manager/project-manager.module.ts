import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagerRoutingModule } from './project-manager-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment.development';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { ProjectManagerComponent } from './project-manager/project-manager.component';


@NgModule({
  declarations: [
    ProjectManagerComponent
  ],
  imports: [
    CommonModule,
    ProjectManagerRoutingModule,
    NgxChartsModule,
    NgxDatatableModule,
    AgmCoreModule.forRoot({
      apiKey: environment.APIKey
    }),
    SidebarModule,
    NavbarModule,
  ]
})
export class ProjectManagerModule { }
