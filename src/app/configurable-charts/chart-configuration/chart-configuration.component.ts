import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AxisConfig, ChartConfig } from '../lib/models/chart-config';
import { AxisInfo, ChartType, ChartTypeConfigurer } from '../lib/models/chart-types';
import { chartTypeConfigurers } from '../lib/chart-configurers';

@Component({
  selector: 'app-chart-configuration',
  templateUrl: './chart-configuration.component.html',
  styleUrls: ['./chart-configuration.component.scss']
})
export class ChartConfigurationComponent implements OnInit {

  @Input() config: ChartConfig;

  @Output() configChange = new EventEmitter<ChartConfig>();

  @Input() data: any[];

  chartTypes: ChartTypeConfigurer[] = chartTypeConfigurers;

  axesInfo: AxisInfo[];

  constructor() {
  }

  ngOnInit() {
    if (!this.config) {
      this.config = {rev: 1, type: null, axes: {}, chartOptions: {}};
    }
  }

  updateConfig(config: ChartConfig) {
    console.log('update ChartConfig', config);
    this.config = {...config};
    this.configChange.next(this.config);
  }

  updateChartType(type: ChartType) {
    if (type !== this.config.type && type) {
      console.log('updateChartType', type);
      const configurer = this.chartTypes.find(c => c.type === type);
      const config: ChartConfig = {
        ...this.config, type: type,
        axes: configurer.getDefaultAxes(),
        chartOptions: configurer.getDefaultOptions()
      };
      this.config = config;
      this.configChange.next(config);

      this.axesInfo = configurer.getAxesInfo();
    }

  }

  updateAxis(id: string, axis: AxisConfig) {
    this.config.axes[id] = axis;
  }

}
