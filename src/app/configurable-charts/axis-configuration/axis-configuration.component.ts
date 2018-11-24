import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AxisConfig, TraceConfig} from '../lib/models/chart-config';
import {AxisInfo} from '../lib/models/chart-types';
import {ChartDataFormatter, OutputFormat} from '../lib/models/data-formatter';
import {getDefaultFormatOptions} from '../lib/chart-config-utils';
import {getFormatter, outputFormatters} from '../lib/chart-data-formatters';
import {PathInfo} from '../lib/models/path-info';
import {FormatOptionsDialogComponent} from './format-options-dialog/format-options-dialog.component';
import {MatDialog} from '@angular/material';
import {TraceOptionsDialogComponent} from './trace-options-dialog/trace-options-dialog.component';

@Component({
  selector: 'app-axis-configuration',
  templateUrl: './axis-configuration.component.html',
  styleUrls: ['./axis-configuration.component.scss']
})
export class AxisConfigurationComponent implements OnInit {

  @Input() paths: PathInfo[];

  @Input() axisInfo: AxisInfo;

  @Output() axisChange = new EventEmitter<AxisConfig>();

  _axis: AxisConfig;

  formatters: ChartDataFormatter[];

  private formatter: ChartDataFormatter;

  canAddTraces = false;

  incomplete = true;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  @Input() set axis(axis: AxisConfig) {
    this._axis = axis;
    this.updateSelection();
  }

  updateFormat(format: OutputFormat) {
    if (this._axis.format !== format) {
      this._axis.formatOptions = getDefaultFormatOptions(format, []);
    }
    this._axis.format = format;

    this.notifyChange();
  }


  openSettings() {
    const dialogRef = this.dialog.open(FormatOptionsDialogComponent, {
      data: this._axis,
      minWidth: 300
    });
    dialogRef.afterClosed().subscribe(formatOptions => {
      if (formatOptions) {
        this._axis.formatOptions = formatOptions;
        this.notifyChange();
      }
    });
  }

  updateSelection() {
    if (this.axisInfo) {
      this.canAddTraces = this._axis.traces.length < this.axisInfo.maxTraces;
      this.formatters = outputFormatters.filter(f => this.axisInfo.allowedFormats.includes(f.format));
      this.incomplete = this.axisInfo.required && this._axis.traces.length === 0;
    }
    this.formatter = getFormatter(this._axis);
  }

  addTraceByPath(pathInfo: PathInfo) {
    const trace: TraceConfig = {
      path: pathInfo.path,
      label: pathInfo.path.split('.').slice(-1)[0],
      options: {}
    };
    this._axis.traces.push(trace);
    this.notifyChange();
  }

  removeTrace(trace: TraceConfig) {
    this._axis.traces.splice(this._axis.traces.indexOf(trace), 1);
    this.notifyChange();
  }

  openTraceOptions(trace: TraceConfig) {
    const dialogRef = this.dialog.open(TraceOptionsDialogComponent, {
      data: {
        optionsDef: this.axisInfo.traceOptionsDef,
        options: trace.options,
        label: trace.label
      },
      minWidth: 300
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        trace.label = result.label;
        trace.options = result.options;
        this.notifyChange();
      }
    });
  }

  notifyChange() {
    this.updateSelection();
    this.axisChange.next(this._axis);
  }

  isUsablePath(pathInfo: PathInfo): boolean {
    return pathInfo.types.some(type => this.formatter.getInputTypePriority(type, pathInfo.values) !== null);
  }

}
