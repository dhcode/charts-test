import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  ColumnConfig} from '../../lib/models/chart-config';
import { PathInfo, PathType } from '../../lib/models/path-info';
import { getPrimaryDataType, outputFormatters } from '../../lib/chart-data-formatters';
import { MatDialog } from '@angular/material';
import { FormatOptionsDialogComponent } from '../format-options-dialog/format-options-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Overlay, RepositionScrollStrategy } from '@angular/cdk/overlay';
import { ChartDataFormatter, OutputFormat } from '../../lib/models/data-formatter';
import { getBestFormatByTypes, getDefaultFormatOptions, getFormattersByTypes } from '../../lib/chart-config-utils';

// 'string' | 'number' | 'boolean' | 'null' | 'array' | 'object' | 'bigint' | 'function' | 'symbol'
export interface PathTypeInfo {
  type: PathType;
  label: string;
}

const pathTypes: PathTypeInfo[] = [
  {type: 'string', label: 'String'},
  {type: 'number', label: 'Number'},
  {type: 'boolean', label: 'Boolean'},
  {type: 'null', label: 'Null'},
  {type: 'array', label: 'Array'},
  {type: 'object', label: 'Object'},
  {type: 'bigint', label: 'Bigint'},
  {type: 'function', label: 'Function'},
  {type: 'symbol', label: 'Symbol'}
];

@Component({
  selector: 'app-column-setting',
  templateUrl: './column-setting.component.html',
  styleUrls: ['./column-setting.component.scss']
})
export class ColumnSettingComponent implements OnDestroy, OnChanges {

  @Input() pathInfo: PathInfo;

  @Output() columnChange = new EventEmitter<ColumnConfig>();

  @Output() remove = new EventEmitter<any>();

  _column: ColumnConfig;

  formatters: ChartDataFormatter[] = [];

  pathTypes: PathTypeInfo[] = [];

  example = '';

  private close = new Subject();

  constructor(private dialog: MatDialog) {
  }

  @Input() set column(column: ColumnConfig) {
    this._column = {...column} as ColumnConfig;
  }

  ngOnDestroy(): void {
    this.close.next();
    this.close.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pathInfo && this._column) {
      this.updateSelections();
      this.updateExample();
    } else {
      this.formatters = [];
      this.pathTypes = [];
    }
  }

  updateSelections() {
    this.pathTypes = this.pathInfo.types.map(type => pathTypes.find(p => p.type === type));
    if (this._column && !this.pathTypes.find(p => p.type === this._column.type)) {
      this.pathTypes.unshift(pathTypes.find(p => p.type === this._column.type));
    }

    this.formatters = getFormattersByTypes(this._column.type, this.pathInfo.values);
    if (this._column && !this.formatters.find(f => f.format === this._column.format)) {
      this.formatters.unshift(outputFormatters.find(f => f.format === this._column.format));
    }
  }

  updateType(type: PathType) {
    if (this._column.type !== type) {
      this._column.format = getBestFormatByTypes({path: this.pathInfo.path, types: [type], values: this.pathInfo.values});
      this._column.formatOptions = getDefaultFormatOptions(this._column.format, this.pathInfo.values);
    }
    this._column.type = type;
    this.updateSelections();
    this.updateExample();
    this.notifyChange();
  }

  updateFormat(format: OutputFormat) {
    if (this._column.format !== format) {
      this._column.formatOptions = getDefaultFormatOptions(format, this.pathInfo.values);
    }
    this._column.format = format;

    this.updateExample();
    this.notifyChange();
  }

  updateExample() {
    const values = this.pathInfo.values.filter(v => v !== null);
    const value = values.length ? values[0] : null;
    const formatter: ChartDataFormatter = this.formatters.find(f => f.format === this._column.format);
    this.example = formatter.toOutputValue(formatter.toInternalValue(value, this._column.formatOptions), this._column.formatOptions);
  }

  openSettings() {
    const dialogRef = this.dialog.open(FormatOptionsDialogComponent, {
      data: this._column,
      minWidth: 300
    });
    dialogRef.afterClosed().pipe(takeUntil(this.close)).subscribe(formatOptions => {
      if (formatOptions) {
        this._column.formatOptions = formatOptions;
        this.updateExample();
        this.notifyChange();
      }
    });
  }

  notifyChange() {
    this.columnChange.next(this._column);
  }


}
