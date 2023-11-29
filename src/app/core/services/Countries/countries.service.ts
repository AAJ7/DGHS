import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private HttpClient:HttpClient) { }

  show(id:any):Observable<any> {
    return this.HttpClient.get<any>("country?active=" + id);
  }
  showWithoutActive():Observable<any> {
    return this.HttpClient.get<any>("country");
  }
  create(data:any):Observable<any>
  {
    const formData = new FormData();
    formData.append('name_ar', data.name_ar)
    formData.append('name_en', data.name_en)
    formData.append('img_path' , data.img_path)
    return this.HttpClient.post<any>("country" , formData);
  }
  update(data:any):Observable<any>
  {
    const formData = new FormData();
    formData.append('name_ar', data.name_ar)
    formData.append('name_en', data.name_en)
    if(data.img_path)formData.append('img_path' , data.img_path)
    formData.append('id' , data.id)
    return this.HttpClient.post<any>("country/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("country/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("country/" + id + "/activate/" + active);
  }
  GETCountries():Observable<any>
  {
    return this.HttpClient.get<any>("country");
  }
}
