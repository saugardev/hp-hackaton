import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';

type coords = {
  x: number;
  y: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
/**
 * HomeComponent class
 */
export class HomeComponent implements AfterViewInit {

  private _map: L.Map | undefined;
  private _markers: L.Marker[] | undefined;

  public get map(): L.Map {
    return this._map as L.Map;
  }
  public set map(value: L.Map) {
    this._map = value;
  }
  public get markers(): L.Marker[] | undefined {
    return this._markers;
  }
  public set markers(value: L.Marker[] | undefined) {
    this._markers = value;
  }

  constructor() {
    this._map = undefined;
    this._markers = undefined;
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
      attributionControl: false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
    });

    const array = [
      {x: 20, y: 30},
      {x: 25, y: 35},
      {x: 30, y: -90},
    ]

    this.markers = [];
    const icon = L.icon({
      iconUrl: 'assets/marker.png',
      iconSize: [30, 30],
      iconAnchor: [15, 0],
    });
    for (const marker of array) {

      const obj = new L.Marker([marker.x, marker.y], {
        icon: icon,
      });
      this.markers?.push(obj.addTo(this.map));
    }

    tiles.addTo(this.map);


  }
}
