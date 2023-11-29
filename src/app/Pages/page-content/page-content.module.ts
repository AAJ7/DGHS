import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageContentRoutingModule } from './page-content-routing.module';
import { HomePageComponent } from './home-page/home-page.component';

import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OffersPageComponent } from './offers-page/offers-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeSliderImageComponent } from './home-slider-image/home-slider-image.component';
import { NavbarAndFooterContentComponent } from './navbar-and-footer-content/navbar-and-footer-content.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';


@NgModule({
  declarations: [
    HomePageComponent,
    OffersPageComponent,
    AboutUsComponent,
    HomeSliderImageComponent,
    NavbarAndFooterContentComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    CommonModule,
    PageContentRoutingModule,
    SidebarModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PageContentModule { }
