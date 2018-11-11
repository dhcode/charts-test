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

    if (this.chart) {

    }

    console.log('buildChart');

    this.configurer = getChartTypeConfigurer(this.config.type);

    const config = {
      config: {},
      ...this.configurer.createConfig(this.config.columns, this.config.chartOptions)
    };

    console.log('chartConfig', config);

    this.chart = Plotly.newPlot(this.chartContainer.nativeElement, config.data, config.layout);

  }

  updateData() {
    if (!this.chart) {
      return;
    }
    const dataConfig = this.configurer.createDataConfig(this.config.columns, this.config.chartOptions, this.data);
    Plotly.extendTraces(this.chartContainer.nativeElement, dataConfig.data, dataConfig.indices);

  }


}
