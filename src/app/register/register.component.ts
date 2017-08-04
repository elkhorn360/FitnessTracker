import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Cookie } from "ng2-cookies/ng2-cookies";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  
})
export class RegisterComponent implements OnInit {
  userData:Object = {};
  errors = ["err 1", "err 2", "err 3"]
  constructor(private servicesService: ServicesService, private router: Router) {}

  ngOnInit() {
    if(Cookie.get("userToken")){
      this.router.navigate(['login']);
    }
  }

 

  signUp(event){
    event.preventDefault();
    console.log(this.userData);
    this.servicesService.registerUser(this.userData).subscribe(response => {
        console.log(response);
    });
     //this.router.navigate(['login']);
  }
}
