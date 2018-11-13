import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartConfig } from '../lib/models/chart-config';
import { ChartType, ChartTypeConfigurer } from '../lib/models/chart-types';
import { getAvailableChartTypes } from '../lib/chart-configurers';

@Component({
  selector: 'app-chart-configuration',
  templateUrl: './chart-configuration.component.html',
  styleUrls: ['./chart-configuration.component.scss']
})
export class ChartConfigurationComponent implements OnInit {

  @Input() config: ChartConfig;

  @Output() configChange = new EventEmitter<ChartConfig>();

  @Input() data: any[];

  chartTypes: ChartTypeConfigurer[] = [];

  constructor() {
  }

  ngOnInit() {
    if (!this.config) {
      this.config = {rev: 1, columns: [], type: null, chartOptions: {}};
    }
  }

  updateConfig(config: ChartConfig) {
    console.log('update ChartConfig', config);
    this.config = {...config};
    this.configChange.next(this.config);
    this.updateChartTypes();
  }

  updateChartTypes() {
    this.chartTypes = getAvailableChartTypes(this.config.columns);
  }

  updateChartType(type: ChartType) {
    if (type !== this.config.type && type) {
      console.log('updateChartType', type);
      const configurer = this.chartTypes.find(c => c.type === type);
      const config: ChartConfig = {
        ...this.config, type: type,
        chartOptions: configurer.getDefaultOptions(this.config.columns)
      };
      this.config = config;
      this.configChange.next(config);
    }

  }

}
