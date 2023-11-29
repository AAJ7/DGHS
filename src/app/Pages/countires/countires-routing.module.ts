import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { GovernoratesComponent } from './governorates/governorates.component';
import { CitiesComponent } from './cities/cities.component';


const routes: Routes = [
  {
    path : "", component : CountriesComponent
  }
  ,
  {
    path : ":id/governorates", component : GovernoratesComponent
  }
  ,
  {
    path : ":id/governorates/:id/cities", component : CitiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountiresRoutingModule { }
