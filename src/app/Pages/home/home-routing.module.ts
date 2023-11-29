import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TrackingComponent } from './tracking/tracking.component';

const routes: Routes =
[
  {
    path : "" , component : HomeComponent
  }
  ,
  {
    path : "tracking" , component : TrackingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
