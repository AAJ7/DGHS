import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompainesService } from 'src/app/core/services/Companies/compaines.service';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CountriesService } from 'src/app/core/services/Countries/countries.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  id!:any;
  rows:any[] = [];
  rows_Countries:any [] = [];
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
  checkedStatus: boolean = false;
  alertImgCreate: boolean = false;
  alertImgUpdate: boolean = false;
  selected_country:string = "";
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
    password        : new FormControl(null)
    }
  );
  constructor (
    private CompainesService: CompainesService,
    private Router :Router,
    private toast :NgToastService,
    private datePipe: DatePipe,
    private CountriesService: CountriesService){}

  ngOnInit(): void {
    this.compaines();
    this.countries();
  }
  countries() {
    this.rows_Countries = [];
    this.CountriesService.showWithoutActive().subscribe ({
      next:(response)=> {
        this.rows_Countries = [];
        for(let i = 0; i < response?.data.length; ++i) {
          this.rows_Countries.push({id : response?.data[i]?.id, name : response?.data[i]?.name_en});
        }
      }
    });
  }
  onChangeCountries(event:any) {
    if(event.target.value === "all") {
      this.compaines();
    } else if(event.target.value) {
      this.Create_Form.patchValue ({
        country_id : event.target.value
      });
      this.selected_country = event.target.value;
      this.compaines(event.target.value);
    }
  }
  compaines(id?:any) {
    this.rows = [];
    this.temp = [];
    if(id) {
      this.CompainesService.companies(id).subscribe ({
        next:(response)=> {
          this.rows = [];
          this.temp = [];
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
    else {
      this.CompainesService.get().subscribe ({
        next:(response)=> {
          this.rows = [];
          this.temp = [];
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
  }


  onFileSelected(event:any , key:string) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=> {
      this.Base64 = reader.result;
    };
    if(key === "add") {
      if((file?.name).endsWith("svg")) {
        this.alertImgCreate = true;
      } else if((file?.name).endsWith("png") || (file?.name).endsWith("jpg") || (file?.name).endsWith("jpeg")) {
        this.Create_Form.patchValue ({
          logo_path : file
        });
        this.alertImgCreate = false;
      }
    }
    else if(key === "update") {
      if((file?.name).endsWith("svg")) {
        this.alertImgUpdate = true;
      } else if((file?.name).endsWith("png") || (file?.name).endsWith("jpg") || (file?.name).endsWith("jpeg")) {
        this.Update_Form.patchValue ({
          logo_path : file
        });
        this.alertImgUpdate = false;
      }
    }
  }
  openCreateForm() {
    this.Create_Form.patchValue({
      name            : "",
      name_ar         : "",
      name_en         : "",
      email           : "",
      phone           : "",
      password        : "",
      logo_path       : "",
      orders_per_hour : ""
    });
    this.countries();
    this.loader_create = false;
    this.show_create = true;
  }
  onChangeCountriesCreate(event:any) {
    this.Create_Form.patchValue ({
      country_id : event.target.value
    });
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.CompainesService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          if(!response?.status)this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
          if(!response?.status && response?.message?.img_path) {
            this.toast.error({detail:"ERROR",summary:"The image must be type of png , jpg , jpeg",duration:5000});
          }
          if(!response?.status && response?.message?.email) {
            this.toast.error({detail:"ERROR",summary:`${response?.message?.email[0]}`,duration:5000});
          }
          if(!response?.status && response?.message?.phone) {
            this.toast.error({detail:"ERROR",summary:`${response?.message?.phone[0]}`,duration:5000});
          }
          if(!response?.status && response?.message?.phone && response?.message?.email) {
            this.toast.error({detail:"ERROR",summary:`${response?.message?.email[0]} and ${response?.message?.phone[0]}`,duration:5000});
          }
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          }
          // this.show_create = false;
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
  UpdateCompany(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      name       : row.name,
      name_ar    : row.name_ar,
      name_en    : row.name_en,
      phone      : row.phone,
      id         : row.id,
      email      : row.email,
      country_id : row.country_id,
      orders_per_hour : row.orders_per_hour
    });
    if(row.active)this.checkedStatus = true;
    else this.checkedStatus = false;
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
        if(!response?.status) {
          if(!response?.status && response?.message?.img_path) {
            this.toast.error({detail:"ERROR",summary:"The image must be type of png , jpg , jpeg",duration:5000});
          }
          if(!response?.status && response?.message?.email) {
            this.toast.error({detail:"ERROR",summary:`${response?.message?.email[0]}`,duration:5000});
          }
          if(!response?.status && response?.message?.phone) {
            this.toast.error({detail:"ERROR",summary:`${response?.message?.phone[0]}`,duration:5000});
          }
          if(!response?.status && response?.message?.phone && response?.message?.email) {
            this.toast.error({detail:"ERROR",summary:`${response?.message?.email[0]} and ${response?.message?.phone[0]}`,duration:5000});
          }
        }
        if(response?.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        }
       }
      });
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
  GetDeleteCompanyId(id:any) {
    this.deleted_CompanyId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteCompany() {
    this.loader_delete = true;
    this.CompainesService.delete(this.deleted_CompanyId).subscribe ({
      next:(response)=> {
        this.loader_delete = false;
        if(response?.status) {


          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          if(this.selected_country && this.selected_country != "") {
          this.compaines(this.selected_country);
        }
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
        if (this.rows[i].active.toString().includes(value.trim()) ||
            this.rows[i].orders_per_hour.toString().includes(value.trim()) ||
            this.rows[i].phone.toString().includes(value.trim()) ||
            this.rows[i].name.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].name_ar.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].name_en.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].email.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].role.toLowerCase().includes(value.trim().toLowerCase()) ||
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
    this.Router.navigate(["company/" + id + "/drivers"]);
  }
  update_active(event:any) {
    if(event.currentTarget.checked) {}
  }
}
