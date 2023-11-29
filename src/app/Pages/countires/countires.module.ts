import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountiresRoutingModule } from './countires-routing.module';
import { CountriesComponent } from './countries/countries.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GovernoratesComponent } from './governorates/governorates.component';
import { CitiesComponent } from './cities/cities.component';





@NgModule({
  declarations: [
    CountriesComponent,
    GovernoratesComponent,
    CitiesComponent
  ],
  imports: [
    CommonModule,
    CountiresRoutingModule,
    SharedModule
  ]
})
export class CountiresModule { }
