import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private HttpClient:HttpClient) { }


  show(id:number):Observable<any>
  {
    return this.HttpClient.get<any>("governorate/" + id + "/city");
  }
  create(data:any):Observable<any>
  {
    const formData = new FormData();
    formData.append('name_ar', data.name_ar)
    formData.append('name_en', data.name_en)
    formData.append('governorate_id', data.governorate_id)
    return this.HttpClient.post<any>("city" , formData);
  }
  update(data:any):Observable<any>
  {
    const formData = new FormData();
    formData.append('name_ar', data.name_ar)
    formData.append('name_en', data.name_en)
    formData.append('id', data.id)
    formData.append('governorate_id',data.governorate_id)
    return this.HttpClient.post<any>("city/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("city/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("city/" + id + "/activate/" + active);
  }
}
