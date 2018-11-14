import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfig } from '../lib/models/chart-config';
import { ChartTypeConfigurer } from '../lib/models/chart-types';
import { getChartTypeConfigurer } from '../lib/chart-configurers';
import * as Plotly from 'plotly.js/dist/plotly.js';

@Component({
  selector: 'app-configured-chart',
  templateUrl: './configured-chart.component.html',
  styleUrls: ['./configured-chart.component.scss']
})
export class ConfiguredChartComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('chartContainer') chartContainer: ElementRef;

  @Input() config: ChartConfig;

  @Input() data: any[];

  error = null;

  private configurer: ChartTypeConfigurer;

  private chart: any;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && !changes.config.firstChange) {
      this.buildChart();
      this.updateData();
    } else if (changes.data && !changes.data.firstChange) {
      this.updateData();
    }

  }

  ngAfterViewInit(): void {
    this.buildChart();
    this.updateData();
  }

  buildChart() {
    if (!this.chartContainer || !this.config || !this.data || !this.config.type) {
      return;
    }

    console.log('buildChart');

    this.configurer = getChartTypeConfigurer(this.config.type);

    try {
      const config = {
        config: {},
        ...this.configurer.createConfig(this.config.axes, this.config.chartOptions)
      };

      console.log('chartConfig', config);

      this.chart = Plotly.newPlot(this.chartContainer.nativeElement, config['data'], config['layout']);
      this.error = null;
    } catch (e) {
      console.warn(e);
      this.error = e;
    }


  }

  updateData() {
    if (!this.chart) {
      return;
    }
    try {
      const dataConfig = this.configurer.createDataConfig(this.config.axes, this.config.chartOptions, this.data);
      Plotly.extendTraces(this.chartContainer.nativeElement, dataConfig.data, dataConfig.indices);
      this.error = null;
    } catch (e) {
      console.warn(e);
      this.error = e;
    }

  }


}
