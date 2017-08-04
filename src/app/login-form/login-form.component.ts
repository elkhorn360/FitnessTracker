import { Router } from '@angular/router';
import { log } from 'util';
import { ServicesService } from '../services.service';
import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  user = {username:"",password:""};

  constructor(private servicesService: ServicesService, private router: Router) {
    if(Cookie.get("userToken")){
      this.router.navigate(['home']);
    }
   }

  ngOnInit() {
    /*this.servicesService.getAllPosts().subscribe(posts => {
      console.log(posts);
    });*/
  }

  login(event) {
    event.preventDefault();
    console.log(this.user);
    this.servicesService.loginUser(this.user).subscribe(response => {
      console.log(response.json());
      if(response.json().status == 'success'){

        if(response.json().user.role == 'admin'){
          console.log("User is admin");
          Cookie.set("userRole",'admin');
          console.log(Cookie.get("userRole"));
        }

        var key = btoa(btoa(this.user.username) +'??'+ btoa(this.user.password))
        // console.log(response.json().status);
        Cookie.set("userToken",key);
        console.log(Cookie.get("userToken"));
        this.router.navigate(['home']);
        location.reload();
      }else{
        this.router.navigate(['login']);
      }

    },err=>{
      console.log(err._body);
      if(err._body){
        this.user = {username:"",password:""};
      }
    });
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }

}
