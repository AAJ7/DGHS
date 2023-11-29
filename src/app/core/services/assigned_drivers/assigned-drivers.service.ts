import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignedDriversService {

  constructor(private HttpClient:HttpClient) { }

   create(data:any):Observable<any> {
    const formData = new FormData;
      formData.append("transportation_period_id" , data.transportation_period_id)
      formData.append("driver_id" , data.driver_id)
      formData.append("capacity" , data.capacity)
    return this.HttpClient.post<any>("transportation_period/driver" , formData);
  }
  update(data:any):Observable<any> {
    const formData = new FormData;
      formData.append("capacity" , data.capacity)
      formData.append("id" , data.id)
    return this.HttpClient.post<any>("transportation_period/driver/update" , formData);
  }
  delete(id:number):Observable<any>
  {
    return this.HttpClient.delete<any>("driver/assigned_to/transportation_period/" + id);
  }
}
