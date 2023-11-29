import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrequentlyAskedQuestionRoutingModule } from './frequently-asked-question-routing.module';
import { FrequentlyAskedQuestionComponent } from './frequently-asked-question/frequently-asked-question.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FrequentlyAskedQuestionComponent
  ],
  imports: [
    CommonModule,
    FrequentlyAskedQuestionRoutingModule,
    SidebarModule,
    NavbarModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FrequentlyAskedQuestionModule { }
