import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynChartPlotlyBasicComponent } from './dyn-chart-plotly-basic.component';
import { DYN_CHART_COMPONENT } from '../dyn-chart.model';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DynChartPlotlyBasicComponent],
  entryComponents: [DynChartPlotlyBasicComponent],
  providers: [
    {provide: DYN_CHART_COMPONENT, useValue: DynChartPlotlyBasicComponent}
  ]
})
export class DynChartPlotlyBasicModule { }
