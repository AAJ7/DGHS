import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeSliderImageService {

  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("home_slider_image");
  }
  update(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('id', data.id)
    formData.append('active', data.active)
    if(data.img_path)formData.append('img_path', data.img_path)

    return this.HttpClient.post<any>("home_slider_image/update" , formData);
  }
}
