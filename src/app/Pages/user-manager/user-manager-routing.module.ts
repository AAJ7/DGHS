import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ClientsLocationsComponent } from './clients-locations/clients-locations.component';


const routes: Routes = [
  {
    path : "clients" , component : ClientsComponent
  }
  ,
  {
    path : "clients/:id/clients-locations" , component : ClientsLocationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagerRoutingModule { }
