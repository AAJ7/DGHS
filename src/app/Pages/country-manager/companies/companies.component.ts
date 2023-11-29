import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { CompainesService } from 'src/app/core/services/Companies/compaines.service';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  id!:any;
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  show_create:boolean = false;
  show_delete:boolean = false;
  show_update:boolean = false;
  deleted_CompanyId!:number;
  img:string = "";
  active_letter!:string;
  active_button!:string;
  active_id!:any;
  toggle!:any;
  Base64!:any;
  img_path!:string;
  show_activate:boolean = false;
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_activate:boolean = false;
  loader_delete:boolean = false;
  country_manager_id!:any;
  searchText:string = "";
  Create_Form:FormGroup = new FormGroup ({
      name            : new FormControl(null , [Validators.required]),
      name_ar         : new FormControl(null , [Validators.required]),
      name_en         : new FormControl(null , [Validators.required]),
      email           : new FormControl(null , [Validators.required,Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" )]),
      phone           : new FormControl(null , [Validators.required]),
      password        : new FormControl(null , [Validators.required]),
      logo_path       : new FormControl(null , [Validators.required]),
      country_id      : new FormControl(null , [Validators.required]),
      orders_per_hour : new FormControl(null , [Validators.required]),
    }
  );
  Update_Form:FormGroup = new FormGroup ({
    name            : new FormControl(null , [Validators.required]),
    name_ar         : new FormControl(null , [Validators.required]),
    name_en         : new FormControl(null , [Validators.required]),
    orders_per_hour : new FormControl(null , [Validators.required]),
    phone           : new FormControl(null , [Validators.required]),
    logo_path       : new FormControl(null),
    email           : new FormControl(null , [Validators.required,Validators.email]),
    id              : new FormControl(null , [Validators.required]),
    country_id      : new FormControl(null , [Validators.required]),
    password        : new FormControl(null , [Validators.required]),
    }
  );

  constructor(private ActivatedRoute: ActivatedRoute,private CompainesService:CompainesService,private Router:Router,private toast:NgToastService,
    private datePipe: DatePipe){}
  ngOnInit(): void {
    this.country_manager_id = this.ActivatedRoute.snapshot.paramMap.get('id');
    let index = (this.Router.url).split("/").findIndex((obj)=>{return obj == "country"});
    this.id = (this.Router.url).split("/")[++index];
    this.compaines(this.id);
  }
  compaines(id:any) {
    this.rows = [];
    this.CompainesService.companies(id).subscribe ({
      next:(response)=> {
        this.rows = [];
        for(let i = 0; i < (response?.data).length; ++i) {
          let obj = {
            user_id : (response?.data)[i].user_id,
            name_ar : (response?.data)[i].name_ar,
            name_en : (response?.data)[i].name_en,
            orders_per_hour : (response?.data)[i].orders_per_hour,
            logo_path : (response?.data)[i].logo_path,
            deleted_at : (response?.data)[i]["user"]["deleted_at"],
            country_id : (response?.data)[i].country_id,
            id : (response?.data)[i]["user"]["id"] ,
            name : (response?.data)[i]["user"]["name"],
            phone : (response?.data)[i]["user"]["phone"],
            email : (response?.data)[i]["user"]["email"],
            role : (response?.data)[i]["user"]["role"],
            active : (response?.data)[i]["user"]["active"],
            created_at : (response?.data)[i]["user"]["created_at"],
            updated_at : (response?.data)[i]["user"]["updated_at"]
          };
          this.rows.push(obj);
          this.temp.push(obj);
        }
      }
    });
  }
  onFileSelected(event:any , key:string) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=> {
      this.Base64 = reader.result;
    };
    if(key === "add") {
      this.Create_Form.patchValue ({
        logo_path : file
      });
    }
    else if(key === "update") {
      this.Update_Form.patchValue ({
        logo_path : file
      });
    }
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.Create_Form.patchValue ({
      country_id : this.id
    }
  );
    this.show_create = true;
    this.loader_create = false;
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.CompainesService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          if(!response?.status)  this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
          if(response?.status) this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          this.compaines(this.id);
          this.show_create = false;
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
  }
  UpdateCompany(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      name       : row.name,
      name_ar    : row.name_ar,
      name_en    : row.name_en,
      phone      : row.phone,
      id         : row.id,
      email      : row.email,
      country_id : this.id,
      orders_per_hour : row.orders_per_hour
    });
    this.loader_update = false;
    this.img_path = "https://dev.generalhouseservices.com/" + row.logo_path;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.CompainesService.update(Update_Form.value).subscribe ({
       next:(response)=> {
        if(!response?.status)this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
        this.loader_update = false;
        this.show_update = false;
        if(response?.status)this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.compaines(this.id);
       }
      });
    }
  }
  close_update() {
    this.show_update = false;
  }
  GetDeleteCompanyId(id:any) {
    this.deleted_CompanyId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteCompany() {
    this.loader_delete = true;
    this.CompainesService.delete( this.deleted_CompanyId).subscribe ({
      next:(response)=> {
        this.loader_delete = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.compaines(this.id);
        this.show_delete = false;
      }
    });
  }
  transportation_periods(id:any) {
    this.Router.navigate(["country_managers/country/" + this.id + "/country_manager/" + this.country_manager_id + "/companies/" + id + "/transportation_periods"]);
  }
  filter(value:any) {
    if(!value) {
      this.compaines(this.id);
    } else if(value) {
      this.rows = this.temp;
      for(let i = 0; i < this.rows.length; ++i) {
        if (this.rows[i].id.toString().includes(value.trim()) ||
            this.rows[i].user_id.toString().includes(value.trim()) ||
            this.rows[i].active.toString().includes(value.trim()) ||
            this.rows[i].phone.toString().includes(value.trim()) ||
            this.rows[i].name.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].name_ar.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].name_en.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].email.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].role.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.datePipe.transform(this.rows[i].created_at, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLowerCase().includes(value.trim().toLowerCase())}) ! >= 0 ||
            this.datePipe.transform(this.rows[i].deleted_at, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLowerCase().includes(value.trim().toLowerCase())}) ! >= 0 ||
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
    this.compaines(this.id);
  }
  categories(id:any) {
    this.Router.navigate(["country_managers/country/" + this.id + /country_manager/ + this.country_manager_id + "/company/" + id + "/products"]);
  }
}
