import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsLocationsService {


  constructor(private HttpClient:HttpClient) { }

  show(id:any):Observable<any> {
    return this.HttpClient.get<any>("client_location?client_id=" + id);
  }

  create(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('client_id', data.client_id)
    formData.append('lat', data.lat)
    formData.append('long' , data.long)
    formData.append('phone_number' , data.phone_number)
    formData.append('location_type', data.location_type)
    formData.append('street', data.street)
    formData.append('building' , data.building)
    formData.append('floor' , data.floor)
    formData.append('apartment' , data.apartment)
    formData.append('detailed_address' , data.detailed_address)
    if(data.additional_instructions)formData.append('additional_instructions' , data.additional_instructions)
    if(data.telephone)formData.append('telephone' , data.telephone)
    return this.HttpClient.post<any>("client_location" , formData);
  }

  update(data:any):Observable<any> {
    const formData = new FormData();
    formData.append('id', data.id)
    // formData.append('client_id', data.client_id)
    formData.append('lat', data.lat)
    formData.append('long' , data.long)
    formData.append('phone_number' , data.phone_number)
    formData.append('location_type', data.location_type)
    formData.append('street', data.street)
    formData.append('building' , data.building)
    formData.append('floor' , data.floor)
    formData.append('apartment' , data.apartment)
    formData.append('detailed_address' , data.detailed_address)
    if(data.additional_instructions)formData.append('additional_instructions' , data.additional_instructions)
    if(data.telephone)formData.append('telephone' , data.telephone)
    return this.HttpClient.post<any>("client_location/update" , formData);
  }

  delete(id:number):Observable<any> {
    return this.HttpClient.delete<any>("client_location/" + id);
  }
}
