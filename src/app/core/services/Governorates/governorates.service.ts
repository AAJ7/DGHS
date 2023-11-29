import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GovernoratesService {

  constructor(private HttpClient:HttpClient) { }

  show(id:number):Observable<any>
  {
    return this.HttpClient.get<any>("country/" + id + "/governorate");
  }
  create(data:any):Observable<any>
  {
    const formData = new FormData();
    formData.append('name_ar', data.name_ar)
    formData.append('name_en', data.name_en)
    formData.append('country_id', data.country_id)
    return this.HttpClient.post<any>("governorate" , formData);
  }
  update(data:any):Observable<any>
  {
    const formData = new FormData();
    formData.append('name_ar', data.name_ar)
    formData.append('name_en', data.name_en)
    formData.append('id', data.id)
    formData.append('country_id',data.country_id)
    return this.HttpClient.post<any>("governorate/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("governorate/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("governorate/" + id + "/activate/" + active);
  }
}
