import { resetFakeAsyncZone } from '@angular/core/testing/src/testing';
import { ServicesService } from '../services.service';
import { Component, OnInit } from '@angular/core';
import $ from "jquery"; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users = []
  selectedUser = { username:"", email: "",role: "" }
  constructor(private servicesService: ServicesService) { 
  }

  ngOnInit() {
    $(document).ready(function(){
      $("#mytable #checkall").click(function () {
        if ($("#mytable #checkall").is(':checked')) {
            $("#mytable input[type=checkbox]").each(function () {
                $(this).prop("checked", true);
            });

        } else {
            $("#mytable input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
            });
        }
      });

      $("[data-toggle=tooltip]").tooltip();
    });

    this.getAllUsers()
  }
  deleteUser(id){
    var userId = {"id": id }
    console.log(userId);
    this.servicesService.deleteUser(userId).subscribe(response => {
      console.log(response);
      this.getAllUsers()
    });
  }

  select(user){
    this.selectedUser = user;
    console.log(user);
  }

  unselectUser(){
    console.log("User deselected.")
    this.selectedUser = {username:"", email:"",role:""}
    this.getAllUsers();
  }

  updateUser(){
    console.log(this.selectedUser);
    this.servicesService.updateUser(this.selectedUser).subscribe(response => {
      console.log(response);
      this.getAllUsers()
    });
  }

  getAllUsers(){
    this.users = []
    this.selectedUser = {username:"", email:"",role:""}
    this.servicesService.getAllUsers().subscribe(response => {
      console.log(response);
      for (let user in response) {
        this.users.push(response[user]);
}
    });
  }
}
