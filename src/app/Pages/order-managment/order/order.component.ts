import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CompainesService } from 'src/app/core/services/Companies/compaines.service';
import { CompaniesProductsService } from 'src/app/core/services/CompaniesProducts/companies-products.service';
import { DeliveryTypesService } from 'src/app/core/services/Delivery-Types/delivery-types.service';
import { DriversManagersService } from 'src/app/core/services/Drivers-Managers/drivers-managers.service';
import { PromoCodeService } from 'src/app/core/services/Promo-Code/promo-code.service';
import { DriversAppOrdersService } from 'src/app/core/services/driversAppOrders/drivers-app-orders.service';
import { OrderService } from 'src/app/core/services/order-managment/order/order.service';
import { ClientsLocationsService } from 'src/app/core/services/user-manager/clients-locations/clients-locations.service';
import { ClientsService } from 'src/app/core/services/user-manager/clients/clients.service';







@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  searchText: string = "";
  company_id: any;
  companies:any[] = [];
  rows:any[] = [];
  clients:any[] = [];
  deliveryTypes:any[] = [];
  promoCodes: any[] = [];
  show_create: boolean = false;
  loader_create: boolean = false;
  ProductType: boolean = false;
  PD!: any;
  DD!: any;
  type!: any;
  pickupPeriods: any[] = [];
  pickupDrivers: any[] = [];
  deliveryPeriods: any[] = [];
  deliveryDrivers: any[] = [];
  clientLocations: any[] = [];
  productOptions: any[] = [];
  productitems: any[] = [];
  driversManagers: any[] = [];
  invoiceID!:any;
  show_invoice: boolean = false;

  Create_Form:FormGroup = new FormGroup ({
    role                                                 : new FormControl("client" , [Validators.required]),
    type                                                 : new FormControl(null , [Validators.required]),
    content                                              : new FormControl(null , [Validators.required]),
    special_instructions                                 : new FormControl(null , [Validators.required]),
    comment                                              : new FormControl(null , [Validators.required]),
    pickup_date                                          : new FormControl(null , [Validators.required]),
    delivery_date                                        : new FormControl(null , [Validators.required]),
    delivery_type                                        : new FormControl(null , [Validators.required]),
    delivery_type_id                                     : new FormControl(null , [Validators.required]),
    client_id                                            : new FormControl(null , [Validators.required]),
    client_location_id                                   : new FormControl(null , [Validators.required]),
    company_id                                           : new FormControl(null , [Validators.required]),


    pickup_driver_assigned_to_transportation_period_id   : new FormControl(null),
    delivery_driver_assigned_to_transportation_period_id : new FormControl(null),
    discount_value                                       : new FormControl(null),
    discount_value_type                                  : new FormControl(null),
    drivers_manager_id                                   : new FormControl(null)
  }
);
Update_Form:FormGroup = new FormGroup ({
  id                                                   : new FormControl(null , [Validators.required]),
  role                                                 : new FormControl(null , [Validators.required]),
  type                                                 : new FormControl(null , [Validators.required]),
  content                                              : new FormControl(null , [Validators.required]),
  special_instructions                                 : new FormControl(null , [Validators.required]),
  comment                                              : new FormControl(null , [Validators.required]),
  status                                               : new FormControl(null , [Validators.required]),
  delivery_type                                        : new FormControl(null , [Validators.required]),
  client_id                                            : new FormControl(null , [Validators.required]),
  client_location_id                                   : new FormControl(null , [Validators.required]),
  delivery_type_id                                     : new FormControl(null , [Validators.required]),
  company_id                                           : new FormControl(null , [Validators.required]),
  discount_value                                       : new FormControl(null , [Validators.required]),
  discount_value_type                                  : new FormControl(null , [Validators.required]),
  drivers_manager_id                                   : new FormControl(null , [Validators.required]),

  pickup_date                                          : new FormControl(null),
  delivery_date                                        : new FormControl(null),
  pickup_driver_assigned_to_transportation_period_id   : new FormControl(null),
  delivery_driver_assigned_to_transportation_period_id : new FormControl(null),
}
);
  constructor(private Order: OrderService,
    private Compaines: CompainesService,
    private Clients: ClientsService,
    private DeliveryTypes: DeliveryTypesService,
    private PromoCode: PromoCodeService,
    private DriversAppOrders: DriversAppOrdersService,
    private ClientsLocations: ClientsLocationsService,
    private CompaniesProducts: CompaniesProductsService,
    private toast: NgToastService,
    private DriversManagers: DriversManagersService) {
    }

  ngOnInit(): void {
    this.order();
    this.company();
    this.client();
    this.deliveryType();
    this.promoCode();
    this.DriversManager();
  }

  order() {
    this.Order.get().subscribe({
      next:(response)=> {
        this.rows = response?.data;
      }
    });
  }

  DriversManager() {
    this.DriversManagers.get().subscribe({
      next:(response)=> {
        this.driversManagers = response?.data;
      }
    });
  }

  company() {
    this.Compaines.get().subscribe({
      next:(response)=> {
        this.companies = response?.data;
      }
    });
  }

  client() {
    this.Clients.show().subscribe({
      next:(response)=>{
        this.clients = response?.data;
      }
    });
  }

  deliveryType() {
    this.DeliveryTypes.show().subscribe({
      next:(response)=>{
        this.deliveryTypes = response?.data;
      }
    });
  }

  promoCode() {
    this.PromoCode.show().subscribe({
      next:(response)=> {
        this.promoCodes = response?.data;
      }
    });
  }

  openCreateForm() {
    this.Create_Form.patchValue({
      type                                                 : "",
      content                                              : "",
      comment                                              : "",
      pickup_date                                          : "",
      delivery_date                                        : "",
      delivery_type                                        : "",
      client_id                                            : "",
      client_location_id                                   : "",
      delivery_type_id                                     : "",
      special_instructions                                 : "",
      company_id                                           : "",
      
    
      pickup_driver_assigned_to_transportation_period_id   : "",
      delivery_driver_assigned_to_transportation_period_id : "",
      discount_value                                       : "",
      discount_value_type                                  : "",
      drivers_manager_id                                   : ""
    });
    this.loader_create = false;
    this.ProductType = false;
    this.show_create = true;
  }
  CreateForm(Create_Form: FormGroup) {
    if(Create_Form.valid) {
      this.loader_create = true;
      if(Create_Form.value.type === "easy") {
        const formData = new FormData();
        formData.append('role', Create_Form.value.role);
        formData.append('type', Create_Form.value.type);
        formData.append('content', Create_Form.value.content);
        formData.append('comment', Create_Form.value.comment);
        formData.append('delivery_type', Create_Form.value.delivery_type);
        formData.append('delivery_type_id', Create_Form.value.delivery_type_id);
        formData.append('company_id', Create_Form.value.company_id);
        formData.append('special_instructions', Create_Form.value.special_instructions);
        formData.append('client_id', Create_Form.value.client_id);
        formData.append('client_location_id', Create_Form.value.client_location_id);
        if(Create_Form.value.pickup_driver_assigned_to_transportation_period_id) {
          formData.append('pickup_driver_assigned_to_transportation_period_id', Create_Form.value.pickup_driver_assigned_to_transportation_period_id);
        }
        if(Create_Form.value.delivery_driver_assigned_to_transportation_period_id) {
          formData.append('delivery_driver_assigned_to_transportation_period_id', Create_Form.value.delivery_driver_assigned_to_transportation_period_id);
        }
        if(Create_Form.value.discount_value) {
          formData.append('discount_value', Create_Form.value.discount_value);
        }
        if(Create_Form.value.discount_value_type) {
          formData.append('discount_value_type', Create_Form.value.discount_value_type);
        }
        if(Create_Form.value.drivers_manager_id) {
          formData.append('drivers_manager_id', Create_Form.value.drivers_manager_id);
        }

        this.loader_create = true;
        this.Order.create(formData).subscribe({
          next:(response)=> {
            this.loader_create = false;
            if(!response?.status) {
              this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
            }
          }
        });
      } else if(Create_Form.value.type === "product") {
        const formData = new FormData();
        formData.append('role', Create_Form.value.role);
        formData.append('type', Create_Form.value.type);
        formData.append('content', Create_Form.value.content);
        formData.append('comment', Create_Form.value.comment);
        formData.append('delivery_type', Create_Form.value.delivery_type);
        formData.append('delivery_type_id', Create_Form.value.delivery_type_id);
        formData.append('company_id', Create_Form.value.company_id);
        formData.append('special_instructions', Create_Form.value.special_instructions);
        formData.append('client_id', Create_Form.value.client_id);
        formData.append('client_location_id', Create_Form.value.client_location_id);
        if(Create_Form.value.delivery_driver_assigned_to_transportation_period_id) {
          formData.append('delivery_driver_assigned_to_transportation_period_id', Create_Form.value.delivery_driver_assigned_to_transportation_period_id);
        }
        if(Create_Form.value.discount_value) {
          formData.append('discount_value', Create_Form.value.discount_value);
        }
        if(Create_Form.value.discount_value_type) {
          formData.append('discount_value_type', Create_Form.value.discount_value_type);
        }
        if(Create_Form.value.drivers_manager_id) {
          formData.append('drivers_manager_id', Create_Form.value.drivers_manager_id);
        }

        for(let i = 0; i < this.productitems.length; ++i) {
          if(this.productitems[i].quantity) {
            formData.append(`items[${i}][product_option_id]}` , this.productitems[i]?.id)
            formData.append(`items[${i}][quantity]}` , this.productitems[i]?.quantity)
          }
        }

        this.loader_create = true;
        this.Order.create(formData).subscribe({
          next:(response)=> {
            this.loader_create = false;
            if(!response?.status) {
              this.toast.error({detail:"ERROR",summary:response?.message,duration:5000});
            }
          }
        });
      }
    }
  }
  close_create() {
    this.show_create = false;
    if(!this.show_create) {
      window.location.reload();
    }
  }

  getType(event: any) {
    if(event?.target?.value === "product") {
      this.type = event?.target?.value;
      if(this.company_id && this.type) {
        this.CompaniesProducts.products(this.company_id).subscribe({
          next:(response)=> {
            this.productOptions = response?.data;
          }
        });
        this.ProductType = true;
      }
    }
    else {
      this.ProductType = false;
    }
  }
  pickupDate(event: any) {
    event = event.replace("T" , " ");
    this.Create_Form.patchValue({
      pickup_date : event
    });
    this.PD = event;
    if(this.company_id && this.PD) {
      this.driversAppOrdersPD(this.company_id , this.PD);
    }
  }
  deliveryDate(event: any) {
    event = event.replace("T" , " ");
    this.Create_Form.patchValue({
      delivery_date : event
    });
    this.DD = event;
    if(this.company_id && event) {
      this.driversAppOrdersDD(this.company_id , this.DD);
    }
  }
  pickupClient(event: any) {
    this.ClientsLocations.show(event?.target?.value).subscribe({
      next:(response)=> {
        this.clientLocations.push({id :  response?.data[0]?.id  , data: `${response?.data[0]?.lat}  ${response?.data[0]?.long}`});
      }
    });
  }
  pickupDeliveryTypes(event: any) {
    this.Create_Form.patchValue({
      delivery_type_id : event?.target?.value
    });
    for(let i = 0; i < this.deliveryTypes.length; ++i) {
      if(this.deliveryTypes[i].id == event?.target?.value) {
        this.Create_Form.patchValue({
          delivery_type : this.deliveryTypes[i]?.name_en
        });
      }
    }
  }
  pickupClientLocations(event: any) {
    if(event?.target?.value) {

    }
  }
  onChangeCompanies(event: any) {
    this.company_id = event?.target?.value;
    if(this.company_id && this.PD) {
      this.driversAppOrdersPD(this.company_id , this.PD);
    } else if(this.company_id && this.DD) {
      this.driversAppOrdersDD(this.company_id , this.DD);
    }

    if(this.company_id && this.type) {
      this.CompaniesProducts.products(this.company_id).subscribe({
        next:(response)=> {
          this.productOptions = response?.data;
        }
      });
      this.ProductType = true;
    }
  }

  product(id: any , event: any) {
    this.productitems.push({id: id , quantity: event?.target?.value});
  }

  driversAppOrdersDD(id: any , date: any) {
    this.DriversAppOrders.get(id , date).subscribe({
      next:(response)=> {
        for(let i = 0; i < response?.data.length; ++i) {
          this.deliveryPeriods.push(`${response?.data[i]?.from}  ${response?.data[i]?.to}`);
          for(let j = 0; j < response?.data[i]?.drivers.length; ++j) {
            this.deliveryDrivers.push({id: response?.data[i]?.drivers[j]?.driver_id , name: response?.data[i]?.drivers[j]?.driver?.user?.name})
          }
        }
      }
    });
  }

  driversAppOrdersPD(id: any , date: any) {
    this.DriversAppOrders.get(id , date).subscribe({
      next:(response)=> {
        for(let i = 0; i < response?.data.length; ++i) {
          this.pickupPeriods.push(`${response?.data[i]?.from}   ${response?.data[i]?.to}`);
          for(let j = 0; j < response?.data[i]?.drivers.length; ++j) {
            this.pickupDrivers.push({id: response?.data[i]?.drivers[j]?.driver_id , name: response?.data[i]?.drivers[j]?.driver?.user?.name})
          }
        }
      }
    });
  }

  update(row:any) {
    console.log(row);
  }
  UpdateForm
  (Update_Form: FormGroup) {

  }



  invoice(row: any) {
    this.invoiceID = row.id;
    this.show_invoice = true;
  }
  close_invoice() {
    this.show_invoice = false;
  }


}

