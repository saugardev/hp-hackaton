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
    const cardData = new Map();
    this.httpService.accidentablididad.subscribe(res => {
      for (const datum of res) {
        if (datum.distrito !== null) {
          if (this.cardData.has(datum.distrito)) {
            cardData.set(datum.distrito, this.cardData.get(datum.distrito) + 1);
          }
          else {
            cardData.set(datum.distrito, 1);
          }
        }
      }
    });
    this.cardData = cardData;
  }

  private setBuses(): void {
    this.httpService.getAutobuses().subscribe(res => {
      this.httpService.buses.next(res);
    });
  }

  private setCercanias(): void {
    this.httpService.getCercanias().subscribe(res => {
      this.httpService.cercanias.next(res);
    });
  }

  private setInterurbanos(): void {
    this.httpService.getInterurbano().subscribe(res => {
      this.httpService.interurbano.next(res);
    });
  }

  private setContenedores(): void {
    this.httpService.getContenedores().subscribe(res => {
      this.httpService.contenedores.next(res);
    });
  }

  private setMetro(): void {
    this.httpService.getMetro().subscribe(res => {
      this.httpService.metro.next(res);
    });
  }

  private setTaxi(): void {
    this.httpService.getTaxi().subscribe(res => {
      this.httpService.taxi.next(res);
    });
  }

  public updateMap(): void {
    if (this.myControl.value === 'Paradas de autobús') {
      this.setBuses();
    }
    if (this.myControl.value === 'Trenes de cercanías') {
      this.setCercanias();
    }
    if (this.myControl.value === 'Trenes interurbanos') {
      this.setInterurbanos();
    }
    if (this.myControl.value === 'Contenedores de basura') {
      this.setContenedores();
    }
    if (this.myControl.value === 'Estaciones de metro') {
      this.setMetro();
    }
    if (this.myControl.value === 'Paradas de taxi') {
      this.setTaxi();
    }
    this.myControl.reset();
  }

  public showIcons(distrito: string): void {
    console.log(distrito);

    this.httpService.icons.next(distrito);
  }
}
