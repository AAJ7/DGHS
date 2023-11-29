import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CountriesService } from 'src/app/core/services/Countries/countries.service';
import { GovernoratesService } from 'src/app/core/services/Governorates/governorates.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-governorates',
  templateUrl: './governorates.component.html',
  styleUrls: ['./governorates.component.scss']
})
export class GovernoratesComponent implements OnInit {
  id!:any;
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_stop:boolean = false;
  show_activate:boolean = false;
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  rows_Countries:any[] = [];
  img_path!:string;
  img!:any;
  Base64!:any;
  active_letter!:string;
  active_button!:string;
  active_id!:any;
  toggle!:any;
  active_Url!:any;
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_activate:boolean = false;
  loader_delete:boolean = false;
  deleted_Governorate!:number;
  searchText:string = "";
  checkedStatus: boolean = false;
  Create_Form:FormGroup = new FormGroup ({
      name_ar     : new FormControl(null , [Validators.required]),
      name_en     : new FormControl(null , [Validators.required]),
      country_id  : new FormControl(null , [Validators.required])
    }
  );
  Update_Form:FormGroup = new FormGroup ({
      name_ar     : new FormControl(null , [Validators.required]),
      name_en     : new FormControl(null , [Validators.required]),
      id          : new FormControl(null , [Validators.required]),
      country_id  : new FormControl(null , [Validators.required])
    }
  );
  constructor (
    private datePipe: DatePipe,
    private ActivatedRoute: ActivatedRoute,
    private GovernoratesService: GovernoratesService,
    private CountriesService: CountriesService,
    private toast:NgToastService,
    private Router:Router) { }
  ngOnInit() {
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.Create_Form.patchValue({
      country_id : this.id
    });
    this.Governorates(this.id);
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
  Governorates(id:any) {
    this.rows = [];
    this.temp = [];
    this.GovernoratesService.show(id).subscribe ({
      next:(response)=> {
        this.rows = [];
        this.temp = [];
        this.rows = response?.data;
        this.temp = response?.data;
      }
      }
    );
  }
  openCreateForm() {
    this.Create_Form.patchValue({
      name_ar     : "",
      name_en     : ""
    });
  this.loader_create = false;
  this.show_create = true;
  }
  CreateForm(Create_Form:FormGroup) {
    console.log(Create_Form.value);
    if(Create_Form.valid) {
      this.loader_create = true;
      this.GovernoratesService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          // this.show_create = false;
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
    if(!this.show_create) {
      window.setTimeout(()=>{
        window.location.reload();
      },1);
    }
  }
  UpdateGovernorate(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      name_ar    : row.name_ar,
      name_en    : row.name_en,
      id         : row.id,
      country_id : row.country_id
    });
    if(row.active)this.checkedStatus = true;
    else this.checkedStatus = false;
    this.loader_update = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
        this.loader_update = true;
      this.GovernoratesService.update(Update_Form.value).subscribe ({
          next:(response)=> {
            this.loader_update = false;
            // this.show_update = false;
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          }
        }
      );
    }
  }
  close_update() {
    this.show_update = false;
    if(!this.show_update) {
      window.setTimeout(()=>{
        window.location.reload();
      },1);
    }
  }
  GetGovernorateId(id:number) {
    this.deleted_Governorate = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteGovernorate() {
     this.loader_delete = true;
    this.GovernoratesService.delete(this.deleted_Governorate).subscribe ({
      next:(response)=> {
        this.loader_delete = false;
        this.show_delete = false;
        if(response?.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          window.setTimeout(()=>{
            window.location.reload();
          },5001);
        }
      }
    });
  }
  cities(id:number) {
    this.Router.navigate(["countries/" + this.id + "/governorates/" + id + "/cities"]);
  }
  filter(value:any) {
    if(!value) {
      this.Governorates(this.id);
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
    this.Governorates(this.id);
  }
  active(id:any , active:any) {
    this.loader_activate = false;
    if(active) this.toggle = 0;
    else this.toggle = 1;
    this.active_id = id;
    this.show_activate = true;
    if(!this.toggle) {
      this.active_letter = "Are You Sure You Want Stopped This Governorate";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This Governorate";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.GovernoratesService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.Governorates(this.id);
      }
    });
  }
  onChangeCountries(event:any) {
    if(event.target.value) {
      this.Governorates(event.target.value);
      this.Create_Form.patchValue({
        country_id : event.target.value
      });
    }
  }
  update_active(event:any) {
    if(event.currentTarget.checked) {}
  }
}
