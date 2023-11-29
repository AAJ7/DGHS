import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CountriesService } from 'src/app/core/services/Countries/countries.service';
import { ClientsService } from 'src/app/core/services/user-manager/clients/clients.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_delete:boolean = false;
  searchText:string = "";
  checkedStatus: boolean = false;
  rows_Countries:any[] = [];
  show_create:boolean = false;
  show_delete:boolean = false;
  show_update:boolean = false;
  deleted_ClientId!:any;
  img_path!:string;
  img!:any;
  Base64!:any;
  Create_Form:FormGroup = new FormGroup ({
    name             : new FormControl(null , [Validators.required]),
    email            : new FormControl(null , [Validators.required,Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" )]),
    phone            : new FormControl(null , [Validators.required]),
    password         : new FormControl(null , [Validators.required, Validators.minLength(6)]),
    age              : new FormControl(null , [Validators.required]),
    address          : new FormControl(null , [Validators.required]),
    gender           : new FormControl(null , [Validators.required]),
    avatar           : new FormControl(null , [Validators.required]),
    country_id       : new FormControl(null , [Validators.required]),
    // active           : new FormControl(null , [Validators.required]),
  }
);
Update_Form:FormGroup = new FormGroup ({
    name       : new FormControl(null , [Validators.required]),
    phone      : new FormControl(null , [Validators.required]),
    email      : new FormControl(null , [Validators.required,Validators.email]),
    id         : new FormControl(null , [Validators.required]),
    password   : new FormControl(null, [Validators.required]),
    age              : new FormControl(null , [Validators.required]),
    address          : new FormControl(null , [Validators.required]),
    gender           : new FormControl(null , [Validators.required]),
    avatar           : new FormControl(null),
    country_id       : new FormControl(null , [Validators.required]),
  }
);
  constructor(
    private ClientsService: ClientsService,
    private CountriesService: CountriesService,
    private toast: NgToastService,
    private datePipe: DatePipe,
    private Router:Router) {


  }
  ngOnInit(): void {
    this.clients();
    this.countries();
  }
  clients() {
    this.rows = [];
    this.temp = [];
    this.ClientsService.show().subscribe({
      next:(response)=> {
        this.rows = [];
        this.temp = [];
        for(let i = 0; i < response?.data.length; ++i) {
          let obj = {
            id : response?.data[i]?.id,
            name : response?.data[i]?.name,
            // email_verified_at : response?.data[i]?.email_verified_at,
            email : response?.data[i]?.email,
            phone : response?.data[i]?.phone,
            age : response?.data[i]?.age,
            address : response?.data[i]?.address,
            gender : response?.data[i]?.gender,
            // provider_name : response?.data[i]?.provider_name,
            // provider_id : response?.data[i]?.provider_id,
            active : response?.data[i]?.active,
            created_at : response?.data[i]?.created_at,
            updated_at : response?.data[i]?.updated_at,
            avatar : response?.data[i]?.avatar,
            // country_id : response?.data[i]?.country_id,
            name_ar : response?.data[i]?.country?.name_ar,
            name_en : response?.data[i]?.country?.name_en,
            img_path : response?.data[i]?.country?.img_path,
            // country_active : response?.data[i]?.country?.active,
            // country_created_at : response?.data[i]?.country?.created_at,
            // country_updated_at : response?.data[i]?.country?.updated_at,
          };
          this.rows.push(obj);
          this.temp.push(obj);
        }
      }
    });
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
    if(event.target.value) {

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
      this.Create_Form.patchValue ({
        avatar : file
      });
    }
    else if(key === "update") {
      this.Update_Form.patchValue ({
        avatar : file
      });
    }
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.countries();
    this.Base64 = "";
    this.show_create = true;
    this.loader_create = false;
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.ClientsService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          if(!response?.status) this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {
              window.location.reload()
            } , 5001);
          }
          if(!response?.status && response?.message?.img_path) {
            this.toast.error({detail:"ERROR",summary:"The image must be type of png , jpg , jpeg",duration:5000});
            window.setTimeout(()=> {
              window.location.reload()
            } , 5001);
          }
          this.loader_create = false;
          this.show_create = false;
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
  }
  UpdateClient(row:any) {
    this.Update_Form.patchValue({
      name       : row.name,
      phone      : row.phone,
      id         : row.id,
      email      : row.email,
      age        : row.age,
      gender     : row.gender,
      country_id : row.country_id,
      address    : row.address
    });
    if(row.active)this.checkedStatus = true;
    else this.checkedStatus = false;
    this.loader_update = false;
    this.show_update = true;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.ClientsService.update(Update_Form.value).subscribe ({
       next:(response)=> {
        if(!response?.status)this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
        this.loader_update = false;
        this.show_update = false;
        this.Update_Form.reset();
        if(response?.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          window.setTimeout(()=> {
            window.location.reload()
          } , 5001);
        }
       }
      });
    }
  }
  close_update() {
    this.show_update = false;
  }
  GetDeleteClientId(id:number) {
    this.deleted_ClientId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteClient() {
    this.loader_delete = true;
    this.ClientsService.delete(this.deleted_ClientId).subscribe ({
      next:(response)=> {
        this.loader_delete = false;
        if(response?.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          window.setTimeout(()=> {
            window.location.reload()
          } , 5001);
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
            this.rows[i].provider_id.toString().includes(value.trim()) ||
            this.rows[i].country_id.toString().includes(value.trim()) ||
            this.rows[i].age.toString().includes(value.trim()) ||
            this.rows[i].active.toString().includes(value.trim()) ||
            this.rows[i].phone.toString().includes(value.trim()) ||
            this.rows[i].gender.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].country.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].address.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].name.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].provider_name.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].email.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].email_verified_at.toLowerCase().includes(value.trim().toLowerCase()) ||
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
  update_active(event:any) {
    if(event.currentTarget.checked) {}
  }
  clientsLocation(id:any) {
    this.Router.navigate(["/user-manager/clients/" + id + "/clients-locations"]);
  }
}
