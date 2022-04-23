import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphRoutingModule } from './graph-routing.module';
import { GraphComponent } from './graph.component';


@NgModule({
  declarations: [
    GraphComponent
  ],
  imports: [
    CommonModule,
    GraphRoutingModule,
    CoreModule
  ]
})
export class GraphModule { }
