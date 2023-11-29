import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrequentlyAskedQuestionComponent } from './frequently-asked-question/frequently-asked-question.component';

const routes: Routes = [
  {path : "", component : FrequentlyAskedQuestionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrequentlyAskedQuestionRoutingModule { }
