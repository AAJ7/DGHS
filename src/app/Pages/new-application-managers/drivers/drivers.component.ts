import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { DriversService } from 'src/app/core/services/Drivers/drivers.service';
import { DriversManagersService } from 'src/app/core/services/Drivers-Managers/drivers-managers.service';
import { CompainesService } from 'src/app/core/services/Companies/compaines.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  deleted_AdminId!:any;
  show_create:boolean = false;
  show_delete:boolean = false;
  show_update:boolean = false;
  deleted_adminId!:number;
  active_letter!:string;
  active_button!:string;
  active_id!:any;
  toggle!:any;
  show_activate:boolean = false;
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_activate:boolean = false;
  loader_delete:boolean = false;
  Categories_ID:any[] = [];
  Companies_ID:any[] = [];
  Companies:any[] = [];
  DriversManagers_ID:any[] = [];
  DriversManagers:any[] = [];
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
  constructor(private DriversService:DriversService,private toast:NgToastService, private DriversManagersService:DriversManagersService,
    private CompainesService:CompainesService,private datePipe: DatePipe) {}

  ngOnInit(): void {
  this.Drivers();
}
  Drivers() {
    this.DriversService.drivers().subscribe ({
      next:(response)=> {
        this.rows = [];
        for(let i = 0; i < (response?.data).length; ++i) {
          let obj = {
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
  // CategoriesId() {
  //   this.Categories_ID = [];
  //   this.Companies_ID = [];
  //   this.CategoriesService.show().subscribe ({
  //     next:(response)=> {
  //       for(var key in response?.data) {
  //         if (!response?.data?.hasOwnProperty(key)) continue;
  //         let obj =  response?.data[key];
  //         this.Categories_ID.push(obj?.id);
  //         this.CategoriesCompaniesService.show(obj?.id).subscribe ({
  //           next:(response)=> {
  //             for(var key in response?.data?.companies_select) {
  //               if (!response?.data?.companies_select.hasOwnProperty(key)) continue;
  //               let obj =  response?.data?.companies_select[key];
  //               this.Companies_ID.push(obj);
  //             }
  //             this.Categories_ID =  this.Categories_ID.filter((value:any, index:any, array:any)=> {
  //               return array.indexOf(value) === index;
  //             });
  //             this.Companies_ID =  this.Companies_ID.filter((value:any, index:any, array:any)=> {
  //               return array.indexOf(value) === index;
  //             });
  //           }
  //         });
  //       }
  //     }
  //   });
  // }
  CompaniesId() {
    this.Companies_ID = [];
    this.CompainesService.get().subscribe ({
      next:(response)=> {
        for(let i = 0; i < response?.data.length; ++i) {
          this.Companies.push(response?.data[i]?.user?.name);
          this.Companies_ID.push({name : response?.data[i].user.name , id : response?.data[i].user.id});
        }
      }
    });
  }
  DriversManagersId() {
    this.DriversManagers_ID = [];
    this.DriversManagersService.get().subscribe ({
      next:(response)=> {
        for(var key in response?.data) {
          if (!response?.data.hasOwnProperty(key)) continue;
          let obj =  response?.data[key];
          this.DriversManagers_ID.push({name : obj?.user?.name , id : obj?.user?.id});
          this.DriversManagers.push(obj?.user?.name);
        }
        // this.DriversManagers_ID = this.DriversManagers_ID.filter((value:any, index:any, array:any)=> {
        //   return array.indexOf(value) === index;
        // });
      }
    });
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.show_create = true;
    this.loader_create = false;
    // this.CategoriesId();
    this.CompaniesId();
    this.DriversManagersId();
  }
  ChangeCompaniesId(event:any) {
    if(event.target.value) {
      for(let i = 0; i < this.Companies_ID.length; ++i)  {
        if(this.Companies_ID[i].name === event.target.value) {
          this.Create_Form.patchValue ({
            manager_id : this.Companies_ID[i].id
          });
        }
      }
    }
  }
  ChangeDriversManagersId(event:any) {
    if(event.target.value) {
      for(let i = 0; i < this.DriversManagersId.length; ++i)  {
        if(this.DriversManagers_ID[i].name === event.target.value) {
          this.Create_Form.patchValue ({
            manager_id : this.DriversManagers_ID[i].id
          });
        }
      }
    }
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
    });
    this.loader_update = false;
    this.CompaniesId();
    this.DriversManagersId();
  }
  UpdateChangeCompaniesId(event:any) {
    if(event.target.value) {
      this.Update_Form.patchValue ({
        manager_id : event.target.value
      });
    }
  }
  UpdateChangeDriversManagersId(event:any) {
    if(event.target.value) {
      this.Update_Form.patchValue ({
        manager_id : event.target.value
      });
    }
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      const formData = new FormData;
      formData.append("name" , Update_Form.value.name)
      formData.append("email" , Update_Form.value.email)
      formData.append("password" , Update_Form.value.password)
      formData.append("phone" , Update_Form.value.phone)
      formData.append("id" , Update_Form.value.id)
      formData.append("manager_id" , Update_Form.value.manager_id)
      this.loader_update = true;
      this.DriversService.update(formData).subscribe ({
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
    this.deleted_AdminId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteDriver() {
    this.loader_delete = true;
    this.DriversService.delete(this.deleted_AdminId).subscribe ({
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
  active(id:any , active:any) {
    this.loader_activate = false;
    if(active) this.toggle = 0;
    else this.toggle = 1;
    this.active_id = id;
    this.show_activate = true;
    if(!this.toggle) {
      this.active_letter = "Are You Sure You Want Stopped This Driver";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This Driver";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.DriversService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.Drivers();
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
