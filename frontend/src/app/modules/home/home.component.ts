import { HttpService } from './../../core/http/http.service';
import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.utm';
import 'leaflet.markercluster';

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
  private markerCluster = (L as any).markerClusterGroup({
    spiderfyOnMaxZoom: false,
    disableClusteringAtZoom: 16
  });

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
    this.httpService.buses.subscribe(() => {
      this.loadBuses();
    });
    this.httpService.cercanias.subscribe(() => {
      this.loadCercanias();
    });
    this.httpService.interurbano.subscribe(() => {
      this.loadInterurbanos();
    });
    this.httpService.contenedores.subscribe(() => {
      this.loadContenedores();
    });
    this.httpService.metro.subscribe(() => {
      this.loadMetro();
    })
    this.httpService.taxi.subscribe(() => {
      this.loadTaxi();
    })
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -3.5795],
      zoom: 6,
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
      this.map.removeLayer(this.markerCluster);
      this.markerCluster = (L as any).markerClusterGroup({
        spiderfyOnMaxZoom: false,
        disableClusteringAtZoom: 16
      });
      const markerCoords = [];
      this.markers = [];
      for (const datum of this.httpService.accidentablididad.value) {
        try {
          if (datum.distrito === res) {
            const x = parseFloat(datum.coordenada_x_utm.replace(",", "."));
            const y = parseFloat(datum.coordenada_y_utm.replace(",", "."));
            const item = L.utm({x, y, zone: 30, southHemi: false, band: "N"});
            const coord = item.latLng();
            markerCoords.push({
              x: coord.lat,
              y: coord.lng,
              data: "Localización: " + datum.localizacion + "<br><br>" + "Descripción: " + datum.tipo_accidente
            });
          }
        }
        catch (e) {}
      }
      const icon = L.icon({
        iconUrl: 'assets/img/marker.png',
        iconSize: [30, 30],
        iconAnchor: [15, 0],
      });

      for (const marker of markerCoords) {
        const obj = new L.Marker([marker.x, marker.y], {
          icon: icon,
        }).bindPopup(marker.data);
        obj.addTo(this.markerCluster);
      }
      this.markerCluster.addTo(this.map);
    });
  }

  private loadBuses(): void {
    if (this.httpService.buses.value !== 0) {
      this.map.removeLayer(this.markerCluster);
      this.markerCluster = (L as any).markerClusterGroup({
        spiderfyOnMaxZoom: false,
        disableClusteringAtZoom: 16
      });
      const markerCoords = [];
      this.markers = [];
      const icon = L.icon({
        iconUrl: 'assets/img/parada-de-autobus.png',
        iconSize: [30, 30],
        iconAnchor: [15, 0]
      })
      for (const datum of this.httpService.buses.value) {
        const marker = new L.Marker([datum.latitude, datum.longitude], {
          icon: icon,
        }).bindPopup(datum.name);
        marker.addTo(this.markerCluster);
      }
      this.map.addLayer(this.markerCluster);
    }
  }

  private loadCercanias(): void {
    if (this.httpService.cercanias.value !== 0) {
      this.map.removeLayer(this.markerCluster);
      this.markerCluster = (L as any).markerClusterGroup({
        spiderfyOnMaxZoom: false,
        disableClusteringAtZoom: 16
      });
      const icon = L.icon({
        iconUrl: 'assets/img/tren.png',
        iconSize: [30, 30],
        iconAnchor: [15, 0]
      })
      for (const datum of this.httpService.cercanias.value) {
        const marker = new L.Marker([datum.latitude, datum.longitude], {
          icon: icon,
        }).bindPopup(datum.name);
        marker.addTo(this.markerCluster);
      }
      this.map.addLayer(this.markerCluster);
    }
  }

  private loadInterurbanos(): void {
    if (this.httpService.interurbano.value !== 0) {
      this.map.removeLayer(this.markerCluster);
      this.markerCluster = (L as any).markerClusterGroup({
        spiderfyOnMaxZoom: false,
        disableClusteringAtZoom: 16
      });
      const icon = L.icon({
        iconUrl: 'assets/img/autobus.png',
        iconSize: [30, 30],
        iconAnchor: [15, 0]
      })
      for (const datum of this.httpService.interurbano.value) {
        const marker = new L.Marker([datum.latitude, datum.longitude], {
          icon: icon,
        }).bindPopup(datum.name);
        marker.addTo(this.markerCluster);
      }
      this.map.addLayer(this.markerCluster);
    }
  }

  private loadContenedores(): void {
    if (this.httpService.contenedores.value !== 0) {
      this.map.removeLayer(this.markerCluster);
      this.markerCluster = (L as any).markerClusterGroup({
        spiderfyOnMaxZoom: false,
        disableClusteringAtZoom: 16
      });
      const icon = L.icon({
        iconUrl: 'assets/img/contenedor-de-basura.png',
        iconSize: [30, 30],
        iconAnchor: [15, 0]
      })
      for (const datum of this.httpService.contenedores.value) {
        const marker = new L.Marker([datum.LATITUD, datum.LONGITUD], {
          icon: icon,
        }).bindPopup(datum['Tipo Contenedor']+"<br><br>"+datum['Nombre']);
        marker.addTo(this.markerCluster);
      }
      this.map.addLayer(this.markerCluster);
    }
  }

  private loadMetro(): void {
    if (this.httpService.metro.value !== 0) {
      this.map.removeLayer(this.markerCluster);
      this.markerCluster = (L as any).markerClusterGroup({
        spiderfyOnMaxZoom: false,
        disableClusteringAtZoom: 16
      });
      const icon = L.icon({
        iconUrl: 'assets/img/metro.png',
        iconSize: [30, 30],
        iconAnchor: [15, 0]
      })
      for (const datum of this.httpService.metro.value) {
        const marker = new L.Marker([datum.latitude, datum.longitude], {
          icon: icon,
        }).bindPopup(datum.name);
        marker.addTo(this.markerCluster);
      }
      this.map.addLayer(this.markerCluster);
    }
  }

  private loadTaxi(): void {
    if (this.httpService.taxi.value !== 0) {
      this.map.removeLayer(this.markerCluster);
      this.markerCluster = (L as any).markerClusterGroup({
        spiderfyOnMaxZoom: false,
        disableClusteringAtZoom: 16
      });
      const icon = L.icon({
        iconUrl: 'assets/img/parada-de-taxi.png',
        iconSize: [30, 30],
        iconAnchor: [15, 0]
      })
      for (const datum of this.httpService.taxi.value) {
        const marker = new L.Marker([datum.latitude, datum.longitude], {
          icon: icon,
        }).bindPopup(datum['name']);
        marker.addTo(this.markerCluster);
      }
      this.map.addLayer(this.markerCluster);
    }
  }
}
