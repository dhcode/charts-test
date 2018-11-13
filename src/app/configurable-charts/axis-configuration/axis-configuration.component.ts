import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AxisConfig } from '../lib/models/chart-config';
import { AxisInfo } from '../lib/models/chart-types';
import { ChartDataFormatter, OutputFormat } from '../lib/models/data-formatter';
import { getDefaultFormatOptions } from '../lib/chart-config-utils';
import { outputFormatters } from '../lib/chart-data-formatters';
import { PathInfo } from '../lib/models/path-info';
import { FormatOptionsDialogComponent } from './format-options-dialog/format-options-dialog.component';
import { MatDialog } from '@angular/material';

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

  formatters: ChartDataFormatter[] = outputFormatters;

  example: string;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  @Input() set axis(axis: AxisConfig) {
    this._axis = axis;
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

  notifyChange() {
    this.axisChange.next(this._axis);
  }

}
