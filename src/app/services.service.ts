import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import {environment} from '../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class ServicesService {

  headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  //   // Get all posts from the API
  // getAllPosts() {
  //   return this.http.get('/api/posts')
  //     .map(res => res.json());
  // }

  // Get all posts from the API
  getAllUsers() {
    return this.http.get(environment.API_URL + '/users/usersList')
      .map(res => res.json());
  }

  registerUser(userData) {
    userData.userRole = 'normal';
    return this.http.post(environment.API_URL + '/users/register',JSON.stringify(userData),this.options);
  }

  deleteUser(userData) {
    return this.http.post(environment.API_URL + '/users/deleteUser',JSON.stringify(userData),this.options);
  }

  updateUser(userData) {
    return this.http.post(environment.API_URL + '/users/updateUser',JSON.stringify(userData),this.options);
  }

  loginUser(loginDetails){
    	let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.API_URL + '/routes/login',JSON.stringify(loginDetails),options);
  }
}
