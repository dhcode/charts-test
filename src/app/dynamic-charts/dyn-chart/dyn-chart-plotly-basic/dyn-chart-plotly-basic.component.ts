import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Plotly from 'plotly.js/lib/index-basic';
import { DynChartPlotlyBasicService } from './dyn-chart-plotly-basic.service';

@Component({
  selector: 'app-dyn-chart-plotly-basic',
  templateUrl: './dyn-chart-plotly-basic.component.html',
  styleUrls: ['./dyn-chart-plotly-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynChartPlotlyBasicComponent implements AfterViewInit, OnDestroy {

  @ViewChild('chartContainer') chartContainer: ElementRef;

  private destroy = new Subject();

  error = null;

  private chart: any;


  constructor(private plotlyService: DynChartPlotlyBasicService) {
  }

  ngOnDestroy(): void {
    this.destroy.complete();
  }

  ngAfterViewInit(): void {
    this.plotlyService.getPlotlyConfig().pipe(takeUntil(this.destroy)).subscribe(configChange => {
      try {
        if (configChange.type === 'react') {
          this.chart = Plotly.react(this.chartContainer.nativeElement, configChange.data, configChange.layout);
        }
        if (configChange.type === 'update') {
          Plotly.update(this.chartContainer.nativeElement, configChange.data, null, configChange.indices);
        }
        if (configChange.type === 'extend') {
          Plotly.extendTraces(this.chartContainer.nativeElement, configChange.data, configChange.indices);
        }
      } catch (e) {
        this.error = e.toString();
      }

      if (configChange.type === 'error') {
        this.error = configChange.error;
      }
    });
  }


}
