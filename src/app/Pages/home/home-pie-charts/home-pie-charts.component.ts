import { Component } from '@angular/core';

@Component({
  selector: 'app-home-pie-charts',
  templateUrl: './home-pie-charts.component.html',
  styleUrls: ['./home-pie-charts.component.scss']
})
export class HomePieChartsComponent {
  single:any[] =
  [
    {
      "name": "book",
      "value": 5001
    }, {
      "name": "graphic card",
      "value": 7322
    }, {
      "name": "desk",
      "value": 1726
    }, {
      "name": "laptop",
      "value": 2599
    }, {
      "name": "monitor",
      "value": 705
    }
  ];
  colorScheme:any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition:any = 'below';
}
