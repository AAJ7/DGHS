import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PromoCodeService } from 'src/app/core/services/Promo-Code/promo-code.service';
import { CountriesService } from 'src/app/core/services/Countries/countries.service';
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { CompainesService } from 'src/app/core/services/Companies/compaines.service';


@Component({
  selector: 'app-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.scss']
})
export class PromoCodeComponent implements OnInit {
  dropdownSettings:IDropdownSettings = {};
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_stop:boolean = false;
  show_activate:boolean = false;
  deleted_PromoCodeId!:number;
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  row_countries:any[] = [];
  row_companies:any[] = [];
  row_products:any[] = [];
  img!:any;
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_delete:boolean = false;
  loader_activate:boolean = false;
  active_letter!:string;
  active_button!:string;
  active_id!:any;
  toggle!:any;
  searchText:string = "";
  checkedStatus: boolean = false;
  country!:IDropdownSettings;
  countrySelectToggle:boolean = false;
  Countries:any[] = [];
  company!:IDropdownSettings;
  companySelectToggle:boolean = false;
  Companies:any[] = [];
  Create_Form:FormGroup = new FormGroup ({
      code  : new FormControl(null , [Validators.required]),
      value  : new FormControl(null , [Validators.required]),
      value_type : new FormControl(null , [Validators.required]),
      type  : new FormControl(null , [Validators.required]),
      from  : new FormControl(null , [Validators.required]),
      to    : new FormControl(null , [Validators.required]),
    }
  );
  Update_Form:FormGroup = new FormGroup({
      code  : new FormControl(null , [Validators.required]),
      value  : new FormControl(null , [Validators.required]),
      value_type  : new FormControl(null , [Validators.required]),
      type  : new FormControl(null , [Validators.required]),
      from  : new FormControl(null , [Validators.required]),
      to    : new FormControl(null , [Validators.required]),
      id       : new FormControl(null , [Validators.required]),
    }
  );
  constructor (
    private PromoCodeService: PromoCodeService,
    private toast: NgToastService,
    private datePipe: DatePipe,
    private CountriesService: CountriesService,
    private CompainesService: CompainesService) {}
  ngOnInit(): void {
    this.PromoCode();
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   defaultOpen: false,
    //   idField: "id",
    //   textField: "name",
    //   selectAllText: "Select All",
    //   unSelectAllText: "UnSelect All",
    //   allowSearchFilter: true
    // };
  }
  PromoCode() {
    this.PromoCodeService.show().subscribe ({
      next:(response)=> {
        this.rows = response?.data;
        this.temp = response?.data;
      }
    });
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.companySelectToggle = false;
    this.companySelectToggle = false;
    this.show_create = true;
    this.loader_create = false;
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      if(!(Create_Form.value.from < Create_Form.value.to)) {
        this.toast.error({detail:"ERROR",summary:"The TO date have to be after the FROM date",duration:5000});
        this.close_create();
        return;
      }
      const formData = new FormData();
      formData.append('code', Create_Form.value.code)
      formData.append('value', Create_Form.value.value)
      formData.append('value_type' , Create_Form.value.value_type)
      formData.append('type' , Create_Form.value.type)
      formData.append('from', Create_Form.value.from)
      formData.append('to' , Create_Form.value.to)
      formData.append('id' , Create_Form.value.id)
      this.loader_create = true;
      if(this.Companies.length && !this.Countries.length) {
        for(let i = 0; i < this.Companies.length; ++i) {
          formData.append('companies_ids[]' , this.Companies[i]);
        }
      }
      if(this.Countries.length && !this.Companies.length) {
        for(let i = 0; i < this.Countries.length; ++i) {
          formData.append('countries_ids[]' , this.Countries[i]);
        }
      }
      this.PromoCodeService.create(formData).subscribe ({
        next:(response)=> {
          if(!response?.status && response?.message?.code) {
            this.toast.error({detail:"ERROR",summary:"The code has already been taken.",duration:5000});
          }
          if(!response?.status && response?.message?.countries_ids) {
            this.toast.error({detail:"ERROR",summary:"You have to choose at least a country",duration:5000});
          }
          if(!response?.status && response?.message?.code && response?.message?.countries_ids) {
            this.toast.error({detail:"ERROR",summary:"The code has already been taken & You have to choose at least a country",duration:5000});
          }
          if(!response?.status && response?.message?.code && response?.message?.companies_ids) {
            this.toast.error({detail:"ERROR",summary:"The code has already been taken & You have to choose at least a company",duration:5000});
          }
          if(!response?.status && response?.message?.companies_ids) {
            this.toast.error({detail:"ERROR",summary:"You have to choose at least a company",duration:5000});
          }
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {
              window.location.reload();
            },5001);
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
  UpdatePromoCode(row:any) {
    this.show_update = true;
    this.Update_Form.patchValue({
      code       : row.code,
      value_type : row.value_type,
      value      : row.value,
      type       : row.type,
      id         : row.id,
      from       : row.from.slice(0,-3),
      to         : row.to.slice(0,-3),
    });
    if(row.active)this.checkedStatus = true;
    else this.checkedStatus = false;
    this.loader_update = false;
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      this.PromoCodeService.update(Update_Form.value).subscribe ({
        next:(response)=> {
          console.log(response);
          this.loader_update = false;
          if(!response?.status)  this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
          if(response?.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=> {
              window.location.reload();
            },5001);
          }
          this.show_update = false;
        }
      });
    }
  }
  close_update() {
    this.show_update = false;
  }
  GetPromoCodeId(id:number) {
    this.deleted_PromoCodeId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deletePromoCode() {
    this.loader_delete = true;
    this.PromoCodeService.delete(this.deleted_PromoCodeId).subscribe ({
      next:(response)=> {
        if(response?.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          window.setTimeout(()=> {
            window.location.reload();
          },5001);
        }
        this.show_delete = false;
        this.loader_delete = false;
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
            this.rows[i].active.toString().includes(value.trim()) ||
            this.rows[i].value.toString().includes(value.trim()) ||
            this.rows[i].code.toLocaleLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].value_type.toLocaleLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].type.toLocaleLowerCase().includes(value.trim().toLowerCase()) ||
            this.datePipe.transform(this.rows[i].from, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLocaleLowerCase().includes(value.trim().toLowerCase())})! >= 0 ||
            this.datePipe.transform(this.rows[i].to, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLocaleLowerCase().includes(value.trim().toLowerCase())})! >= 0 ||
            this.datePipe.transform(this.rows[i].created_at, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLocaleLowerCase().includes(value.trim().toLowerCase())}) ! >= 0 ||
            this.datePipe.transform(this.rows[i].updated_at, "EEEE, MMMM d, y, h:mm:ss a")?.split(" ")?.findIndex((item)=>{return item.toLocaleLowerCase().includes(value.trim().toLowerCase())}) ! >= 0) {
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
  // active(id:any , active:any) {
  //   this.loader_activate = false;
  //   if(active) this.toggle = 0;
  //   else this.toggle = 1;
  //   this.active_id = id;
  //   this.show_activate = true;
  //   if(!this.toggle) {
  //     this.active_letter = "Are You Sure You Want Stopped This Promo Code Offer";
  //     this.active_button = "stopped";
  //   }
  //   else {
  //     this.active_letter = "Are You Sure You Want Activate This Promo Code Offer";
  //     this.active_button = "Activate";
  //   }
  // }
  // toggleActivate() {
  //   this.loader_activate = true;
  //   this.PromoCodeService.activate(this.active_id , this.toggle).subscribe ({
  //     next:(response)=> {
  //       this.loader_activate = false;
  //       this.show_activate = false;
  //       this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
  //       this.PromoCode();
  //     }
  //   });
  // }
  from_datetime(event:any) {
    event = event.replace("T" , " ");
    this.Create_Form.patchValue ({
      from : event
    });

  }
  to_datetime(event:any) {
    event = event.replace("T" , " ");
    this.Create_Form.patchValue ({
      to : event
    });
  }
  from_datetime_update(event:any) {
    event = event.replace("T" , " ");
    this.Update_Form.patchValue ({
      from : event
    });

  }
  to_datetime_update(event:any) {
    event = event.replace("T" , " ");
    this.Update_Form.patchValue ({
      to : event
    });
  }
  update_active(event:any) {
    if(event.currentTarget.checked) {}
  }
  promoCodeType(event:any) {
    if(event?.target?.value) {
      if(event?.target?.value === "countries") {
        this.countries();
        this.companySelectToggle = false;
      } else if(event?.target?.value === "companies"){
        this.companies();
        this.countrySelectToggle = false;
      }
    }
  }
  countries() {
    this.CountriesService.showWithoutActive().subscribe ({
      next:(response)=> {
        for(let i = 0; i < response?.data.length; ++i) {
          this.row_countries.push({id : response?.data[i]?.id , name : response?.data[i]?.name_en});
        }
        this.country = {
          singleSelection: false,
          defaultOpen: false,
          idField: "id",
          textField: "name",
          selectAllText: "Select All",
          unSelectAllText: "UnSelect All",
          allowSearchFilter: true
        };
        this.countrySelectToggle = true;
      }
    });
  }
  companies() {
    this.CompainesService.get().subscribe ({
      next:(response)=> {
        for(let i = 0; i < response?.data.length; ++i) {
          this.row_companies.push({id : response?.data[i]?.user?.id , name : response?.data[i]?.user?.name});
        }
        this.company = {
          singleSelection: false,
          defaultOpen: false,
          idField: "id",
          textField: "name",
          selectAllText: "Select All",
          unSelectAllText: "UnSelect All",
          allowSearchFilter: true
        };
        this.companySelectToggle = true;
      }
    });
  }
  onItemSelectCountries(item: any) {
    // console.log('onItemSelect', item);
    this.Countries.push(item?.id);
  }
  onSelectAllCountries(items: any) {
    // console.log('onSelectAll', items);
    for(let i = 0; i < items.length; ++i) {
      this.Countries.push(items[i]?.id);
    }
  }
  onItemSelectCompanies(item: any) {
    // console.log('onItemSelect', item);
    this.Companies.push(item?.id);
  }
  onSelectAllCompanies(items: any) {
    // console.log('onSelectAll', items);
    for(let i = 0; i < items.length; ++i) {
      this.Companies.push(items[i]?.id);
    }
  }
}
