import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryManagerRoutingModule } from './country-manager-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NgxCheckboxModule } from 'ngx-checkbox';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountryManagerCountryComponent } from './country-manager-country/country-manager-country.component';
import { CompaniesComponent } from './companies/companies.component';
import { GovernoratesComponent } from './governorates/governorates.component';
import { CitiesComponent } from './cities/cities.component';
import { ProductsComponent } from './products/products.component';
import { TransportationPeriodsComponent } from './transportation-periods/transportation-periods.component';
import { DriversAssignedComponent } from './drivers-assigned/drivers-assigned.component';
import { CompaniesProductsComponent } from './companies-products/companies-products.component';


@NgModule({
  declarations: [
    CountryManagerCountryComponent,
    CompaniesComponent,
    GovernoratesComponent,
    CitiesComponent,
    ProductsComponent,
    TransportationPeriodsComponent,
    DriversAssignedComponent,
    CompaniesProductsComponent
  ],
  imports: [
    CommonModule,
    NgxCheckboxModule,
    CountryManagerRoutingModule,
    NavbarModule,
    SidebarModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CountryManagerModule { }
