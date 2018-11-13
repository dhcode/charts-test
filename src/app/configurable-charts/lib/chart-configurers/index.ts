import { TimeseriesChartTypeConfigurer } from './timeseries-chart-type-configurer';
import { ChartType, ChartTypeConfigurer } from '../models/chart-types';

export * from './timeseries-chart-type-configurer';

export const chartTypeConfigurers = [
  new TimeseriesChartTypeConfigurer()
];

export function getChartTypeConfigurer(type: ChartType): ChartTypeConfigurer {
  return chartTypeConfigurers.find(c => c.type === type);
}
