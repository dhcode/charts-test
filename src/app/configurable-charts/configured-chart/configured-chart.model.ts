import { InjectionToken, Type } from '@angular/core';
import { ChartConfig } from '../lib/models/chart-config';
import { ChartTypeConfigurer } from '../lib/models/chart-types';

export interface ChartComponentBase {
  config: ChartConfig;
  data: any[];
  configurer: ChartTypeConfigurer;
}

export const CHART_COMPONENT = new InjectionToken<Type<ChartComponentBase>>('ChartComponent');
