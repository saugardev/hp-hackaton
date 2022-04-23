import { CoreModule } from './../../core/core.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import { DeviceInfoComponent } from './components/device-info/device-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    DeviceInfoComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
/**
 * HomeModule class
 */
export class HomeModule { }
