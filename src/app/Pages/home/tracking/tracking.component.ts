import { Component } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent {
  lat = 29.926374;
  lng = 31.243731;

  latlng:any[] = [
    {
      lat : 29.812050,
      lng :28.517303
    },
    {
      lat : 29.391747,
      lng : 34.036122
    },
    {
      lat : 29.123373,
      lng : 31.595529
    }
  ];

  // data : any[] =
  // [
  //   {
  //     color : "green",
  //     point_1 :
  //     {
  //       lat : 29.812050 ,
  //       lng : 28.517303
  //     },
  //     point_2 :
  //     {
  //       lat : 29.391747 ,
  //       lng : 34.036122
  //     },
  //   }
  // ];

  options:any =
  {
    url: "https://images.pexels.com/photos/8910681/pexels-photo-8910681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    scaledSize:
    {
      width: 40,
      height: 60
    }
}

// labelOptions =
// {
//   color: 'blue',
//   fontFamily: '',
//   fontSize: '14px',
//   fontWeight: 'bold',
//   text: 'Some Text',
// }
}
