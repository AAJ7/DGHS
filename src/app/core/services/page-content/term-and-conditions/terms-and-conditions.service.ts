import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TermsAndConditionsService {

  
  constructor(private HttpClient:HttpClient) { }

  show():Observable<any> {
    return this.HttpClient.get<any>("terms_and_conditions");
  }
  update(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('title_ar', data.title_ar)
    formData.append('title_en', data.title_en)
    formData.append('description_ar' , data.description_ar)
    formData.append('description_en' , data.description_en)
    return this.HttpClient.post<any>("terms_and_conditions/update" , formData);
  }
}
