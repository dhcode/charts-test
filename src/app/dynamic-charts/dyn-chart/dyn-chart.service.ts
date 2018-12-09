import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DynChartConfig } from '../lib/dyn-chart-config';

@Injectable()
export class DynChartService {

  /**
   * Emits every time the config changes
   */
  config = new BehaviorSubject<DynChartConfig>(null);

  /**
   * Emits every time the whole data changes
   */
  data = new BehaviorSubject<any[]>(null);

  /**
   * Emits every time when there are new entries
   */
  dataAdded = new Subject<any[]>();

  constructor() {
  }

  updateConfig(config: DynChartConfig) {
    this.config.next(config);
    console.log('updateConfig', config);
  }

  updateData(data: any[]) {
    this.data.next(data);
  }

  addData(data: any[]) {
    this.dataAdded.next(data);
  }
}
