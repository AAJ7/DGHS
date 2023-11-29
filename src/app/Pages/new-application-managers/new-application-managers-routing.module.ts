import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { DriversComponent } from './drivers/drivers.component';

const routes: Routes = [
  {
    path: "admins" , component : AdminsComponent
  }
  ,
  {
    path : "drivers" , component : DriversComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewApplicationManagersRoutingModule { }
