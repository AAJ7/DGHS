import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryTypesService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("delivery_type");
  }
  create(data:any):Observable<any> {
    const formData = new FormData;
    formData.append("name_ar" , data.name_ar)
    formData.append("name_en" , data.name_en)
    formData.append("description_ar" , data.description_ar)
    formData.append("description_en" , data.description_en)
    formData.append("after_hours" , data.after_hours)
    formData.append("added_value" , data.added_value)
    formData.append("added_value_type" , data.added_value_type)
    return this.HttpClient.post<any>("delivery_type" , formData);
  }
  update(data:any):Observable<any> {
    const formData = new FormData;
    formData.append("name_ar" , data.name_ar)
    formData.append("name_en" , data.name_en)
    formData.append("description_ar" , data.description_ar)
    formData.append("description_en" , data.description_en)
    formData.append("after_hours" , data.after_hours)
    formData.append("added_value" , data.added_value)
    formData.append("added_value_type" , data.added_value_type)
    formData.append("id" , data.id)
    return this.HttpClient.post<any>("delivery_type/update" , formData);
  }
  delete(id:number):Observable<any> {
    return this.HttpClient.delete<any>("delivery_type/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("delivery_type/" + id + "/activate/" + active);
  }
}
