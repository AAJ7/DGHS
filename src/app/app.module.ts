import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxCheckboxModule } from 'ngx-checkbox';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ToastrModule } from 'ngx-toastr';











@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxCheckboxModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot( { maxOpened: 2,
      preventDuplicates: true,
      timeOut:5000,
      closeButton: true,
      progressBar:true,
      autoDismiss:true,
      newestOnTop:true}),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
