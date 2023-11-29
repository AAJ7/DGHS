import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute , Router} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DriversService } from 'src/app/core/services/Drivers/drivers.service';
import { AssignedDriversService } from 'src/app/core/services/assigned_drivers/assigned-drivers.service';
import { DatePipe } from '@angular/common';
import { CountryManagerTransportationPeriodService } from './../../../core/services/country_manager_transportation_period/country-manager-transportation-period.service';




@Component({
  selector: 'app-drivers-assigned',
  templateUrl: './drivers-assigned.component.html',
  styleUrls: ['./drivers-assigned.component.scss']
})
export class DriversAssignedComponent implements OnInit {
  drivers_id:any[] = [];
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  id!:any;
  deleted_driver!:any;
  show_create:boolean = false;
  show_loader:boolean = false;
  loader_create:boolean = false;
  show_update:boolean = false;
  loader_update:boolean = false;
  show_delete:boolean = false;
  loader_delete:boolean = false;
  Drivers:any[] = [];
  user_id!:any;
  Categories_ID:any[] = [];
  Drivers_ID:any[] = [];
  Companies_ID:any[] = [];
  searchText:string = "";
  Create_Form:FormGroup = new FormGroup
  (
    {
      transportation_period_id     : new FormControl(null , [Validators.required]),
      driver_id     : new FormControl(null , [Validators.required]),
      capacity    : new FormControl(null , [Validators.required]),
    }
  );
  Update_Form:FormGroup = new FormGroup
  (
    {
      id     : new FormControl(null , [Validators.required]),
      capacity    : new FormControl(null , [Validators.required]),
    }
  );

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private DriversService:DriversService,
    private AssignedDriversService:AssignedDriversService,
    private toast:NgToastService,
    private CountryManagerTransportationPeriodService:CountryManagerTransportationPeriodService,
    private Router:Router,
    private datePipe: DatePipe) {}

    ngOnInit(): void {
      let index = (this.Router.url).split("/").findIndex((obj)=>{return obj == "transportation_periods"});
      this.user_id = (this.Router.url).split("/")[++index];
      this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
      this.transportation_periods(this.user_id);
      this.Drivers_Id();
    }
    Drivers_Id() {
      this.Drivers = [];
      this.DriversService.drivers().subscribe ({
        next:(response) => {
          this.Drivers = [];
          for(let i = 0; i < response?.data.length; ++i) {
            this.Drivers.push(response?.data[i]?.user?.name);
            this.Drivers_ID.push({name : response?.data[i]?.user?.name , id : response?.data[i]?.user?.id});
          }
        }
      });
    }
    ChangeDrivers(event:any) {
      if(event.target.value) {
        for(let i = 0; i < this.Drivers_ID.length; ++i) {
          if(this.Drivers_ID[i].name === event.target.value) {
            this.Create_Form.patchValue ({
              driver_id : this.Drivers_ID[i].id
            });
          }
        }
      }
    }
    transportation_periods(id:any) {
      this.CountryManagerTransportationPeriodService.transportation_period(id).subscribe ({
        next:(response)=> {
          this.rows = [];
          for(let i = 0; i < (response?.data).length; ++i) {
            if((response?.data)[i].id == this.id) {
              for (var key in (response?.data)[i]["drivers"]) {
                if (!(response?.data)[i]["drivers"].hasOwnProperty(key)) continue;
                let obj = (response?.data)[i]["drivers"][key];
                let X = {
                  id : obj.id,
                  driver_id : obj.driver_id,
                  transportation_period_id : obj.transportation_period_id,
                  capacity : obj?.capacity,
                  name :obj.driver?.user?.name,
                  phone : obj.driver?.user?.phone
                };
                this.rows.push(X);
                this.temp.push(X);
              }
            }
          }
        }
      });
    }
    openCreateForm() {
      this.Create_Form.reset();
      this.show_create = true;
      this.Create_Form.patchValue ({
        transportation_period_id  : this.id,
      });
      this.loader_create = false;
    }
    CreateForm(Create_Form:FormGroup) {
      if(Create_Form.valid) {
        this.loader_create = true;
        this.AssignedDriversService.create(Create_Form.value).subscribe ({
          next:(response)=> {
            this.loader_create = false;
            this.show_create = false;
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          }
        });
      }
    }
    close_create() {
      this.show_create = false;
    }
    UpdateDriver(row:any) {
      this.show_update = true;
      this.Update_Form.patchValue({
        id : row.id,
        capacity : row.capacity,
      });
      this.loader_update = false;
      this.show_update = false;
    }
    UpdateForm(Update_Form:FormGroup) {
      if(Update_Form.valid) {
          this.loader_update = true;
        this.AssignedDriversService.update(Update_Form.value).subscribe ({
            next:(response)=> {
              this.loader_update = false;
              this.show_update = false;
              this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            }
          }
        );
      }
    }
    close_update() {
      this.show_update = false;
    }
    GetDriverId(id:number) {
      this.deleted_driver = id;
      this.show_delete = true;
      this.loader_delete = false;
    }
    deleteDriver() {
       this.loader_delete = true;
       this.AssignedDriversService.delete(this.deleted_driver).subscribe ({
        next:(response)=>
        {
          this.loader_delete = false;
          this.show_delete = false;
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        }
      });
    }

  filter(value:any) {
    if(!value) {
    } else if(value) {
      this.rows = this.temp;
      for(let i = 0; i < this.rows.length; ++i) {
        if (this.rows[i].id.toString().includes(value.trim()) ||
            this.rows[i].driver_id.toString().includes(value.trim()) ||
            this.rows[i].transportation_period_id.toString().includes(value.trim()) ||
            this.rows[i].phone.toString().includes(value.trim()) ||
            this.rows[i].capacity.toString().includes(value.trim()) ||
            this.rows[i].name.toLowerCase().includes(value.trim().toLowerCase())) {
            this.temps.push(this.rows[i]);
        }
      }
      this.rows = this.temps;
      this.temps = [];
    }
  }
  cancelSearch() {
    this.searchText = "";
  }

}
