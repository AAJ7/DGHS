import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalOffersService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("general_offer");
  }
  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('name_ar', data.name_ar)
    formData.append('name_en', data.name_en)
    formData.append('img_path' , data.img_path)
    formData.append('from', data.from)
    formData.append('to' , data.to)
    return this.HttpClient.post<any>("general_offer" , formData);
  }
  update(data:any) {
    const formData = new FormData();
    formData.append('name_ar', data.name_ar)
    formData.append('name_en', data.name_en)
    formData.append('title_ar', data.title_ar)
    formData.append('title_en', data.title_en)
    formData.append('from', data.from)
    formData.append('to' , data.to)
    formData.append('link', data.link)
    if(data.img_path)formData.append('img_path' , data.img_path)
    formData.append('id' , data.id)
    formData.append('active', data.active)
    return this.HttpClient.post<any>("general_offer/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("general_offer/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("general_offer/" + id + "/activate/" + active);
  }
}
