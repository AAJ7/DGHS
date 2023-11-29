import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators , FormBuilder , FormArray } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { CategoriesCompaniesService } from 'src/app/core/services/CategoriesCompanies/categories-companies.service';
import { DatePipe } from '@angular/common';
import { CategoriesCompaniesProductsService } from 'src/app/core/services/categoriesCompaniesProducts/categories-companies-products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  show_create:boolean = false;
  show_update:boolean = false;
  show_delete:boolean = false;
  show_activate:boolean = false;
  show_stop:boolean = false;
  Activated_id!:number;
  deleted_ProductId!:number;
  img_path!:string;
  img!:any;
  Base64!:any;
  active_letter!:string;
  active_button!:string;
  active_id!:any;
  toggle!:any;
  loader_create:boolean = false;
  loader_update:boolean = false;
  loader_activate:boolean = false;
  loader_delete:boolean = false;
  option:any = [];
  options:any[] = [];
  OPTIONS:any[] = [];
  option_name_ar:string = "";
  key:any = "";
  value:any = "";
  UpdateForm!: FormGroup;
  Categories_ID:any[] = [];
  Companies_ID:any[] = [];
  CategoryId!:any;
  CompanyId!:any;
  searchText:string = "";
  Create_Form:FormGroup = new FormGroup
  (
    {
      name_ar     : new FormControl(null , [Validators.required]),
      name_en     : new FormControl(null , [Validators.required]),
      img_path    : new FormControl(null , [Validators.required]),
      company_id  : new FormControl(null , [Validators.required]),
      category_id : new FormControl(null , [Validators.required]),
    }
  );
  option_Form:FormGroup = new FormGroup
  (
    {
      option_name_ar : new FormControl(null , [Validators.required]),
      option_name_en : new FormControl(null , [Validators.required]),
      option_price_unit_ar : new FormControl(null , [Validators.required]),
      option_price_unit_en : new FormControl(null , [Validators.required]),
      option_price : new FormControl(null , [Validators.required]),
    }
  );
  Update:FormGroup = new FormGroup({});
  new_Update:FormGroup = new FormGroup({});

  constructor(private toast:NgToastService, private fb: FormBuilder,
    private CategoriesService:CategoriesService,
    private CategoriesCompaniesService:CategoriesCompaniesService,
    private CategoriesCompaniesProductsService:CategoriesCompaniesProductsService, private datePipe: DatePipe) { }
  ngOnInit(): void {
  this.CategoriesId();
  }

  CategoriesId() {
    this.Categories_ID = [];
    this.Companies_ID = [];
    this.CategoriesService.show().subscribe ({
      next:(response)=> {
        for(var key in response?.data) {
          if (!response?.data?.hasOwnProperty(key)) continue;
          let obj =  response?.data[key];
          this.Categories_ID.push(obj?.id);
          this.CategoriesCompaniesService.show(obj?.id).subscribe ({
            next:(response)=> {
              for(var key in response?.data?.companies_select) {
                if (!response?.data?.companies_select.hasOwnProperty(key)) continue;
                let obj =  response?.data?.companies_select[key];
                this.Companies_ID.push(obj);
              }
              this.Categories_ID =  this.Categories_ID.filter((value:any, index:any, array:any)=> {
                return array.indexOf(value) === index;
              });
              this.Companies_ID =  this.Companies_ID.filter((value:any, index:any, array:any)=> {
                return array.indexOf(value) === index;
              });
            }
          });
        }
      }
    });
  }


  onChangeCategoryId(event:any) {
    this.CategoryId = event.target.value;
    if(this.CompanyId && this.CategoryId) {
      this.products(this.CompanyId , this.CategoryId);
    }
  }
  onChangeCompanyId(event:any) {
    this.CompanyId = event.target.value;
    if(this.CompanyId && this.CategoryId) {
      this.products(this.CompanyId , this.CategoryId);
    }
  }
  products(company_id:any , category_id:any) {
    this.CategoriesCompaniesProductsService.products(company_id , category_id).subscribe ({
      next:(response)=> {
        this.rows = response?.data;
        this.temp = response?.data;
      }
    });
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
        img_path : file
      });
    }
    else if(key === "update") {
      this.new_Update.patchValue ({
        img_path : file
      });
    }
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.Base64 = "";
    this.show_create = true;
    this.Create_Form.patchValue ({
      company_id  : this.CompanyId,
      category_id : this.CategoryId
    });
    this.loader_create = false;
  }
  addOptions(option_Form:FormGroup) {
    this.option.push({name_ar       : option_Form.value.option_name_ar});
    this.option.push({name_en       : option_Form.value.option_name_en});
    this.option.push({price_unit_ar : option_Form.value.option_price_unit_ar});
    this.option.push({price_unit_en : option_Form.value.option_price_unit_en});
    this.option.push({price         : option_Form.value.option_price});
    this.options.push(this.option);
    this.option = [];
    option_Form.reset();
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      const formData = new FormData();
      formData.append('category_id', Create_Form.value.category_id)
      formData.append('company_id' , Create_Form.value.company_id)
      formData.append('name_ar', Create_Form.value.name_ar)
      formData.append('name_en' , Create_Form.value.name_en)
      formData.append('img_path' , Create_Form.value.img_path)
      for(let i = 0; i < this.options.length; ++i) {
        for(let j = 0; j < this.options[i].length; ++j) {
          this.key = Object.keys(this.options[i][j])[0];
          this.value = Object.values(this.options[i][j])[0];
          formData.append(`options[${i}][${this.key}]`, this.value)
        }
      }
      this.CategoriesCompaniesProductsService.create(formData).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          this.show_create = false;
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          this.products(this.CompanyId , this.CategoryId);
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
  }
  initTimes(obj:any) {
    return this.fb.group({
      option_name_ar : new FormControl(obj?.name_ar),
      option_name_en : new FormControl(obj?.name_en),
      option_price_unit_ar : new FormControl(obj?.price_unit_ar),
      option_price_unit_en : new FormControl(obj?.price_unit_en),
      option_price : new FormControl(obj?.price)
    });
  }
  updateProduct(row:any) {
    this.show_update = true;
    this.OPTIONS = [];
    while(Object.keys(this.new_Update.controls).length){
      const toRemove = Object.keys(this.new_Update.controls)[0];
      this.new_Update.removeControl(toRemove)
    }
    this.UpdateForm = this.fb.group({
      options: this.fb.array([])
    });
    this.Base64 = "https://dev.generalhouseservices.com/" + row.img_path;

    this.new_Update.addControl('id', new FormControl(row.id, Validators.required));
    this.new_Update.addControl('name_ar', new FormControl(row.name_ar, Validators.required));
    this.new_Update.addControl('name_en', new FormControl(row.name_en, Validators.required));
    this.new_Update.addControl('company_id', new FormControl(row.company_id, Validators.required));
    this.new_Update.addControl('category_id', new FormControl(row.category_id, Validators.required));
    this.new_Update.addControl('img_path', new FormControl(null));

     for (let index = 0; index < row.options.length; index++) {
      this.new_Update.addControl(`name_ar${index}`, new FormControl(row.options[index].name_ar, Validators.required));
      this.new_Update.addControl(`name_en${index}`, new FormControl(row.options[index].name_en, Validators.required));
      this.new_Update.addControl(`price_unit_ar${index}`, new FormControl(row.options[index].price_unit_ar, Validators.required));
      this.new_Update.addControl(`price_unit_en${index}`, new FormControl(row.options[index].price_unit_en, Validators.required));
      this.new_Update.addControl(`price${index}`, new FormControl(row.options[index].price, Validators.required));
      const control = <FormArray>this.UpdateForm.controls['options'];
      control.push(this.initTimes(row.options[index]));
    }
    this.OPTIONS = (this.UpdateForm.value)?.options;
  }
  Update_Form(Form:FormGroup) {
    if(Form.valid) {
      this.loader_update = true;
      const formData = new FormData();
      for (var key in Form.getRawValue()) {
        if (!Form.getRawValue().hasOwnProperty(key)) continue;
        if(/\d/.test(key)) {
          formData.append(`options[${key.slice(-1)}][${key.slice(0, -1)}]`, Form.getRawValue()[key]);
        }
        else {
          formData.append(`${key}`, Form.getRawValue()[key]);
        }
      }
      this.CategoriesCompaniesProductsService.update(formData).subscribe ({
        next:(response)=> {
          this.loader_update = false;
          this.show_update = false;
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          this.products(this.CompanyId , this.CategoryId);
        }
      });
    }
  }
  close_update() {
    this.show_update = false;
  }
  GetProductId(id:any) {
    this.deleted_ProductId = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteProduct() {
    this.CategoriesCompaniesProductsService.delete(this.deleted_ProductId).subscribe ({
      next:(response)=> {
        this.loader_delete = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.products(this.CompanyId , this.CategoryId);
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
      this.active_letter = "Are You Sure You Want Stopped This Product";
      this.active_button = "stopped";
    }
    else {
      this.active_letter = "Are You Sure You Want Activate This Product";
      this.active_button = "Activate";
    }
  }
  toggleActivate() {
    this.loader_activate = true;
    this.CategoriesCompaniesProductsService.activate(this.active_id , this.toggle).subscribe ({
      next:(response)=> {
        this.loader_activate = false;
        this.show_activate = false;
        this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
        this.products(this.CompanyId , this.CategoryId);
      }
    });
  }
  filter(value:any) {
    if(!value) {
      this.products(this.CompanyId , this.CategoryId);
    } else if(value) {
      this.rows = this.temp;
      for(let i = 0; i < this.rows.length; ++i) {
        if (this.rows[i].id.toString().includes(value.trim()) ||
            this.rows[i].company_id.toString().includes(value.trim()) ||
            this.rows[i].category_id.toString().includes(value.trim()) ||
            this.rows[i].active.toString().includes(value.trim()) ||
            this.rows[i].name_ar.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].name_en.toLowerCase().includes(value.trim().toLowerCase()) ||
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
    this.products(this.CompanyId , this.CategoryId);
  }
}
