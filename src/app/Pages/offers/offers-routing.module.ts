import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalOffersComponent } from './global-offers/global-offers.component';
import { PromoCodeComponent } from './promo-code/promo-code.component';
import { SliderOffersComponent } from './slider-offers/slider-offers.component';
import { PromoCodeOffersComponent } from './promo-code-offers/promo-code-offers.component';

const routes: Routes = [
  {path : "" , redirectTo:"global-offers", pathMatch:"full"},
  {path : "global-offers", component : GlobalOffersComponent},
  {path : "promo-code", component : PromoCodeComponent},
  {path : "promo-code-offers", component : PromoCodeOffersComponent},
  {path : "slider-offers", component : SliderOffersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
