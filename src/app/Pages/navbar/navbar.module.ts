import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarRoutingModule } from './navbar-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ColorPickerModule } from 'ngx-color-picker';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    ColorPickerModule,
  ],
  exports : [
    NavbarComponent
  ]
})
export class NavbarModule { }
