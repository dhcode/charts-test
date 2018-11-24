import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlotlyChartComponent } from './plotly-chart.component';
import { CHART_COMPONENT } from '../configured-chart.model';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PlotlyChartComponent],
  entryComponents: [PlotlyChartComponent],
  providers: [
    {provide: CHART_COMPONENT, useValue: PlotlyChartComponent}
  ]
})
export class PlotlyChartModule { }
