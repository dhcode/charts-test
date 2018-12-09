import { Injectable } from '@angular/core';
import { DynChartService } from '../dyn-chart.service';
import { combineLatest, from, merge, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfigurationContext, DynChartConfig, RenderContext } from '../../lib/dyn-chart-config';
import { getValueByPath } from '../../../configurable-charts/lib/chart-type-utils';

export interface PlotlyConfigChange {
  type: 'react' | 'update' | 'extend' | 'purge' | 'error';
  data?: any;
  layout?: any;
  indices?: number[];
  error?: string;
}

@Injectable()
export class DynChartPlotlyBasicService {

  constructor(private chartService: DynChartService) {
  }

  getPlotlyConfig(): Observable<PlotlyConfigChange> {
    let currentConfig = null;
    let currentData: any[] = null;

    return combineLatest(this.chartService.config, this.chartService.data).pipe(
      switchMap(([config, data]) => {
        const events = [];
        if (config !== currentConfig) {
          currentConfig = config;
          events.push(this.buildChartConfig(config));
          if (currentData && data === currentData) {
            events.push(this.buildChartData(config, currentData, true));
          }
        }
        if (data !== currentData) {
          currentData = data;
          events.push(this.buildChartData(config, data, true));
        }
        return merge(from(events), this.chartService.dataAdded.pipe(
          map(addedData => this.buildChartData(config, addedData, false))
        ));
      })
    );
  }

  private buildChartConfig(config: DynChartConfig): PlotlyConfigChange {
    if (!config) {
      return null;
    }
    const ctx: ConfigurationContext = {
      locale: 'en'
    };
    try {
      const plotlyConfig = config.toConfig(ctx);
      return {
        type: 'react',
        data: plotlyConfig.data,
        layout: plotlyConfig.layout
      };
    } catch (e) {
      return {
        type: 'error',
        error: 'Failed to build chart data: ' + e.toString()
      };
    }
  }

  private buildChartData(config: DynChartConfig, data: any[], reset = false): PlotlyConfigChange {
    const dataConfig = {
      x: [],
      y: [],
      text: []
    };
    const indices = [];

    const ctx: RenderContext = {
      locale: 'en',
      resolveValue(entry: any, dataPath: string): any {
        return getValueByPath(entry, dataPath.split('.'));
      }
    };

    try {
      const keys = Object.keys(dataConfig);
      config.traces.forEach((trace, i) => {
        const dataCfg = trace.toDataConfig(data, ctx);
        indices.push(i);
        for (const key of keys) {
          if (dataCfg[key]) {
            dataConfig[key].push(dataCfg[key]);
          } else {
            dataConfig[key].push([]);
          }
        }
      });
      return {
        type: reset ? 'update' : 'extend',
        data: dataConfig,
        indices: indices
      };
    } catch (e) {
      return {
        type: 'error',
        error: 'Failed to build chart data: ' + e.toString()
      };
    }

  }


}
