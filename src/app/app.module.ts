import { FormsModule } from '@angular/forms';
import { AngularLoginPage } from '../../e2e/app.po';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ServicesService } from './services.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { MapComponent } from './map/map.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginFormComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    FooterComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    AdminComponent,
    FileSelectDirective,
    MapComponent,
  
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpCByN0xhGv56lSHPYQ2QVzPo4nR5oKMQ'
    })
  ],
  providers: [ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
