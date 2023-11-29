import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Router , ActivatedRoute } from '@angular/router';
import { CategoriesCompaniesService } from 'src/app/core/services/CategoriesCompanies/categories-companies.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-categories-companies',
  templateUrl: './categories-companies.component.html',
  styleUrls: ['./categories-companies.component.scss']
})
export class CategoriesCompaniesComponent implements OnInit {
  id!:any;
  rows:any[] = [];
  temp:any[] = [];
  temps:any[] = [];
  show_delete:boolean = false;
  show_create:boolean = false;
  deleted_company!:number;
  companies_id:any[] = [];
  loader_create:boolean = false
  loader_delete:boolean = false;
  searchText:string = "";
  categories_select:any[] = [];
  rows_companiesSelect:any[] = [];
  Create_Companies:any[] = [];
  Create_Form:FormGroup = new FormGroup ({
      company_id  : new FormControl(null , [Validators.required]),
      category_id : new FormControl(null , [Validators.required]),
    }
  );
  constructor( private datePipe: DatePipe,private ActivatedRoute: ActivatedRoute , private toast:NgToastService , private Router:Router , private CategoriesCompaniesService:CategoriesCompaniesService) { }

  ngOnInit(): void {
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id');
    this.Companies(this.id);
    this.categoriesSelect();
  }
  categoriesSelect() {
    this. categories_select = [];
    this.CategoriesCompaniesService.showCategoriesSelect().subscribe ({
      next:(response)=> {
        this.categories_select = [];
        for(let i = 0; i < response?.data.length; ++i) {
          this.categories_select.push({id : response?.data[i]?.id, name : response?.data[i]?.name_en});
        }
      }
    });
  }
  onChangeCategoriesSelect(event:any) {
    if(event?.target?.value) {
      this.Companies(event?.target?.value);
    }
  }
  Companies(id:any) {
    this.rows = [];
    this.temp =[];
    this.Create_Companies = [];
    this.CategoriesCompaniesService.show(id).subscribe ({
      next:(response)=> {
         this.rows = [];
         this.temp =[];
         this.Create_Companies = [];
        for(var key in response?.data?.companies_select) {
          if (!response?.data?.companies_select.hasOwnProperty(key)) continue;
          let obj =  response?.data?.companies_select[key];
          this.Create_Companies.push({name : key ,  value : obj})
        }
          for(let i = 0; i < response?.data?.category_companies.length; ++i) {
            let obj = {
              id : (response?.data?.category_companies)[i]["id"],
              company_id : (response?.data?.category_companies)[i]["company_id"],
              category_id : (response?.data?.category_companies)[i]["category_id"],
              user_id : (response?.data?.category_companies)[i]["company"]["user_id"],
              name_ar : (response?.data?.category_companies)[i]["company"].name_ar,
              name_en : (response?.data?.category_companies)[i]["company"].name_en,
              orders_per_hour : (response?.data?.category_companies)[i]["company"].orders_per_hour,
              logo_path : (response?.data?.category_companies)[i]["company"].logo_path,
              created_at : (response?.data?.category_companies)[i]["created_at"],
              deleted_at : (response?.data?.category_companies)[i]["company"]["deleted_at"],
              country_id : (response?.data?.category_companies)[i]["company"].country_id,
            };
            this.rows.push(obj);
            this.temp.push(obj);
          }
      }
    });
  }
  onChangeCreateCompanies(event:any) {
    if(event?.target?.value) {
      this.Create_Form.patchValue ({
        company_id : event?.target?.value
      });
    }
  }
  openCreateForm() {
    this.Create_Form.reset();
    this.Create_Form.patchValue ({
      category_id : this.id
    });
    this.show_create = true;
    this.loader_create = false;
  }
  CreateForm(Create_Form:FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      this.CategoriesCompaniesService.create(this.Create_Form.value).subscribe ({
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
  GetCompanyId(id:any) {
    this.deleted_company = id;
    this.show_delete = true;
    this.loader_delete = false;
  }
  deleteCompany() {
    this.loader_delete = true;
    this.CategoriesCompaniesService.delete(this.deleted_company).subscribe ({
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
  CategoryCompaniesProducts(company_id:any , category_id:any) {
    this.Router.navigate(["categories/company/" + company_id + "/categories/" + category_id]);
  }
  filter(value:any) {
    if(!value) {
      this.Companies(this.id);
    } else if(value) {
      this.rows = this.temp;
      for(let i = 0; i < this.rows.length; ++i) {
        if (this.rows[i].id.toString().includes(value.trim()) ||
            this.rows[i].user_id.toString().includes(value.trim()) ||
            this.rows[i].company_id.toString().includes(value.trim()) ||
            this.rows[i].category_id.toString().includes(value.trim()) ||
            this.rows[i].country_id.toString().includes(value.trim()) ||
            this.rows[i].orders_per_hour.toString().includes(value.trim()) ||
            this.rows[i].active.toString().includes(value.trim()) ||
            this.rows[i].name_ar.toLowerCase().includes(value.trim().toLowerCase()) ||
            this.rows[i].name_en.toLowerCase().includes(value.trim().toLowerCase()) ||
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
    window.location.reload();
  }
}
