import { HttpService } from './../../../../core/http/http.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {

  public myControl = new FormControl();
  public options = [
    'Número de accidentes',
    'Paradas de autobús',
    'Trenes de cercanías',
    'Trenes interurbanos',
    'Contenedores de basura',
    'Estaciones de metro',
    'Paradas de taxi',
  ];
  public cardData = new Map();
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.setAccidentablididad();
  }

  private setAccidentablididad(): void {
    this.httpService.accidentablididad.subscribe(res => {
      for (const datum of res) {
        if (datum.distrito !== null) {
          if (this.cardData.has(datum.distrito)) {
            this.cardData.set(datum.distrito, this.cardData.get(datum.distrito) + 1);
          }
          else {
            this.cardData.set(datum.distrito, 1);
          }
        }
      }
    });
  }

  public updateMap(): void {
    this.myControl.reset();
  }

  public showIcons(distrito: string): void {
    console.log(distrito);

    this.httpService.icons.next(distrito);
  }
}
