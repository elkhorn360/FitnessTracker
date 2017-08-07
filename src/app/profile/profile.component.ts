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
  data = { "activityName": "", "comment": ""}

    public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/upload',additionalParameter:this.data});
  

    constructor(private router: Router) { }

  ngOnInit() {
     if(Cookie.get("userToken")){}else{
      this.router.navigate(['login']);
    } 
  }

  uploadItem(event,index){
    event.preventDefault();
    var item = this.uploader.queue[index];
    console.log(item);
    item.formData = this.data;
    //this.uploader.
    item.upload()
    console.log(item);
    
    console.log(index);
    console.log(this.data);
  }
}