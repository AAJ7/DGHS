import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { OffersPageComponent } from './offers-page/offers-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeSliderImageComponent } from './home-slider-image/home-slider-image.component';
import { NavbarAndFooterContentComponent } from './navbar-and-footer-content/navbar-and-footer-content.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';


const routes: Routes = [
  {
    path : "home-page" , component : HomePageComponent
  }
  ,
  {
    path : "offers-page" , component : OffersPageComponent
  }
  ,
  {
    path : "about-us" , component : AboutUsComponent
  }
  ,
  {
    path : "home-slider-image" , component : HomeSliderImageComponent
  }
  ,
  {
    path: "navbar-and-footer-content" , component : NavbarAndFooterContentComponent
  }
  ,
  {
    path: "terms-and-conditions" , component : TermsAndConditionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageContentRoutingModule { }
