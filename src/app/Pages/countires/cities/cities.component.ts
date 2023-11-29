import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { CountriesService } from 'src/app/core/services/Countries/countries.service';
import { GovernoratesService } from 'src/app/core/services/Governorates/governorates.service';
import { CitiesService } from 'src/app/core/services/Cities/cities.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit  {
  id!:any;
  rows:any[] = [];
  rows_Countries:any[] = [];
  rows_Governorates:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  show_create:boolean = false;
  show_delete:boolean = false;
  show_update:boolean = false;
  deleted_City!:number;
  show_stop:boolean = false;
  show_activate:boolean = false;
  img_path!:string;
  img!:any;
  Base64!:any;
  active_letter!:string;
  active_button!:string;
  active_id!:any;
  toggle!:any;
  active_Url!:any;
  CountryID_Url!:any;
  GovernorateID_Url!:any;
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_activate:boolean = false;
  loader_delete:boolean = false;
  searchText:string = "";
  checkedStatus: boolean = false;
  Create_Form:FormGroup = new FormGroup ({
      name_ar         : new FormControl(null , [Validators.required]),
      name_en         : new FormControl(null , [Validators.required]),
      governorate_id  : new FormControl(null , [Validators.required])
    }
  );
  Update_Form:FormGroup = new FormGroup ({
      name_ar         : new FormControl(null , [Validators.required]),
      name_en         : new FormControl(null , [Validators.required]),
      id              : new FormControl(null , [Validators.required]),
      governorate_id  : new FormControl(null , [Validators.required])
    }
  );
  constructor (
    private ActivatedRoute: ActivatedRoute,
    private toast: NgToastService,
    private CountriesService: CountriesService,
    private GovernoratesService: GovernoratesService,
    private CitiesService: CitiesService,
    private datePipe: DatePipe,
    private Router: Router) { }
  ngOnInit(): void {
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.Create_Form.patchValue ({
      governorate_id : this.id
    });
    let index_active = (this.Router.url).split("/").findIndex((obj)=>{return obj == "active"});
    this.active_Url = (this.Router.url).split("/")[++index_active];
    let index_Country = (this.Router.url).split("/").findIndex((obj)=>{return obj == "governorates"});
    this.CountryID_Url = (this.Router.url).split("/")[++index_Country];
    let index_Governorate = (this.Router.url).split("/").findIndex((obj)=>{return obj == "cities"});
    this.GovernorateID_Url = (this.Router.url).split("/")[++index_Governorate];
    this.Cities(this.id);
    this.countries(this.active_Url);
    this.Governorates(this.CountryID_Url);
  }
  countries(id:any) {
    this.rows_Countries = [];
    this.CountriesService.show(id).subscribe ({
      next:(response)=> {
        this.rows_Countries = [];
        for(let i = 0; i < response?.data.length; ++i) {
          this.rows_Countries.push({id : response?.data[i]?.id, name : response?.data[i]?.name_en});
        }
      }
    });
  }
  Governorates(id:any) {
    this.rows_Governorates = [];
    this.GovernoratesService.show(id).subscribe ({
      next:(response)=> {
        this.rows_Governorates = [];
         for(let i = 0; i < response?.data.length; ++i) {
          this.rows_Governorates.push({id : response?.data[i]?.id, name : response?.data[i]?.name_en});
        }
      }
      }
    );
  }
  Cities(id:any) {
    this.rows = [];
    this.temp = [];
   this.CitiesService.show(id).subscribe ({
    next:(response)=> {
      this.rows = [];
      this.temp = [];
      this.rows = response?.data;
      this.temp = response?.data;
    }
   });
  }
  openCreateForm() {
    this.Create_Form.patchValue({
      name_ar         : "",
      name_en         : "",
    });
    this.show_create = true;
    this.loader_create = false;
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.CitiesService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          // this.show_create = false;
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          }
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
    if(!this.show_create) {
      window.setTimeout(()=> {
        window.location.reload();
      },1);
    }
  }
  UpdateCity(row:any) {
    console.log(row);
    this.show_update = true;
    this.Update_Form.patchValue({
      name_ar        : row.name_ar,
      name_en        : row.name_en,
      id             : row.id,
      governorate_id : row.governorate_id
    });
    if(row.active)this.checkedStatus = true;
    else this.checkedStatus = false;
    this.loader_update = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.CitiesService.update(Update_Form.value).subscribe ({
        next:(response)=> {
          this.loader_update = false;
          // this.show_update = false;
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          }
        }
      }
    );
  }
}
  close_update() {
    this.show_update = false;
    if(!this.show_update) {
      window.setTimeout(()=> {
        window.location.reload();
      },1);
    }
  }
  filter(value:any) {
    if(!value) {
      this.Cities(this.id);
    } else if(value) {
      this.rows = this.temp;
      for(let i = 0; i < this.rows.length; ++i) {
        if (this.rows[i].id.toString().includes(value.trim()) ||
            this.rows[i].active.toString().includes(value.trim()) ||
            this.rows[i].name_ar.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].name_en.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.datePipe.transform(this.rows[i].created_at, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLowerCase().includes(value.trim().toLowerCase())}) ! >= 0 ||
            this.datePipe.transform(this.rows[i].updated_at, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLowerCase().includes(value.trim().toLowerCase())}) ! >= 0) {
            this.temps.push(this.rows[i]);
        }
      }
      this.rows = this.temps;
      this.temps = [];
    }
  }
  cancelSearch() {
    this.searchText = "";
    this.Cities(this.id);
  }
  DeleteCityId(id:number) {
    this.deleted_City = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteCity() {
    this.loader_delete = true;
    this.CitiesService.delete(this.deleted_City).subscribe ({
      next:(response)=>{
        this.loader_delete = false;
        this.show_delete = false;
        if(response?.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          window.setTimeout(()=> {
            window.location.reload();
          },5001)
        }
      }
    });
  }
  active(id:any , active:any) {
    this.loader_activate = false;
    if(active) this.toggle = 0;
    else this.toggle = 1;
    this.active_id = id;
    this.show_activate = true;
    if(!this.toggle) {
      this.active_letter = "Are You Sure You Want Stopped This City";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This City";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.CitiesService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.Cities(this.id);
      }
    });
  }
  onChangeCountries(event:any) {
    if(event.target.value) {
      this.Governorates(event.target.value);
    }
  }
  onChangeGovernorates(event:any) {
    if(event.target.value) {
      this.Create_Form.patchValue ({
        governorate_id : event.target.value
      });
      this.Cities(event.target.value);
    }
  }
  update_active(event:any) {
    if(event.currentTarget.checked) {}
  }
}
