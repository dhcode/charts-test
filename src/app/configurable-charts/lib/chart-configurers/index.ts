import { TimeseriesChartTypeConfigurer } from './timeseries-chart-type-configurer';
import { ChartType, ChartTypeConfigurer } from '../models/chart-types';
import { ColumnConfig } from '../models/chart-config';

export * from './timeseries-chart-type-configurer';

export const chartTypeConfigurers = [
  new TimeseriesChartTypeConfigurer()
];

export function getAvailableChartTypes(columns: ColumnConfig[]): ChartTypeConfigurer[] {
  return chartTypeConfigurers.filter(c => c.isAvailable(columns));
}

export function getChartTypeConfigurer(type: ChartType): ChartTypeConfigurer {
  return chartTypeConfigurers.find(c => c.type === type);
}
