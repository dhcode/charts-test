import { AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfig } from '../../lib/models/chart-config';
import { ChartTypeConfigurer } from '../../lib/models/chart-types';
import Plotly from 'plotly.js/lib/index-basic';
import { ChartComponentBase } from '../configured-chart.model';

@Component({
  selector: 'app-plotly-chart',
  templateUrl: './plotly-chart.component.html',
  styleUrls: ['./plotly-chart.component.scss']
})
export class PlotlyChartComponent implements OnInit, DoCheck, AfterViewInit, ChartComponentBase {

  @ViewChild('chartContainer') chartContainer: ElementRef;

  @Input() config: ChartConfig;

  @Input() data: any[];

  @Input() configurer: ChartTypeConfigurer;

  error = null;

  private chart: any;

  private _config: ChartConfig;
  private _data: any[];
  private _length = 0;

  private _error = null;

  constructor() {
  }

  ngOnInit() {
  }

  ngDoCheck(): void {
    if (this.config !== this._config) {
      this._config = this.config;
      this.buildChart();
      this.updateData(true);
    }
    if (this.data !== this._data) {
      this._data = this.data;
      this.updateData(true);
    } else if (this.data && this.data.length !== this._length) {
      this.updateData();
    }
    if (!this._error !== this.error) {
      this.error = this._error;
    }

  }

  ngAfterViewInit(): void {
    this.buildChart();
    this.updateData();
  }

  buildChart() {
    if (!this.chartContainer || !this._config || !this._data) {
      return;
    }

    try {
      const config = {
        config: {},
        ...this.configurer.createConfig(this._config.axes, this._config.chartOptions)
      };

      console.log('chartConfig', config);

      this.chart = Plotly.react(this.chartContainer.nativeElement, config['data'], config['layout']);
      this._error = null;
    } catch (e) {
      console.warn(e);
      this._error = e;
      Plotly.purge(this.chartContainer.nativeElement);
    }


  }

  updateData(reset = false) {
    if (!this.chart) {
      return;
    }
    try {
      this._length = this._data.length;
      const dataConfig = this.configurer.createDataConfig(this._config.axes, this._config.chartOptions, this._data);
      if (reset) {
        Plotly.update(this.chartContainer.nativeElement, dataConfig.data, null, dataConfig.indices);
      } else {
        Plotly.extendTraces(this.chartContainer.nativeElement, dataConfig.data, dataConfig.indices);
      }
      this._error = null;
    } catch (e) {
      console.warn(e);
      this._error = e;
      Plotly.purge(this.chartContainer.nativeElement);
    }

  }

}
