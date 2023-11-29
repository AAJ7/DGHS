import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesCompaniesComponent } from './categories-companies/categories-companies.component';
import { ProductsComponent } from './products/products.component';
import { PComponent } from './p/p.component';
import { HaveSubCategoriesComponent } from './have-sub-categories/have-sub-categories.component';

const routes: Routes = [
  {
    path : "" , component : CategoriesComponent
  },
  {
    path : "have_sub_categories/:id" , component : HaveSubCategoriesComponent
  },
  {
    path : "company/:id" , component : CategoriesCompaniesComponent
  },
  // {
  //   path : "company/:id/categories/:id" , component : ProductsComponent
  // },
  {
    path : "company/:id/categories/:id" , component : PComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
