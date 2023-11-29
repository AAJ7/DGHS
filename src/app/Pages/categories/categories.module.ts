import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxCheckboxModule } from 'ngx-checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesCompaniesComponent } from './categories-companies/categories-companies.component';
import { ProductsComponent } from './products/products.component';
import { PComponent } from './p/p.component';
import { HaveSubCategoriesComponent } from './have-sub-categories/have-sub-categories.component';



@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesCompaniesComponent,
    ProductsComponent,
    PComponent,
    HaveSubCategoriesComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SidebarModule,
    NavbarModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCheckboxModule
  ]
})
export class CategoriesModule { }
