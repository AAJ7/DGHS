import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss']
})
export class ProjectManagerComponent {
  show:boolean = false;
  show_delete:boolean = false;
  show_right:boolean = false;
  country!:string;

  constructor(private route: ActivatedRoute , private router: Router){}
  ngOnInit(): void {
    this.country = this.route.snapshot.params['country'];
    this.router.events.subscribe(() => {
      this.country = this.route.snapshot.params['country'];
      this.country = this.country + ".png";
  });

  }

  close() {
    this.show = false;
  }
  rows:any[] =
  [
    {
      "Client Request Order": "Order No:1",
      "Laundry Confirmed Order": "Order No:1",
      "Sent delivery To Client": "Order No:1",
      "delivery Man Arrived": "Order No:1",
      "Laundry Working on order" : "Order No:1",
      "delivery send order" : "Order No:1",
      "Order delieverd" : "Order No:1"
    },
    {
      "Client Request Order": "Order No:1",
      "Laundry Confirmed Order": "Order No:1",
      "Sent delivery To Client": "Order No:1",
      "delivery Man Arrived": "Order No:1",
      "Laundry Working on order" : "Order No:1",
      "delivery send order" : "Order No:1",
      "Order delieverd" : "Order No:1"
    },
    {
      "Client Request Order": "Order No:1",
      "Laundry Confirmed Order": "Order No:1",
      "Sent delivery To Client": "Order No:1",
      "delivery Man Arrived": "Order No:1",
      "Laundry Working on order" : "Order No:1",
      "delivery send order" : "Order No:1",
      "Order delieverd" : "Order No:1"
    },
    {
      "Client Request Order": "Order No:1",
      "Laundry Confirmed Order": "Order No:1",
      "Sent delivery To Client": "Order No:1",
      "delivery Man Arrived": "Order No:1",
      "Laundry Working on order" : "Order No:1",
      "delivery send order" : "Order No:1",
      "Order delieverd" : "Order No:1"
    },
    {
      "Client Request Order": "Order No:1",
      "Laundry Confirmed Order": "Order No:1",
      "Sent delivery To Client": "Order No:1",
      "delivery Man Arrived": "Order No:1",
      "Laundry Working on order" : "Order No:1",
      "delivery send order" : "Order No:1",
      "Order delieverd" : "Order No:1"
    },
    {
      "Client Request Order": "Order No:1",
      "Laundry Confirmed Order": "Order No:1",
      "Sent delivery To Client": "Order No:1",
      "delivery Man Arrived": "Order No:1",
      "Laundry Working on order" : "Order No:1",
      "delivery send order" : "Order No:1",
      "Order delieverd" : "Order No:1"
    },
    {
      "Client Request Order": "Order No:1",
      "Laundry Confirmed Order": "Order No:1",
      "Sent delivery To Client": "Order No:1",
      "delivery Man Arrived": "Order No:1",
      "Laundry Working on order" : "Order No:1",
      "delivery send order" : "Order No:1",
      "Order delieverd" : "Order No:1"
    },
    {
      "Client Request Order": "Order No:1",
      "Laundry Confirmed Order": "Order No:1",
      "Sent delivery To Client": "Order No:1",
      "delivery Man Arrived": "Order No:1",
      "Laundry Working on order" : "Order No:1",
      "delivery send order" : "Order No:1",
      "Order delieverd" : "Order No:1"
    },
    {
      "Client Request Order": "Order No:1",
      "Laundry Confirmed Order": "Order No:1",
      "Sent delivery To Client": "Order No:1",
      "delivery Man Arrived": "Order No:1",
      "Laundry Working on order" : "Order No:1",
      "delivery send order" : "Order No:1",
      "Order delieverd" : "Order No:1"
    },
    {
      "Client Request Order": "Order No:1",
      "Laundry Confirmed Order": "Order No:1",
      "Sent delivery To Client": "Order No:1",
      "delivery Man Arrived": "Order No:1",
      "Laundry Working on order" : "Order No:1",
      "delivery send order" : "Order No:1",
      "Order delieverd" : "Order No:1"
    },
    {
      "Client Request Order": "Order No:1",
      "Laundry Confirmed Order": "Order No:1",
      "Sent delivery To Client": "Order No:1",
      "delivery Man Arrived": "Order No:1",
      "Laundry Working on order" : "Order No:1",
      "delivery send order" : "Order No:1",
      "Order delieverd" : "Order No:1"
    },
    {
      "Client Request Order": "Order No:1",
      "Laundry Confirmed Order": "Order No:1",
      "Sent delivery To Client": "Order No:1",
      "delivery Man Arrived": "Order No:1",
      "Laundry Working on order" : "Order No:1",
      "delivery send order" : "Order No:1",
      "Order delieverd" : "Order No:1"
    },
    {
      "Client Request Order": "Order No:1",
      "Laundry Confirmed Order": "Order No:1",
      "Sent delivery To Client": "Order No:1",
      "delivery Man Arrived": "Order No:1",
      "Laundry Working on order" : "Order No:1",
      "delivery send order" : "Order No:1",
      "Order delieverd" : "Order No:1"
    },
  ];


  filter(value:any) {
    this.rows = this.rows.filter((item:any)=>{return JSON.stringify(item).toLowerCase().includes(value.toLowerCase());
    });
  }
}
