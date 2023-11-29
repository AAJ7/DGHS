import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsTagsComponent } from './statistics-tags/statistics-tags.component';

const routes: Routes = [
  {path : "", component :StatisticsTagsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsTagsRoutingModule { }
