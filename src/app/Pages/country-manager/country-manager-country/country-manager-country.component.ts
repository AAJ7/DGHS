import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from 'src/app/core/services/Countries/countries.service';
import { CountryManagersService } from 'src/app/core/services/Country-Managers/country-managers.service';
import { NgToastService } from 'ng-angular-popup';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-country-manager-country',
  templateUrl: './country-manager-country.component.html',
  styleUrls: ['./country-manager-country.component.scss']
})
export class CountryManagerCountryComponent implements OnInit{

  show_create:boolean = false;
  show_delete:boolean = false;
  show_update:boolean = false;
  deleted_CountryManagerId!:number;
  country!:string;
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  id!:number;
  img:string = "";
  object!:any;
  active_letter!:string;
  active_button!:string;
  active_id!:any;
  toggle!:any;
  show_activate:boolean = false;
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_activate:boolean = false;
  loader_delete:boolean = false;
  searchText:string = "";
  Create_Form:FormGroup = new FormGroup ({
      name             : new FormControl(null , [Validators.required]),
      email            : new FormControl(null , [Validators.required,Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" )]),
      phone            : new FormControl(null , [Validators.required]),
      password         : new FormControl(null , [Validators.required]),
      // confirm_password : new FormControl(null , [Validators.required]),
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

  constructor(private route:ActivatedRoute,private router:Router,
    private CountryManagersService:CountryManagersService,private CountriesService:CountriesService,
    private toast:NgToastService, private datePipe: DatePipe){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.router.events.subscribe(() => {
      this.id = this.route.snapshot.params['id'];
      this.getCountries();
  });
  this.CountryManagers(this.id);
}

  getCountries() {
    this.CountriesService.GETCountries().subscribe ({
      next:(response)=> {
        this.object = response?.data.find((item:any) => item.id == this.id);
        this.img = "https://dev.generalhouseservices.com/" + this.object.img_path;
      }
    });
  }
  CountryManagers(id:any) {
    this.CountryManagersService.show(id).subscribe ({
      next:(response)=> {
        this.rows = response?.data;
        this.temp = response?.data;
      }
    });
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
    Create_Form.patchValue({
      country_id : this.id
    });
    if(Create_Form.valid) {
      this.loader_create = true;
      this.CountryManagersService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          if(!response?.status)  this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
          if(response?.status) this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          this.CountryManagers(this.id);
          this.show_create = false;
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
  }

  UpdateCountryManager(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      name       : row.name,
      phone      : row.phone,
      id         : row.id,
      email      : row.email,
      country_id : this.id
    });
    this.loader_update = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.CountryManagersService.update(Update_Form.value).subscribe ({
       next:(response)=> {
        if(!response?.status)this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
        this.loader_update = false;
        this.show_update = false;
        if(response?.status)this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.CountryManagers(this.id);
       }
      });
    }
  }
  close_update() {
    this.show_update = false;
  }
  GetDeleteCountryManagerId(id:number) {
    this.deleted_CountryManagerId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteCountryManager() {
    this.loader_delete = true;
    this.CountryManagersService.delete(this.deleted_CountryManagerId).subscribe ({
      next:(response)=> {
        this.loader_delete = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.CountryManagers(this.id);
        this.show_delete = false;
      }
    });
  }
  filter(value:any) {
    if(!value) {
      this.CountryManagers(this.id);
    } else if(value) {
      this.rows = this.temp;
      for(let i = 0; i < this.rows.length; ++i) {
        if (this.rows[i].id.toString().includes(value.trim()) ||
            this.rows[i].active.toString().includes(value.trim()) ||
            this.rows[i].phone.toString().includes(value.trim()) ||
            this.rows[i].name.toLowerCase().includes(value.trim().toLowerCase()) ||
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
    this.CountryManagers(this.id);
  }

  active(id:any , active:any) {
    this.loader_activate = false;
    if(active) this.toggle = 0;
    else this.toggle = 1;
    this.active_id = id;
    this.show_activate = true;
    if(!this.toggle) {
      this.active_letter = "Are You Sure You Want Stopped This Manager";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This Manager";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.CountryManagersService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.CountryManagers(this.id);
      }
    });
  }
  companies(id:any) {
    this.router.navigate(["/country_managers/country/" + this.id + "/country_manager/" + id + "/companies"]);
  }
  governorates() {
    this.router.navigate(["/country_managers/country/" + this.id + "/governorates"]);
  }
  products(id:any) {
    this.router.navigate(["country_managers/country/" + this.id + "/country_manager/" + id + "/products"]);
  }
}
