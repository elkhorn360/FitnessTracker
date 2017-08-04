import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Cookie } from "ng2-cookies/ng2-cookies";
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  constructor(private router: Router) { }
  

  ngOnInit() {
    if(Cookie.get("userToken")){}else{
      this.router.navigate(['login']);
    }

    
  }
}


