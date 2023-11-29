import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderStepsService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("order_step");
  }
  create(data:any):Observable<any> {
    const formData = new FormData;
    formData.append("title_ar" , data.title_ar)
    formData.append("title_en" , data.title_en)
    formData.append("description_ar" , data.description_ar)
    formData.append("description_en" , data.description_en)
    formData.append("img_path" , data.img_path)
    return this.HttpClient.post<any>("order_step" , formData);
  }
  update(data:any):Observable<any> {
    const formData = new FormData;
    formData.append("id" , data.id)
    formData.append("active" , data.active)
    formData.append("title_ar" , data.title_ar)
    formData.append("title_en" , data.title_en)
    formData.append("description_ar" , data.description_ar)
    formData.append("description_en" , data.description_en)
    if(data.img_path)formData.append('img_path' , data.img_path)
    return this.HttpClient.post<any>("order_step/update" , formData);
  }
  delete(id:number):Observable<any> {
    return this.HttpClient.delete<any>("order_step/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("order_step/" + id + "/activate/" + active);
  }
}
