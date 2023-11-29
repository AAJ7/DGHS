import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClientsLocationsService } from 'src/app/core/services/user-manager/clients-locations/clients-locations.service';


@Component({
  selector: 'app-clients-locations',
  templateUrl: './clients-locations.component.html',
  styleUrls: ['./clients-locations.component.scss']
})
export class ClientsLocationsComponent implements OnInit {

  id!:any;
  rows:any[] = [];
  temps:any[] = [];
  temp:any[] = [];
  rows_Countries:any[] = [];

  searchText:string = "";

  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_delete:boolean = false;
  checkedStatus: boolean = false;
  show_create:boolean = false;
  show_delete:boolean = false;
  show_update:boolean = false;
  deleted_ClientLocationId!:any;
  Create_Form:FormGroup = new FormGroup ({
    client_id               : new FormControl(null , [Validators.required]),
    lat                     : new FormControl(null , [Validators.required]),
    long                    : new FormControl(null , [Validators.required]),
    phone_number            : new FormControl(null , [Validators.required]),
    location_type           : new FormControl(null , [Validators.required]),
    street                  : new FormControl(null , [Validators.required]),
    building                : new FormControl(null , [Validators.required]),
    floor                   : new FormControl(null , [Validators.required]),
    apartment               : new FormControl(null , [Validators.required]),
    detailed_address        : new FormControl(null , [Validators.required]),
    additional_instructions : new FormControl(null),
    telephone               : new FormControl(null)
  }
);
Update_Form:FormGroup = new FormGroup ({
  id                      : new FormControl(null , [Validators.required]),
  lat                     : new FormControl(null , [Validators.required]),
  long                    : new FormControl(null , [Validators.required]),
  phone_number            : new FormControl(null , [Validators.required]),
  location_type           : new FormControl(null , [Validators.required]),
  street                  : new FormControl(null , [Validators.required]),
  building                : new FormControl(null , [Validators.required]),
  floor                   : new FormControl(null , [Validators.required]),
  apartment               : new FormControl(null , [Validators.required]),
  detailed_address        : new FormControl(null , [Validators.required]),
  additional_instructions : new FormControl(null),
  telephone               : new FormControl(null)
  }
);

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private ClientsLocationsService: ClientsLocationsService,
    private toast: NgToastService,
    private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.clientsLocations(this.id);
  }
  clientsLocations(id:any) {
    this.rows = [];
    this.temp = [];
    this.ClientsLocationsService.show(id).subscribe({
      next:(response)=> {
        this.rows = [];
        this.temp = [];
        this.rows = response?.data;
        this.temp = response?.data;
      }
    });
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.Create_Form.patchValue({
      client_id : this.id
    })
    this.show_create = true;
    this.loader_create = false;
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.ClientsLocationsService.create(Create_Form.value).subscribe ({
        next:(response)=> {
          if(!response?.status) this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
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
  UpdateClientLocation(row:any) {
    this.Update_Form.patchValue({
      lat      : row.lat,
      id         : row.id,
      long      : row.long,
      phone_number        : row.phone_number,
      location_type     : row.location_type,
      street : row.street,
      building    : row.building,
      floor                   : row.floor,
      apartment               :  row.apartment,
      detailed_address        :  row.detailed_address,
      additional_instructions :  row.additional_instructions,
      telephone               :  row.telephone
    });
    this.loader_update = false;
    this.show_update = true;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      console.log(Update_Form.value);
      this.loader_update = true;
      this.ClientsLocationsService.update(Update_Form.value).subscribe ({
       next:(response)=> {
        console.log(response);
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
  GetDeleteClientLocationId(id:number) {
    this.deleted_ClientLocationId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteClientLocation() {
    this.loader_delete = true;
    this.ClientsLocationsService.delete(this.deleted_ClientLocationId).subscribe ({
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
            this.rows[i].client_id.toString().includes(value.trim()) ||
            this.rows[i].lat.toString().includes(value.trim()) ||
            this.rows[i].long.toString().includes(value.trim()) ||
            this.rows[i].phone_number.toString().includes(value.trim()) ||
            this.rows[i].telephone.toString().includes(value.trim()) ||
            this.rows[i].floor.toString().includes(value.trim()) ||
            this.rows[i].location_type.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].street.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].building.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].apartment.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].additional_instructions.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].detailed_address.toLowerCase().includes(value.trim().toLowerCase()) ||
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
