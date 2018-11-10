import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfig } from '../lib/models/chart-config';
import * as c3 from 'c3';
import { ChartTypeConfigurer} from '../lib/models/chart-types';
import { ChartAPI } from 'c3';
import { getChartTypeConfigurer } from '../lib/chart-configurers/index';

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

  private chart: ChartAPI;

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
      this.chart.destroy();
    }

    console.log('buildChart');

    this.configurer = getChartTypeConfigurer(this.config.type);

    const chartConfig = {
      bindto: this.chartContainer.nativeElement,
      ...this.configurer.createConfig(this.config.columns, this.config.chartOptions)
    };

    console.log('c3 chartConfig', chartConfig);

    this.chart = c3.generate(chartConfig);

  }

  updateData() {
    if (!this.chart) {
      return;
    }

    this.chart.load(this.configurer.createDataConfig(this.config.columns, this.config.chartOptions, this.data));
  }


}
