import { Component } from '@angular/core';

@Component({
  selector: 'app-home-area-charts',
  templateUrl: './home-area-charts.component.html',
  styleUrls: ['./home-area-charts.component.scss']
})
export class HomeAreaChartsComponent {
  data:any[] = [
    {
      "name": "Honduras",
      "series": [
        {
          "value": 4290,
          "name": "2016-09-21T08:00:20.448Z"
        },
        {
          "value": 6545,
          "name": "2016-09-22T04:01:23.656Z"
        },
        {
          "value": 6783,
          "name": "2016-09-14T16:20:55.046Z"
        },
        {
          "value": 4057,
          "name": "2016-09-23T21:36:58.876Z"
        },
        {
          "value": 3528,
          "name": "2016-09-13T15:11:21.323Z"
        }
      ]
    },
    {
      "name": "Antigua and Barbuda",
      "series": [
        {
          "value": 6651,
          "name": "2016-09-21T08:00:20.448Z"
        },
        {
          "value": 3071,
          "name": "2016-09-22T04:01:23.656Z"
        },
        {
          "value": 2611,
          "name": "2016-09-14T16:20:55.046Z"
        },
        {
          "value": 5484,
          "name": "2016-09-23T21:36:58.876Z"
        },
        {
          "value": 5730,
          "name": "2016-09-13T15:11:21.323Z"
        }
      ]
    },
    {
      "name": "French Polynesia",
      "series": [
        {
          "value": 5060,
          "name": "2016-09-21T08:00:20.448Z"
        },
        {
          "value": 3303,
          "name": "2016-09-22T04:01:23.656Z"
        },
        {
          "value": 6483,
          "name": "2016-09-14T16:20:55.046Z"
        },
        {
          "value": 3982,
          "name": "2016-09-23T21:36:58.876Z"
        },
        {
          "value": 4593,
          "name": "2016-09-13T15:11:21.323Z"
        }
      ]
    },
    {
      "name": "Saint Vincent and The Grenadines",
      "series": [
        {
          "value": 5380,
          "name": "2016-09-21T08:00:20.448Z"
        },
        {
          "value": 2998,
          "name": "2016-09-22T04:01:23.656Z"
        },
        {
          "value": 2904,
          "name": "2016-09-14T16:20:55.046Z"
        },
        {
          "value": 6418,
          "name": "2016-09-23T21:36:58.876Z"
        },
        {
          "value": 5781,
          "name": "2016-09-13T15:11:21.323Z"
        }
      ]
    },
    {
      "name": "Mozambique",
      "series": [
        {
          "value": 6639,
          "name": "2016-09-21T08:00:20.448Z"
        },
        {
          "value": 2506,
          "name": "2016-09-22T04:01:23.656Z"
        },
        {
          "value": 2044,
          "name": "2016-09-14T16:20:55.046Z"
        },
        {
          "value": 3485,
          "name": "2016-09-23T21:36:58.876Z"
        },
        {
          "value": 6992,
          "name": "2016-09-13T15:11:21.323Z"
        }
      ]
    }
  ]


  colorScheme2:any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition:any = 'below';

  legend: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
}
