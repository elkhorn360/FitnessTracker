import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  lat: number = 53.3791;
  lng: number = 1.4661;

  constructor() { }

  ngOnInit() {
  }

}
