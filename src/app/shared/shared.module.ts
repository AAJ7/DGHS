import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SidebarModule } from '../Pages/sidebar/sidebar.module';
import { NavbarModule } from '../Pages/navbar/navbar.module';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    NgxOtpInputModule,
    SidebarModule,
    NavbarModule,
    NgxChartsModule,
    NgxDatatableModule
  ],
  exports : [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    NgxOtpInputModule,
    SidebarModule,
    NavbarModule,
    NgxChartsModule,
    NgxDatatableModule
  ]
})
export class SharedModule { }
