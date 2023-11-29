import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators , FormBuilder , FormArray } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { CategoriesCompaniesProductsService } from 'src/app/core/services/categoriesCompaniesProducts/categories-companies-products.service';
import { CompainesService } from 'src/app/core/services/Companies/compaines.service';

@Component({
  selector: 'app-p',
  templateUrl: './p.component.html',
  styleUrls: ['./p.component.scss']
})
export class PComponent implements OnInit {
  rows          :any[] = [];
  temp          :any[] = [];
  temps         :any[] = [];
  rows_Companies:any[] = [];
  rows_Categories:any[] = [];
  companySelected!:any;
  category_id  !: any;
  company_id   !: any;
  searchText    : string = "";
  Base64       !: any;
  deletedProduct: number = 0;

  show_create: boolean = false;
  show_update: boolean = false;
  show_delete: boolean = false;

  loader_create: boolean = false;
  loader_update: boolean = false;
  loader_delete: boolean = false;



  Create_Form:FormGroup = new FormGroup({
    name_ar     : new FormControl(null , [Validators.required]),
    name_en     : new FormControl(null , [Validators.required]),
    img_path    : new FormControl(null , [Validators.required]),
    company_id  : new FormControl(null , [Validators.required]),
    category_id : new FormControl(null , [Validators.required]),
    options : new FormArray([
      // new FormGroup({
      //   name_ar       : new FormControl(null , [Validators.required]),
      //   name_en       : new FormControl(null , [Validators.required]),
      //   price_unit_ar : new FormControl(null , [Validators.required]),
      //   price_unit_en : new FormControl(null , [Validators.required]),
      //   price         : new FormControl(null , [Validators.required]),
      // })
    ])
  }
);

Update_Form:FormGroup = new FormGroup({
  id          : new FormControl(null),
  name_ar     : new FormControl(null),
  name_en     : new FormControl(null),
  img_path    : new FormControl(null),
  company_id  : new FormControl(null),
  category_id : new FormControl(null),
  options : new FormArray([])
}
);




constructor(
  private datePipe: DatePipe,
  private ActivatedRoute: ActivatedRoute,
  private toast: NgToastService,
  private Router: Router,
  private CompainesService: CompainesService,
  private CategoriesCompaniesProductsService :CategoriesCompaniesProductsService,
  private formBuilder: FormBuilder) { }

    ngOnInit(): void {
    this.category_id = this.ActivatedRoute.snapshot.paramMap.get('id');
    let index = (this.Router.url).split("/").findIndex((obj)=>{return obj == "company"});
    this.company_id = (this.Router.url).split("/")[++index];
    this.products(this.company_id , this.category_id);
    this.companies();
  }

