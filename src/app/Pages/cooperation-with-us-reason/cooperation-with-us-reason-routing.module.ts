import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CooperationWithUsReasonComponent } from './cooperation-with-us-reason/cooperation-with-us-reason.component';

const routes: Routes = [
  {path : "" , component : CooperationWithUsReasonComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CooperationWithUsReasonRoutingModule { }
