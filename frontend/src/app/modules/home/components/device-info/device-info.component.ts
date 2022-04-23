import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss']
})
export class DeviceInfoComponent implements OnInit {

  public myControl = new FormControl();
  options: string[] = ['Tipo 1', 'Tipo 2', 'Tipo 3'];

  constructor() { }

  ngOnInit(): void {
  }

  public updateMap(): void {
    console.log(this.myControl.value)
    this.myControl.reset();
  }
}
