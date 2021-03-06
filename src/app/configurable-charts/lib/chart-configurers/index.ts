import { TimeseriesChartTypeConfigurer } from './timeseries-chart-type-configurer';
import { ChartType, ChartTypeConfigurer } from '../models/chart-types';
import { BarChartTypeConfigurer } from './bar-chart-type-configurer';
import { ScatterChartTypeConfigurer } from './scatter-chart-type-configurer';

export * from './timeseries-chart-type-configurer';
export * from './bar-chart-type-configurer';

export const chartTypeConfigurers = [
  new TimeseriesChartTypeConfigurer(),
  new BarChartTypeConfigurer(),
  new ScatterChartTypeConfigurer()
];

export function getChartTypeConfigurer(type: ChartType): ChartTypeConfigurer {
  return chartTypeConfigurers.find(c => c.type === type);
}