  companies() {
    this.rows_Companies = [];
    this.CompainesService.get().subscribe ({
      next:(response)=> {
        this.rows_Companies = [];
        for(let i = 0; i < response?.data.length; ++i) {
          this.rows_Companies.push({id : response?.data[i]?.user?.id, name : response?.data[i]?.user?.name});
        }
      }
    });
  }
  categoriesOfCompany(id:any) {
    this.rows_Categories = [];
    this.CategoriesCompaniesProductsService.categories(id).subscribe({
      next:(response)=>{
        this.rows_Categories = [];
        for(let i = 0; i < response?.data.length; ++i) {
          this.rows_Categories.push({id : response?.data[i]?.id, name : response?.data[i]?.name_en});
        }
      }
    });
  }
  onChangeCompanies(event:any) {
    if(event?.target?.value) {
      this.companySelected = event?.target?.value;
      this.categoriesOfCompany(event?.target?.value);
    }
  }
  onChangeCategories(event:any) {
    if(event?.target?.value) {
      this.products(this.companySelected , event?.target?.value);
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
  openCreateForm() {
    this.Create_Form.reset();
    this.Base64 = "";
    this.show_create = true;
    this.loader_create = false;
    this.Create_Form.patchValue ({
      company_id  : this.company_id,
      category_id : this.category_id
    });
  }
  getOptions() :FormArray {
    return this.Create_Form?.get("options") as FormArray;
  }
  getOptionsUpdate() :FormArray {
    return this.Update_Form?.get("options") as FormArray;
  }
  addOptionOnCreate() : void {
    const control = <FormArray>this.Create_Form.controls["options"];
    control.push( new FormGroup({
      name_ar       : new FormControl(null , [Validators.required]),
      name_en       : new FormControl(null , [Validators.required]),
      price_unit_ar : new FormControl(null , [Validators.required]),
      price_unit_en : new FormControl(null , [Validators.required]),
      price         : new FormControl(null , [Validators.required]),
    }));
  }
  removeOptionOnCreate(index:number) {
    const control = <FormArray>this.Create_Form.controls["options"];
    control.removeAt(index);
  }
  addOptionOnUpdate() : void {
    const control = <FormArray>this.Update_Form.controls["options"];
    control.push( new FormGroup({
      name_ar       : new FormControl(null , [Validators.required]),
      name_en       : new FormControl(null , [Validators.required]),
      price_unit_ar : new FormControl(null , [Validators.required]),
      price_unit_en : new FormControl(null , [Validators.required]),
      price         : new FormControl(null , [Validators.required]),
    }));
  }
  removeOptionOnUpdate(index:number) {
    const control = <FormArray>this.Update_Form.controls["options"];
    control.removeAt(index);
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
      for(let i = 0; i < Create_Form.value.options.length; ++i) {
        formData.append(`options[${i}][name_ar]`, Create_Form.value.options[i].name_ar)
        formData.append(`options[${i}][name_en]`, Create_Form.value.options[i].name_en)
        formData.append(`options[${i}][price_unit_ar]`, Create_Form.value.options[i].price_unit_ar)
        formData.append(`options[${i}][price_unit_en]`, Create_Form.value.options[i].price_unit_en)
        formData.append(`options[${i}][price]`, Create_Form.value.options[i].price)
      }
      this.CategoriesCompaniesProductsService.create(formData).subscribe ({
        next:(response)=> {
          this.loader_create = false;
          this.show_create = false;
          if(response.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=>{window.location.reload();},5001);
          }
        }
      });
    }
  }
  close_create() {
    this.show_create = false;
  }
  updateProduct(row:any) {
    (this.Update_Form.get("options") as FormArray).controls = [];
    this.Base64 = "https://dev.generalhouseservices.com/" + row.img_path;
    this.show_update = true;
    this.Update_Form.patchValue({
      id          : row.id,
      name_ar     : row.name_ar,
      name_en     : row.name_en,
      company_id  : row.company_id,
      category_id : row.category_id
    });
    for(let i = 0; i < row.options.length; ++i) {
      let formGroup = this.formBuilder.group({
        name_ar       : new FormControl(row.options[i]?.name_ar),
        name_en       : new FormControl(row.options[i]?.name_en),
        price_unit_ar : new FormControl(row.options[i]?.price_unit_ar),
        price_unit_en : new FormControl(row.options[i]?.price_unit_en),
        price         : new FormControl(row.options[i]?.price),
      });
      (<FormArray>this.Update_Form.controls["options"]).push(formGroup);
    }
  }
  UpdateForm(Update_Form:FormGroup) {
    if(Update_Form.valid) {
      this.loader_update = true;
      const formData = new FormData();
      formData.append('category_id', Update_Form.value.category_id)
      formData.append('company_id' , Update_Form.value.company_id)
      formData.append('id' , Update_Form.value.id)
      formData.append('name_ar', Update_Form.value.name_ar)
      formData.append('name_en' , Update_Form.value.name_en)
      if(Update_Form.value.img_path)formData.append('img_path' , Update_Form.value.img_path);
      for(let i = 0; i < Update_Form.value.options.length; ++i) {
        formData.append(`options[${i}][name_ar]`, Update_Form.value.options[i].name_ar)
        formData.append(`options[${i}][name_en]`, Update_Form.value.options[i].name_en)
        formData.append(`options[${i}][price_unit_ar]`, Update_Form.value.options[i].price_unit_ar)
        formData.append(`options[${i}][price_unit_en]`, Update_Form.value.options[i].price_unit_en)
        formData.append(`options[${i}][price]`, Update_Form.value.options[i].price)
      }
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      this.CategoriesCompaniesProductsService.update(formData).subscribe ({
        next:(response)=> {
          this.loader_update = false;
          this.show_update = false;
          if(response.status) {
            this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
            window.setTimeout(()=>{window.location.reload();},5001);
          }
        }
      });
    }
  }
  close_update() {
    this.show_update = false;
  }
  GetProductId(id:any) {
    this.deletedProduct = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteProduct() {
    this.loader_delete = true;
    this.CategoriesCompaniesProductsService.delete(this.deletedProduct).subscribe ({
      next:(response)=> {
        this.loader_delete = false;
        this.show_delete = false;
        if(response.status) {
          this.toast.success({detail:"SUCCESS",summary:response?.message,duration:5000});
          window.setTimeout(()=>{window.location.reload();},5001);
        }
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
      this.Update_Form.patchValue ({
        img_path : file
      });
    }
  }

  filter(value:any) {
    if(!value) {
      this.products(this.company_id , this.category_id);
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
    window.location.reload();
  }
}
