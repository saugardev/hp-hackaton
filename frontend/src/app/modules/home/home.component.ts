import { HttpService } from './../../core/http/http.service';
import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.utm';

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

  constructor(private httpService: HttpService) {
    this._map = undefined;
    this._markers = undefined;
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.httpService.getAccidentabilidad().subscribe(res => {
      this.httpService.accidentablididad.next(res);
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
      attributionControl: false,
      boxZoom: true,
      maxBoundsViscosity: 0.6,
      minZoom: 2,
      maxBounds: [
        [90, -180],
        [-90, 180]
      ],
    });
    const icon = L.icon({
      iconUrl: 'assets/marker.png',
      iconSize: [30, 30],
      iconAnchor: [15, 0],
    });

    const obj = new L.Marker([10, 10], {
      icon: icon,
    });
    this.markers?.push(obj.addTo(this.map))

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 2,
    });
    this.waitForIcons();
    tiles.addTo(this.map);
  }

  private waitForIcons(): void {
    this.httpService.icons.subscribe(res => {
      if (this.httpService.icons.value === "") return;
      const markerCoords = [];
      this.markers = []
      for (const datum of this.httpService.accidentablididad.value) {
        try {
          if (datum.distrito === res) {
            console.log(res);
            const x = parseFloat(datum.coordenada_x_utm.replace(",", "."));
            const y = parseFloat(datum.coordenada_y_utm.replace(",", "."));
            const item = L.utm({x, y, zone: 30, southHemi: false, band: "N"});
            const coord = item.latLng();
            markerCoords.push({
              x: coord.lat,
              y: coord.lng
            });
          }
        }
        catch (e) {}
      }
      const icon = L.icon({
        iconUrl: 'assets/marker.png',
        iconSize: [30, 30],
        iconAnchor: [15, 0],
      });

      const obj = new L.Marker([10, 10], {
        icon: icon,
      });
      this.markers?.push(obj.addTo(this.map))

      for (const marker of markerCoords) {
        const obj = new L.Marker([marker.x, marker.y], {
          icon: icon,
        });
        this.markers?.push(obj.addTo(this.map));
      }
    });
  }
}
