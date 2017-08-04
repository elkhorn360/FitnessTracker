import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { Cookie } from "ng2-cookies/ng2-cookies";
import { ServicesService } from '../services.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/upload'});
  

    constructor(private router: Router) { }

  ngOnInit() {
     if(Cookie.get("userToken")){}else{
      this.router.navigate(['login']);
    } 
  }

  
}