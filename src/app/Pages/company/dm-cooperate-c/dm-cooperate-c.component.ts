import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { CompainesService } from 'src/app/core/services/Companies/compaines.service';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DriversManagersService } from 'src/app/core/services/Drivers-Managers/drivers-managers.service';
import { DmCooperateCService } from 'src/app/core/services/dm-cooperate-c/dm-cooperate-c.service';


@Component({
  selector: 'app-dm-cooperate-c',
  templateUrl: './dm-cooperate-c.component.html',
  styleUrls: ['./dm-cooperate-c.component.scss']
})
export class DmCooperateCComponent implements OnInit {
  rows:any[] = [];
  rows_Companies:any[] = [];
  rows_DriversManagers:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  searchText:string = "";
  deleted_Id!:any;
  show_delete:boolean = false;;
  loader_delete:boolean = false;
  loader_create:boolean = false;
  show_create:boolean = false;
  Create_Form:FormGroup = new FormGroup ({
      company_id        : new FormControl(null , [Validators.required]),
      drivers_manager_id : new FormControl(null , [Validators.required]),
    }
  );
  Update_Form:FormGroup = new FormGroup ({
    company_id        : new FormControl(null , [Validators.required]),
    drivers_manager_id : new FormControl(null , [Validators.required]),
  }
);
  constructor (
    private DmCooperateCService: DmCooperateCService,
    private CompainesService: CompainesService,
    private DriversManagersService: DriversManagersService,
    private toast :NgToastService,
    private datePipe: DatePipe,) {}

  ngOnInit(): void {
    this.driversManagersWorkingWithCompanies();
    this.compaines();
    this.driversManagers();
  }
  driversManagersWorkingWithCompanies() {
    this.rows = [];
    this.temp = [];
    this.DmCooperateCService.get().subscribe ({
      next:(response)=> {
        this.rows = [];
        this.temp = [];
        for(let i = 0; i < response?.data.length; ++i) {
          let object = {
            id          :  response?.data[i]?.id,
            company_id : response?.data[i]?.company?.user?.id,
            company_name : response?.data[i]?.company?.user?.name,
            drivers_manager_id : response?.data[i]?.drivers_manager?.user?.id,
            drivers_manager_name : response?.data[i]?.drivers_manager?.user?.name,
            created_at : response?.data[i]?.created_at
        };
        this.rows.push(object);
        this.temp.push(object);
        }
      }
    });
  }
  driversManagersWorkingWithCompaniesWithCompanyID(id:any) {
    this.rows = [];
    this.temp = [];
    this.DmCooperateCService.getWithCompany(id).subscribe ({
      next:(response)=> {
        this.rows = [];
        this.temp = [];
        for(let i = 0; i < response?.data.length; ++i) {
          let object = {
            id                 :  response?.data[i]?.id,
            company_id         : response?.data[i]?.company?.user?.id,
            company_name       : response?.data[i]?.company?.user?.name,
            drivers_manager_id : response?.data[i]?.drivers_manager?.user?.id,
            drivers_manager_name : response?.data[i]?.drivers_manager?.user?.name,
            created_at : response?.data[i]?.created_at
        };
        this.rows.push(object);
        this.temp.push(object);
        }
      }
    });
  }
  driversManagersWorkingWithCompaniesWithDriverManagerID(id:any) {
    this.rows = [];
    this.temp = [];
    this.DmCooperateCService.getWithDriverManager(id).subscribe ({
      next:(response)=> {
        this.rows = [];
        this.temp = [];
        for(let i = 0; i < response?.data.length; ++i) {
          let object = {
            id          :  response?.data[i]?.id,
            company_id : response?.data[i]?.company?.user?.id,
            company_name : response?.data[i]?.company?.user?.name,
            drivers_manager_id : response?.data[i]?.drivers_manager?.user?.id,
            drivers_manager_name : response?.data[i]?.drivers_manager?.user?.name,
            created_at : response?.data[i]?.created_at
        };
        this.rows.push(object);
        this.temp.push(object);
        }
      }
    });
  }
  compaines() {
    this.rows_Companies = [];
    this.CompainesService.get().subscribe ({
      next:(response)=> {
        this.rows_Companies = [];
        for(let i = 0; i < (response?.data).length; ++i) {
          this.rows_Companies.push({id : response?.data[i]?.user_id, name : response?.data[i]?.user?.name});
        }
      }
    });
    }
    driversManagers() {
      this.rows_DriversManagers = [];
      this.DriversManagersService.get().subscribe ({
        next:(response)=> {
          this.rows_DriversManagers = [];
          for(let i = 0; i < response?.data.length; ++i) {
            this.rows_DriversManagers.push({id:response?.data[i]?.user?.id, name:response?.data[i]?.user?.name});
          }
        }
      });
    }
    onChangeCompanies(event:any) {
      if(event.target.value) {
        this.driversManagersWorkingWithCompaniesWithCompanyID(event.target.value);
      }
    }
    onChangeDriversManagers(event:any) {
      if(event.target.value) {
        this.driversManagersWorkingWithCompaniesWithDriverManagerID(event.target.value);
      }
    }
    openCreateForm() {
      this.Create_Form.reset();
      this.compaines();
      this.driversManagers();
      this.loader_create = false;
      this.show_create = true;
    }
    onChangeCompaniesCreate(event:any) {
      this.Create_Form.patchValue ({
        company_id : event.target.value
      });
    }
    onChangeDriversManagersCreate(event:any) {
      this.Create_Form.patchValue ({
        drivers_manager_id : event.target.value
      });
    }
    CreateForm(Create_Form:FormGroup) {
      if(Create_Form.valid) {
        this.loader_create = true;
        this.DmCooperateCService.post(Create_Form.value).subscribe ({
          next:(response)=> {
            this.loader_create = false;
            if(!response?.status)this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
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
    GetDelete(id:any) {
      this.deleted_Id = id;
      this.show_delete = true;
      this.loader_delete = false;
    }
    delete() {
      this.loader_delete = true;
      this.DmCooperateCService.delete(this.deleted_Id).subscribe ({
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
              this.rows[i].company_id.toString().includes(value.trim()) ||
              this.rows[i].drivers_manager_id.toString().includes(value.trim()) ||
              this.rows[i].company_name.toLowerCase().includes(value.trim().toLowerCase()) ||
              this.rows[i].drivers_manager_name.toLowerCase().includes(value.trim().toLowerCase()) ||
              this.datePipe.transform(this.rows[i].created_at, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLowerCase().includes(value.trim().toLowerCase())}) ! >= 0) {
              this.temps.push(this.rows[i]);
          }
        }
        this.rows = this.temps;
        this.temps = [];
      }
    }
    cancelSearch() {
      this.searchText = "";
      if(!this.searchText){
        window.location.reload();
      }
    }
}
