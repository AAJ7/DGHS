import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DmCooperateCService {

  constructor(private HttpClient:HttpClient) { }

  get():Observable<any> {
    return this.HttpClient.get<any>("drivers_manager/working_with/company");
  }
  getWithCompany(id:any):Observable<any> {
    return this.HttpClient.get<any>("drivers_manager/working_with/company?company_id=" + id);
  }
  getWithDriverManager(id:any):Observable<any> {
    return this.HttpClient.get<any>("drivers_manager/working_with/company?drivers_manager_id=" + id);
  }
  post(data:any):Observable<any> {
    const formData = new FormData;
    formData.append("company_id" , data.company_id)
    formData.append("drivers_manager_id" , data.drivers_manager_id)
    return this.HttpClient.post<any>("drivers_manager/working_with/company" , formData);
  }
  delete(id:number):Observable<any> {
    return this.HttpClient.delete<any>("drivers_manager/working_with/company/" + id);
  }
}
