import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingComponent } from './tracking/tracking.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { NavbarModule } from '../navbar/navbar.module';
import { HomeOrdersStatusComponent } from './home-orders-status/home-orders-status.component';
import { HomeDeliveryStatusComponent } from './home-delivery-status/home-delivery-status.component';
import { HomePaymentStatusComponent } from './home-payment-status/home-payment-status.component';
import { HomeAreaChartsComponent } from './home-area-charts/home-area-charts.component';
import { HomePieChartsComponent } from './home-pie-charts/home-pie-charts.component';
import { HomeMapsComponent } from './home-maps/home-maps.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment.development';

@NgModule({
  declarations: [
    HomeComponent,
    HomeOrdersStatusComponent,
    HomeDeliveryStatusComponent,
    HomePaymentStatusComponent,
    HomeAreaChartsComponent,
    HomePieChartsComponent,
    HomeMapsComponent,
    TrackingComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SidebarModule,
    NavbarModule,
    NgxChartsModule,
    NgxDatatableModule,
    AgmCoreModule.forRoot({
      apiKey: environment.APIKey
    }),
  ]

})
export class HomeModule { }
