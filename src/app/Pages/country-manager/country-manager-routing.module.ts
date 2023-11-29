import { DriversAssignedComponent } from './drivers-assigned/drivers-assigned.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryManagerCountryComponent } from './country-manager-country/country-manager-country.component';
import { CompaniesComponent } from './companies/companies.component';
import { GovernoratesComponent } from './governorates/governorates.component';
import { CitiesComponent } from './cities/cities.component';
import { ProductsComponent } from './products/products.component';
import { TransportationPeriodsComponent } from './transportation-periods/transportation-periods.component';
import { CompaniesProductsComponent } from './companies-products/companies-products.component';
// import { CategoriesComponent } from './categories/categories.component';



const routes: Routes =
[
{
  path : "country/:id" , component : CountryManagerCountryComponent
}
,
{
  path : "country/:id/country_manager/:id/companies" , component : CompaniesComponent
}
,
{
  path : "country/:id/country_manager/:id/products" , component : ProductsComponent
}
,
{
  path : "country/:id/governorates" , component : GovernoratesComponent
}
,
{
  path : "country/:id/governorates/:id/cities" , component : CitiesComponent
}
,
{
  path : "country/:id/country_manager/:id/companies/:id/transportation_periods" , component : TransportationPeriodsComponent
}
,
{
  path : "country/:id/transportation_periods/:id/drivers/:id" , component : DriversAssignedComponent
}
,
{
  path : "country/:id/country_manager/:id/company/:id/products" , component : CompaniesProductsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryManagerRoutingModule { }
