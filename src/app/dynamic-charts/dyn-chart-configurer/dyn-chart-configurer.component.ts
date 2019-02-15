import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { DynChartConfig, DynTraceConfig } from '../lib/dyn-chart-config';
import { DynChartConfigPlotly } from '../lib/dyn-chart-config-plotly';
import { PathInfo } from '../../configurable-charts/lib/models/path-info';
import { identifyPathsInArray } from '../../configurable-charts/lib/path-utils';

@Component({
  selector: 'app-dyn-chart-configurer',
  templateUrl: './dyn-chart-configurer.component.html',
  styleUrls: ['./dyn-chart-configurer.component.scss']
})
export class DynChartConfigurerComponent implements OnInit, OnChanges {

  _config: DynChartConfig;

  @Input() data: any[];

  @Output() configChange = new EventEmitter<DynChartConfig>();

  paths: PathInfo[] = [];

  activeTab = 'xAxis';

  constructor() {
  }

  @Input() set config(config: DynChartConfig) {
    this._config = new DynChartConfigPlotly(config);
  }

  ngOnInit() {
    if (!this._config) {
      this._config = new DynChartConfigPlotly({});
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.paths = identifyPathsInArray(changes.data.currentValue);
    }
  }

  addTrace(type: string) {
    const trace = DynTraceConfig.getTraceConfig(type, {});
    this._config.traces.push(trace);
    this.notifyChange();
  }

  removeTrace(trace: DynTraceConfig) {
    this._config.traces.splice(this._config.traces.indexOf(trace), 1);
    this.notifyChange();
  }

  updateTrace(original: DynTraceConfig, newTrace: DynTraceConfig) {
    this._config.traces.splice(this._config.traces.indexOf(original), 1, newTrace);
    this.notifyChange();
  }

  notifyChange() {
    console.log('dyn chart configurer notify', this._config);
    this.configChange.next(this._config);
  }

}
