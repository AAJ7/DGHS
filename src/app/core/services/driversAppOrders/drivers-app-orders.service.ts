import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriversAppOrdersService {

  constructor(private HttpClient:HttpClient) { }

  get(company_id: any , date: any) {
    return this.HttpClient.get<any>("transportation_periods_assigned_to_drivers/select?user_id=" + company_id + "&date=" + date);
    // transportation_periods_assigned_to_drivers/select?user_id=18&date=2023-09-14
  }
}
