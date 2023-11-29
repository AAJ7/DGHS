import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesCompaniesService {

  constructor(private HttpClient:HttpClient) { }

  show(id:any):Observable<any> {
    return this.HttpClient.get<any>("category/" + id +"/company");
  }
  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('category_id', data.category_id)
    formData.append('company_id' , data.company_id)
    return this.HttpClient.post<any>("category/company" , formData);
  }
  delete(id:number):Observable<any> {
    return this.HttpClient.delete<any>("category/company/" + id);
  }

  showCategoriesSelect():Observable<any> {
    return this.HttpClient.get<any>("category/select");
  }
}
