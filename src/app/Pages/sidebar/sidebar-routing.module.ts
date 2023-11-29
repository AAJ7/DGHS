import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CountryManagerCountryComponent } from '../country-manager/country-manager-country/country-manager-country.component';

const routes: Routes =
[
  {
    path : "" , component : SidebarComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidebarRoutingModule { }
