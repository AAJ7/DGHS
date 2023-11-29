import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsTagsService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("statistics_tag");
  }
  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('title_ar', data.title_ar)
    formData.append('title_en', data.title_en)
    formData.append('img_path' , data.img_path)
    formData.append('percentage' , data.percentage)
    return this.HttpClient.post<any>("statistics_tag" , formData);
  }
  update(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('title_ar', data.title_ar)
    formData.append('title_en', data.title_en)
    formData.append('id' , data.id)
    formData.append('percentage' , data.percentage)
    return this.HttpClient.post<any>("statistics_tag/update" , formData);
  }
  delete(id:number):Observable<any> {
    return this.HttpClient.delete<any>("statistics_tag/" + id);
  }
}
