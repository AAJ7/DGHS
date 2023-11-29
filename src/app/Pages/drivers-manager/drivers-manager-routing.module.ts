import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriversManagersComponent } from './drivers-managers/drivers-managers.component';
import { DriversComponent } from './drivers/drivers.component';

const routes: Routes = [
  {
    path : "" , component : DriversManagersComponent
  }
  ,
  {
    path : ":id/drivers" , component : DriversComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversManagerRoutingModule { }
