import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ChartConfig, ColumnConfig} from '../lib/models/chart-config';
import { PathInfo } from '../lib/models/path-info';
import { getPrimaryDataType } from '../lib/chart-data-formatters';
import { identifyPathsInArray } from '../lib/path-utils';
import { getBestFormatByTypes, getDefaultFormatOptions } from '../lib/chart-config-utils';

interface ColumnWithPathInfo {
  column: ColumnConfig;
  pathInfo: PathInfo;
}

@Component({
  selector: 'app-columnizer',
  templateUrl: './columnizer.component.html',
  styleUrls: ['./columnizer.component.scss']
})
export class ColumnizerComponent implements OnChanges {

  @Input() data: any[];

  @Input() config: ChartConfig;

  @Output() configChange = new EventEmitter<ChartConfig>();

  paths: PathInfo[];

  columns: ColumnWithPathInfo[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && changes.config.currentValue) {
      this.loadConfig(changes.config.currentValue);
    }
    if (changes.data && changes.data.currentValue) {
      this.paths = identifyPathsInArray(changes.data.currentValue);
      this.loadColumns();
    }
  }

  loadConfig(config: ChartConfig) {
    this.config = config;
    this.loadColumns();
  }

  loadColumns() {
    if (!this.paths || !this.config) {
      this.columns = [];
      return;
    }
    this.columns = this.config.columns.map(column => {
      const pathInfo = this.paths.find(p => p.path === column.path);
      return {column: column, pathInfo: pathInfo};
    });
  }

  addColumn(pathInfo: PathInfo) {
    const format = getBestFormatByTypes(pathInfo);
    const col: ColumnConfig = {
      path: pathInfo.path,
      type: getPrimaryDataType(pathInfo),
      format: format,
      formatOptions: getDefaultFormatOptions(format, pathInfo.values),
      active: true,
      axis: 'y',
      label: pathInfo.path.split('.').slice(-1).join()
    };
    if (!this.config.columns.length) {
      col.axis = 'x';
    }

    this.config.columns.push(col);
    this.loadColumns();
    this.notifyChange();
  }

  removeColumn(col: ColumnConfig) {
    this.config.columns.splice(this.config.columns.indexOf(col), 1);
    this.loadColumns();
    this.notifyChange();
  }

  updateColumn(col: ColumnConfig, newCol: ColumnConfig) {
    this.config.columns.splice(this.config.columns.indexOf(col), 1, newCol);
    const colInfo = this.columns.find(c => c.column === col);
    colInfo.column = newCol;
    this.notifyChange();
  }

  notifyChange() {
    this.configChange.next(this.config);
  }

}
