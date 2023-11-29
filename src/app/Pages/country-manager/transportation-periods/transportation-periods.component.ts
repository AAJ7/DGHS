import { CountryManagerTransportationPeriodService } from './../../../core/services/country_manager_transportation_period/country-manager-transportation-period.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute , Router} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-transportation-periods',
  templateUrl: './transportation-periods.component.html',
  styleUrls: ['./transportation-periods.component.scss']
})
export class TransportationPeriodsComponent implements OnInit {
  id!:any;
  country_id!:any;
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  deleted_shift!:any;
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_activate:boolean = false;
  show_stop:boolean = false;
  active_letter!:string;
  active_button!:string;
  active_id!:any;
  toggle!:any;
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_activate:boolean = false;
  loader_delete:boolean = false;
  searchText:string = "";
  Create_Form:FormGroup = new FormGroup
  (
    {
      from     : new FormControl(null , [Validators.required]),
      to     : new FormControl(null , [Validators.required]),
      user_id    : new FormControl(null , [Validators.required]),
    }
  );
  Update_Form:FormGroup = new FormGroup
  (
    {
      from     : new FormControl(null , [Validators.required]),
      to     : new FormControl(null , [Validators.required]),
      user_id    : new FormControl(null , [Validators.required]),
      id    : new FormControl(null , [Validators.required]),
    }
  );

  constructor(private CountryManagerTransportationPeriodService:CountryManagerTransportationPeriodService,
    private ActivatedRoute: ActivatedRoute,
    private Router:Router,
    private toast:NgToastService,
    private datePipe: DatePipe) {}

  ngOnInit(): void {
    let index = (this.Router.url).split("/").findIndex((obj)=>{return obj == "country"});
    this.country_id = (this.Router.url).split("/")[++index];
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.transportation_periods(this.id);
  }
  transportation_periods(id:any) {
    this.CountryManagerTransportationPeriodService.transportation_period(id).subscribe ({
      next:(response)=> {
        this.rows = response?.data;
        this.temp = response?.data;
      }
    });
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.show_create = true;
    this.Create_Form.patchValue ({
      user_id  : this.id,
    });
    this.loader_create = false;
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.CountryManagerTransportationPeriodService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          this.show_create = false;
          if(!response?.status) {
            let f = response?.message?.from;
            let t = response?.message?.to;
            if(f && t) {
              this.toast.error({detail:"ERROR",summary:"from & to doesn't match H:i format.",duration:5000});
            }
            else if(response?.message?.from) {
              this.toast.error({detail:"ERROR",summary:response?.message?.from,duration:5000});
            }
            else if(response?.message?.to) {
              this.toast.error({detail:"ERROR",summary:response?.message?.to,duration:5000});
            }
          }
          this.transportation_periods(this.id);
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
  }
  UpdateShift(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      id      : row.id,
      user_id : row.user_id,
      from    : (row.from).slice(0, -3),
      to      : (row.to).slice(0, -3)
    });
    this.loader_update = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.CountryManagerTransportationPeriodService.update(Update_Form.value).subscribe ({
        next:(response)=> {
          this.loader_update = false;
          this.show_update = false;
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          this.transportation_periods(this.id);
        }
      }
    );
    }
  }
  close_update() {
    this.show_update = false;
  }
  DeleteShiftId(id:number) {
    this.deleted_shift = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteShift()
  {
    this.loader_delete = true;
    this.CountryManagerTransportationPeriodService.delete(this.deleted_shift).subscribe ({
      next:(response)=>{
        this.loader_delete = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.transportation_periods(this.id);
        this.show_delete = false;
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
      this.active_letter = "Are You Sure You Want Stopped This Shift";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This Shift";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.CountryManagerTransportationPeriodService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.transportation_periods(this.id);
      }
    });
  }
  filter(value:any) {
    if(!value) {
      this.transportation_periods(this.id);
    } else if(value) {
      this.rows = this.temp;
      for(let i = 0; i < this.rows.length; ++i) {
        if (this.rows[i].id.toString().includes(value.trim()) ||
            this.rows[i].user_id.toString().includes(value.trim()) ||
            this.rows[i].active.toString().includes(value.trim()) ||
            this.rows[i].from.toString().includes(value.trim()) ||
            this.rows[i].to.toString().includes(value.trim()) ||
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
    this.transportation_periods(this.id);
  }
  drivers_assigned(id:any) {
    this.Router.navigate(["country_managers/country/" + this.country_id + "/transportation_periods/"  + this.id + "/drivers/" + id]);
  }
}
