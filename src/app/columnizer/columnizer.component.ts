import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChartConfig, ColumnConfig, getDefaultFormatOptions, getBestFormatByTypes } from '../utils/chart-config';
import { identifyPathsInArray, PathInfo } from '../utils/path-info';
import { getPrimaryDataType } from '../utils/chart-data-formatter';

interface ColumnWithPathInfo {
  column: ColumnConfig;
  pathInfo: PathInfo;
}

@Component({
  selector: 'app-columnizer',
  templateUrl: './columnizer.component.html',
  styleUrls: ['./columnizer.component.scss']
})
export class ColumnizerComponent implements OnInit, OnChanges {

  @Input() source: Observable<any[]>;

  @Input() config: ChartConfig;

  @Output() configChange = new EventEmitter<ChartConfig>();

  private subscription: Subscription;

  private data: any[];

  paths: PathInfo[];

  columns: ColumnWithPathInfo[] = [];

  constructor() {
  }

  ngOnInit() {
    if (!this.config) {
      this.config = {rev: 1, columns: [], type: null};
      this.loadColumns();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && changes.config.currentValue) {
      this.loadConfig(changes.config.currentValue);
    }
    if (changes.source && changes.source.currentValue) {
      this.loadSource(changes.source.currentValue);
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

  loadSource(source: Observable<any[]>) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = source.subscribe(result => {
      this.data = result;
      this.paths = identifyPathsInArray(result);
      this.loadColumns();
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
