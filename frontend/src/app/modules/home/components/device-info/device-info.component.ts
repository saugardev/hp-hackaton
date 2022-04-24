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
  public options: any = [];
  public cardData = new Map();
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.accidentablididad.subscribe(res => {
      const options = new Set();
      for (const datum of res) {
        if (datum.distrito !== null) {
          options.add(datum.distrito);
          if (this.cardData.has(datum.distrito)) {
            this.cardData.set(datum.distrito, this.cardData.get(datum.distrito) + 1);
          }
          else {
            this.cardData.set(datum.distrito, 1);
          }
        }
      }
      this.options = options;
    });
  }

  public updateMap(): void {
    this.myControl.reset();
  }
}
