import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  color!:string;

  getcolor(event:any)
  {
    console.log(event); //this is the color
    window.document.getElementById("uncolorfull")!.classList!.add("d-none");
    window.document.getElementById("colorfull")!.classList!.remove("d-none");
    window.document.getElementById("colorfull")!.style!.display = "block";

    window.document.getElementById("uncolorfulltext")!.classList!.add("d-none");
    window.document.getElementById("colorfulltext")!.classList!.remove("d-none");
    window.document.getElementById("colorfulltext")!.style!.display = "block";

    window.document.getElementById("uncolorfullreorder")!.classList!.add("d-none");
    window.document.getElementById("colorfullreorder")!.classList!.remove("d-none");
    window.document.getElementById("colorfullreorder")!.style!.display = "block";
  }
}
