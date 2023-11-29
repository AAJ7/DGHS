import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute } from '@angular/router';
import { DriversService } from 'src/app/core/services/Drivers/drivers.service';
import { DatePipe } from '@angular/common';
import { DriversManagersService } from 'src/app/core/services/Drivers-Managers/drivers-managers.service';




@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  id!:any;
  rows:any[] = [];
  rows_DriversManagers:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  deleted_driverID!:any;
  show_create:boolean = false;
  show_delete:boolean = false;
  show_update:boolean = false;
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
      manager_id        : new FormControl(null , [Validators.required])
    }
  );
  Update_Form:FormGroup = new FormGroup ({
      name       : new FormControl(null , [Validators.required]),
      phone      : new FormControl(null , [Validators.required]),
      email      : new FormControl(null , [Validators.required,Validators.email]),
      id         : new FormControl(null , [Validators.required]),
      password   : new FormControl(null , [Validators.required]),
      manager_id : new FormControl(null , [Validators.required])
    }
  );
  constructor (
    private DriversService: DriversService,
    private toast :NgToastService,
    private datePipe: DatePipe,
    private ActivatedRoute: ActivatedRoute,
    private DriversManagersService: DriversManagersService) {}

  ngOnInit(): void {
  this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
  this.DriversWithManagerID(this.id);
  this.driversManagers();
}
DriversWithManagerID(id:any) {
  this.rows = [];
  this.temp = [];
  this.DriversService.driversWithManagerID(id).subscribe ({
    next:(response)=> {
      this.rows = [];
      this.temp = [];
      for(let i = 0; i < (response?.data).length; ++i) {
        let obj = {
          user_id : (response?.data)[i]["user_id"] ,
          manager_id : (response?.data)[i]["manager_id"] ,
          id : (response?.data)[i]["user"]["id"] ,
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
onChangeDriversManager(event:any) {
  this.DriversWithManagerID(event.target.value)
}
onChangeDriversManagersCreate(event:any) {
  if(event.target.value) {
    this.Create_Form.patchValue({
      manager_id : event.target.value
    });
  }
}
openCreateForm() {
  this.Create_Form.reset();
  this.show_create = true;
  this.loader_create = false;
  this.driversManagers();
}
CreateForm(Create_Form:FormGroup) {
  if(Create_Form.valid) {
    this.loader_create = true;
    this.DriversService.create(Create_Form.value).subscribe ({
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
UpdateDriver(row:any) {
  this.show_update = true;
  this.Update_Form.patchValue({
    name       : row.name,
    phone      : row.phone,
    id         : row.id,
    email      : row.email,
    manager_id : row.manager_id
  });
  this.loader_update = false;
}
UpdateForm(Update_Form:FormGroup) {
  if(Update_Form.valid) {
    this.loader_update = true;
    this.DriversService.update(Update_Form.value).subscribe ({
     next:(response)=> {
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
GetDeleteDriverId(id:number) {
  this.deleted_driverID = id;
  this.show_delete = true;
  this.loader_delete = false;
}
deleteDriver() {
  this.loader_delete = true;
  this.DriversService.delete(this.deleted_driverID).subscribe ({
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
          this.rows[i].user_id.toString().includes(value.trim()) ||
          this.rows[i].manager_id.toString().includes(value.trim()) ||
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
}
