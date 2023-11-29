import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/core/services/Countries/countries.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  rows:any[]=[];
https: any;
  constructor(private CountriesService:CountriesService) {}

  ngOnInit(): void {
    this.GetCountries();
  }
  GetCountries() {
    this.CountriesService.GETCountries().subscribe ({
        next:(response)=> {
          this.rows = response?.data;
        }
      }
    );
  }
}
