import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HaveSubCategoriesService {

  constructor(private HttpClient:HttpClient) { }

  show(id:any):Observable<any> {
    return this.HttpClient.get<any>("category/select?parent_id=" + id);
  }
  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('name_ar', data.name_ar)
    formData.append('name_en', data.name_en)
    formData.append('img_path' , data.img_path)
    formData.append('have_sub_categories' , data.have_sub_categories)
    formData.append('parent_id' , data.parent_id)
    return this.HttpClient.post<any>("category" , formData);
  }
  update(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('name_ar', data.name_ar)
    formData.append('name_en', data.name_en)
    if(data.img_path)formData.append('img_path' , data.img_path)
    formData.append('have_sub_categories' , data.have_sub_categories)
    formData.append('id' , data.id)
    formData.append('active' , data.active)
    formData.append('parent_id' , data.parent_id)
    return this.HttpClient.post<any>("category/update" , formData);
  }
  delete(id:any):Observable<any> {
    return this.HttpClient.delete<any>("category/" + id);
  }
}
