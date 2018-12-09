import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScatterTraceConfig } from '../../lib/trace-config-types/scatter-trace-config';
import { PathInfo } from '../../../configurable-charts/lib/models/path-info';

@Component({
  selector: 'app-scatter-trace-configurer',
  templateUrl: './scatter-trace-configurer.component.html',
  styleUrls: ['./scatter-trace-configurer.component.scss']
})
export class ScatterTraceConfigurerComponent implements OnInit {


  @Input() paths: PathInfo[];

  @Output() traceChange = new EventEmitter<ScatterTraceConfig>();

  _trace: ScatterTraceConfig;

  constructor() {
  }

  @Input() set trace(trace: ScatterTraceConfig) {
    this._trace = new ScatterTraceConfig(trace);
  }

  ngOnInit() {
  }

  notifyChange() {
    this.traceChange.next(this._trace);
  }

}
