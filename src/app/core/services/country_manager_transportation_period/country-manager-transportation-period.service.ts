import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryManagerTransportationPeriodService {

  constructor(private HttpClient:HttpClient) { }

  transportation_period(id:any):Observable<any> {
    return this.HttpClient.get<any>("transportation_period?user_id=" + id);
  }
  create(data:any):Observable<any> {
    const formData = new FormData;
      formData.append("from" , data.from)
      formData.append("to" , data.to)
      formData.append("user_id" , data.user_id)
    return this.HttpClient.post<any>("transportation_period" , formData);
  }
  update(data:any):Observable<any> {
    const formData = new FormData;
      formData.append("from" , data.from)
      formData.append("to" , data.to)
      formData.append("user_id" , data.user_id)
      formData.append("id" , data.id)
    return this.HttpClient.post<any>("transportation_period/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("transportation_period/" + id);
  }
  activate(id:any , active:any) {
    return this.HttpClient.get<any>("transportation_period/" + id + "/activate/" + active);
  }
}
