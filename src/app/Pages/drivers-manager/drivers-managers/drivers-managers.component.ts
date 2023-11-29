import { NgToastService } from 'ng-angular-popup';
import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriversManagersService } from 'src/app/core/services/Drivers-Managers/drivers-managers.service';
import { DatePipe } from '@angular/common';
import { CountriesService } from 'src/app/core/services/Countries/countries.service';


@Component({
  selector: 'app-drivers-managers',
  templateUrl: './drivers-managers.component.html',
  styleUrls: ['./drivers-managers.component.scss']
})
export class DriversManagersComponent implements OnInit {
  show_create:boolean = false;
  show_delete:boolean = false;
  show_update:boolean = false;
  deleted_DriverManagerId!:any;
  rows:any[] = [];
  rows_Countries:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  id!:number;
  img:string = "";
  object!:any;
  searchText:string = "";
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_delete:boolean = false;
  Create_Form:FormGroup = new FormGroup ({
      name             : new FormControl(null , [Validators.required]),
      email            : new FormControl(null , [Validators.required,Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" )]),
      phone            : new FormControl(null , [Validators.required]),
      password         : new FormControl(null , [Validators.required]),
      country_id       : new FormControl(null , [Validators.required])
    }
  );
  Update_Form:FormGroup = new FormGroup ({
      name       : new FormControl(null , [Validators.required]),
      phone      : new FormControl(null , [Validators.required]),
      email      : new FormControl(null , [Validators.required,Validators.email]),
      id         : new FormControl(null , [Validators.required]),
      country_id : new FormControl(null , [Validators.required]),
    }
  );

  constructor (
    private route: ActivatedRoute,
    private Router :Router,
    private toast:NgToastService,
    private DriversManagersService: DriversManagersService,
    private datePipe: DatePipe,
    private CountriesService: CountriesService){}
  ngOnInit(): void {
    this.DriversManager();
    this.countries();
  }
  DriversManager(id?:any) {
    this.rows = [];
    this.temp = [];
    if(id) {
      this.DriversManagersService.show(id).subscribe ({
        next:(response)=> {
          this.rows = [];
          this.temp = [];
          for(let i = 0; i < (response?.data).length; ++i) {
            let obj = {
              id : (response?.data)[i]["user"]["id"] ,
              name : (response?.data)[i]["user"]["name"],
              phone : (response?.data)[i]["user"]["phone"],
              email : (response?.data)[i]["user"]["email"],
              user_id : (response?.data)[i]["user_id"],
              country_id : (response?.data)[i]["country_id"],
              created_at : (response?.data)[i]["user"]["created_at"],
              updated_at : (response?.data)[i]["user"]["updated_at"]
            };
            this.rows.push(obj);
            this.temp.push(obj);
          }
        }
      });
    } else {
      this.DriversManagersService.get().subscribe ({
        next:(response)=> {
          this.rows = [];
          this.temp = [];
          for(let i = 0; i < (response?.data).length; ++i) {
            let obj = {
              id : (response?.data)[i]["user"]["id"],
              user_id : (response?.data)[i]["user_id"],
              country_id : (response?.data)[i]["country_id"],
              name : (response?.data)[i]["user"]["name"],
              phone : (response?.data)[i]["user"]["phone"],
              email : (response?.data)[i]["user"]["email"],
              created_at : (response?.data)[i]["user"]["created_at"],
              updated_at : (response?.data)[i]["user"]["updated_at"]
            };
            this.rows.push(obj);
            this.temp.push(obj);
          }
        }
      });
    }
  }
  countries() {
    this.rows_Countries = [];
    this.CountriesService.showWithoutActive().subscribe ({
      next:(response)=> {
        this.rows_Countries = [];
        for(let i = 0; i  < response?.data.length; ++i) {
          this.rows_Countries.push({id : response?.data[i]?.id, name : response?.data[i]?.name_en});
        }
      }
    });
  }
  onChangeCountries(event:any) {
    if(event.target.value === "all") {
      this.DriversManager();
    } else {
      this.DriversManager(event.target.value);
    }
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.countries();
    this.show_create = true;
    this.loader_create = false;
  }
  onChangeCountriesCreate(event:any) {
    if(event.target.value) {
      this.Create_Form.patchValue({
        country_id : event.target.value
      });
    }
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.DriversManagersService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          if(!response?.status)  this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {
              window.location.reload();
            },5001);
          }
          this.show_create = false;
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
  }
  UpdateDriverManager(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      name       : row.name,
      phone      : row.phone,
      id         : row.id,
      email      : row.email,
      country_id : row.country_id
    });
    this.loader_update = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.DriversManagersService.update(Update_Form.value).subscribe ({
       next:(response)=> {
        console.log(response);
        if(!response?.status)this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
        this.loader_update = false;
        this.show_update = false;
        if(response?.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          window.setTimeout(()=> {
            window.location.reload();
          },5001);
        }
       }
      });
    }
  }
  close_update() {
    this.show_update = false;
  }
  GetDeleteDriverManagerId(id:number) {
    this.deleted_DriverManagerId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteDriverManager() {
    this.loader_delete = true;
    this.DriversManagersService.delete(this.deleted_DriverManagerId).subscribe ({
      next:(response)=> {
        this.loader_delete = false;
        if(response?.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          window.setTimeout(()=> {
            window.location.reload();
          },5001);
        }
        this.show_delete = false;
      }
    });
  }
  filter(value:any) {
    if(!value) {
      window.location.reload();
    } else if(value) {
      this.rows = this.temp;
      for(let i = 0; i < this.rows.length; ++i) {
        if (this.rows[i].id.toString().includes(value.trim()) ||
            this.rows[i].country_id.toString().includes(value.trim()) ||
            this.rows[i].user_id.toString().includes(value.trim()) ||
            this.rows[i].phone.toString().includes(value.trim()) ||
            this.rows[i].name.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].email.toLowerCase().includes(value.trim().toLowerCase()) ||
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
    if(!this.searchText) {
      window.location.reload();
    }
  }

  drivers(id:any) {
    this.Router.navigate(["drivers-manager/" + id + "/drivers"]);
  }
}
