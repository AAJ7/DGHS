import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalOffersComponent } from './global-offers/global-offers.component';
import { SliderOffersComponent } from './slider-offers/slider-offers.component';
import { PromoCodeComponent } from './promo-code/promo-code.component';
import { PromoCodeOffersComponent } from './promo-code-offers/promo-code-offers.component';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@NgModule({
  declarations: [
    GlobalOffersComponent,
    SliderOffersComponent,
    PromoCodeComponent,
    PromoCodeOffersComponent
  ],
  imports: [
    CommonModule,
    OffersRoutingModule,
    SidebarModule,
    NavbarModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule
  ],
  providers: [DatePipe]
})
export class OffersModule { }
