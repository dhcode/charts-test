import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynChartComponent } from './dyn-chart/dyn-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DynChartComponent],
  exports: [DynChartComponent]
})
export class DynamicChartsModule { }
