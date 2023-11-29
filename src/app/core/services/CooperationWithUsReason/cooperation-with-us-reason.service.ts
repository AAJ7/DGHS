import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CooperationWithUsReasonService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("cooperation_with_us_reason");
  }
  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('title_ar', data.title_ar)
    formData.append('title_en', data.title_en)
    formData.append('img_path' , data.img_path)
    return this.HttpClient.post<any>("cooperation_with_us_reason" , formData);
  }
  update(data:any) {
    const formData = new FormData();
    formData.append('title_ar', data.title_ar)
    formData.append('title_en', data.title_en)
    if(data.img_path)formData.append('img_path' , data.img_path)
    formData.append('id' , data.id)
    return this.HttpClient.post<any>("cooperation_with_us_reason/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("cooperation_with_us_reason/" + id);
  }

}
