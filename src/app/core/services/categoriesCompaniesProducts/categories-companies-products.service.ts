import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesCompaniesProductsService {

  constructor(private HttpClient:HttpClient) { }

  products(company_id:any , category_id:any):Observable<any> {
    return this.HttpClient.get<any>("product?company_id=" + company_id + "&category_id=" + category_id);
  }
  create(data:any):Observable<any> {
    return this.HttpClient.post<any>("product" , data);
  }
  update(data:any):Observable<any> {
    return this.HttpClient.post<any>("product/update" , data);
  }
  delete(id:number):Observable<any> {
    return this.HttpClient.delete<any>("product/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("product/" + id + "/activate/" + active);
  }
  categories(id:any) {
    return this.HttpClient.get<any>("category/select?company_id=" + id + "&have_sub_categories=0");
  }
}
