import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { DriversComponent } from './drivers/drivers.component';
import { DmCooperateCComponent } from './dm-cooperate-c/dm-cooperate-c.component';

const routes: Routes = [
  {
    path : "" , component : CompanyComponent
  }
  ,
  {
    path : ":id/drivers" , component : DriversComponent
  }
  ,
  {
    path : "cooperate-with-companies" , component : DmCooperateCComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
