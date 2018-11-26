import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AxisConfig, ChartConfig } from '../lib/models/chart-config';
import { AxisInfo, ChartType, ChartTypeConfigurer } from '../lib/models/chart-types';
import { chartTypeConfigurers } from '../lib/chart-configurers';
import { PathInfo } from '../lib/models/path-info';
import { identifyPathsInArray } from '../lib/path-utils';

@Component({
  selector: 'app-chart-configuration',
  templateUrl: './chart-configuration.component.html',
  styleUrls: ['./chart-configuration.component.scss']
})
export class ChartConfigurationComponent implements OnInit, OnChanges {

  @Input() config: ChartConfig;

  @Output() configChange = new EventEmitter<ChartConfig>();

  @Input() data: any[];

  chartTypes: ChartTypeConfigurer[] = chartTypeConfigurers;

  axesInfo: AxisInfo[];

  paths: PathInfo[];

  constructor() {
  }

  ngOnInit() {
    if (!this.config) {
      this.config = {rev: 1, type: null, axes: {}, chartOptions: {}};
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.paths = identifyPathsInArray(changes.data.currentValue);
    }
  }

  updateChartType(type: ChartType) {
    if (type !== this.config.type && type) {
      console.log('updateChartType', type);
      const configurer = this.chartTypes.find(c => c.type === type);
      const config: ChartConfig = {
        ...this.config,
        type: type,
        axes: configurer.getDefaultAxes(),
        chartOptions: configurer.getDefaultOptions()
      };
      this.config = config;
      this.configChange.next(config);

      this.axesInfo = configurer.getAxesInfo();
    }

  }

  updateAxis(id: string, axis: AxisConfig) {
    const config: ChartConfig = {
      ...this.config,
    };
    config.axes[id] = axis;

    this.config = config;
    this.configChange.next(config);

  }

}
