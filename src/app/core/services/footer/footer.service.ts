import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("social_link");
  }
  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('link', data.link)
    formData.append('img_path' , data.img_path)
    return this.HttpClient.post<any>("social_link" , formData);
  }
  update(data:any) {
    const formData = new FormData();
    formData.append('link', data.link)
    if(data.img_path)formData.append('img_path' , data.img_path)
    formData.append('id' , data.id)
    return this.HttpClient.post<any>("social_link/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("social_link/" + id);
  }

}
