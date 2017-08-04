import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Cookie } from "ng2-cookies";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hasLogged = false;
  isAdmin = false;
  constructor(private router: Router) { }

  ngOnInit() {
    if(Cookie.get("userToken")){
      this.hasLogged = true
    }
    if(Cookie.get("userRole") == 'admin'){
      this.isAdmin = true
    }
  }

  logout(){
    console.log("Log out called");
    Cookie.deleteAll();
    this.hasLogged = false;
    this.router.navigate(['login']);
    location.reload();
  }

  //   profile(){
  //   this.router.navigate(['profile']);
  // }
  //   home(){
  //   this.router.navigate(['home']);
  // }

  login(){
    console.log("Log in called")
  }
}
