import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes =
[
  { path : ""                              , loadChildren : () => import("./Pages/auth/auth.module").then( (m) => m.AuthModule ) } ,
  { path : "verification-code"             , loadChildren : () => import("./Pages/verification-code/verification-code.module").then( (m) => m.VerificationCodeModule ) , } ,
  { path : "reset-password"                , loadChildren : () => import("./Pages/reset-password/reset-password.module").then( (m) => m.ResetPasswordModule ) , } ,
  { path : "error-occured"                 , loadChildren : () => import("./Pages/error-occurred/error-occurred.module").then( (m) => m.ErrorOccurredModule ) , } ,

  { path : "home"       , loadChildren : () => import("./Pages/home/home.module").then( (m) => m.HomeModule ) , } ,
  { path : "offers"     , loadChildren : () => import("./Pages/offers/offers.module").then( (m) => m.OffersModule) , } ,
  { path : "footer"     , loadChildren : () => import("./Pages/footer/footer.module").then( (m) => m.FooterModule) , } ,
  { path : "countries"  , loadChildren : () => import("./Pages/countires/countires.module").then( (m) => m.CountiresModule ) } ,
  { path : "categories" , loadChildren : () => import("./Pages/categories/categories.module").then( (m) => m.CategoriesModule) , } ,
  { path : "company" , loadChildren : () => import("./Pages/company/company.module").then( (m) => m.CompanyModule) , } ,

  { path : "order-rates"               , loadChildren : () => import("./Pages/order-rates/order-rates.module").then( (m) => m.OrderRatesModule ) , } ,
  { path : "order-steps"               , loadChildren : () => import("./Pages/order-steps/order-steps.module").then( (m) => m.OrderStepsModule ) , } ,
  { path : "types-of-orders"           , loadChildren : () => import("./Pages/type-of-orders/type-of-orders.module").then( (m) => m.TypeOfOrdersModule ) , } ,
  { path : "payment-methods"           , loadChildren : () => import("./Pages/payment-methods/payment-methods.module").then( (m) => m.PaymentMethodsModule ) , } ,
  { path : "project-manager"           , loadChildren : () => import("./Pages/project-manager/project-manager.module").then( (m) => m.ProjectManagerModule ) , } ,
  { path : "drivers-manager"           , loadChildren : () => import("./Pages/drivers-manager/drivers-manager.module").then( (m) => m.DriversManagerModule ) , } ,
  { path : "country_managers"          , loadChildren : () => import("./Pages/country-manager/country-manager.module").then( (m) => m.CountryManagerModule ) , } ,
  { path : "statistics-tags"           , loadChildren : () => import("./Pages/statistics-tags/statistics-tags.module").then( (m) => m.StatisticsTagsModule ) , } ,
  { path : "page-content"              , loadChildren : () => import("./Pages/page-content/page-content.module").then( (m) => m.PageContentModule ) , } ,
  { path : "user-manager"              , loadChildren : () => import("./Pages/user-manager/user-manager.module").then( (m) => m.UserManagerModule ) , } ,
  { path : "order-management"          , loadChildren : () => import("./Pages/order-managment/order-managment.module").then( (m) => m.OrderManagmentModule) , } ,

  { path : "password-updated-successfully" , loadChildren : () => import("./Pages/password-updated-successfully/password-updated-successfully.module").then( (m) => m.PasswordUpdatedSuccessfullyModule ) , } ,
  { path : "new_application_managers"  , loadChildren : () => import("./Pages/new-application-managers/new-application-managers.module").then( (m) => m.NewApplicationManagersModule) , } ,
  { path : "frequently_asked_question" , loadChildren : () => import("./Pages/frequently-asked-question/frequently-asked-question.module").then( (m) => m.FrequentlyAskedQuestionModule) , } ,
  { path : "CooperationWithUsReason"   , loadChildren : () => import("./Pages/cooperation-with-us-reason/cooperation-with-us-reason.module").then( (m) => m.CooperationWithUsReasonModule ) , } ,


  { path : "**" , loadChildren : ()=> import("./Pages/auth/auth.module").then( (m) => m.AuthModule ) , } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
