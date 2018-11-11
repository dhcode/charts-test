import { ColumnConfig } from './chart-config';

export type ChartType = 'timeseries' | 'line' | 'gauge' | 'spline' | 'step' | 'bar' | 'scatter' | 'pie' | 'donut';

export interface ChartTypeOptions {
  [key: string]: any;
}

export interface ChartTypeConfigurer {
  /**
   * Identifier of the chart type
   */
  type: ChartType;
  /**
   * Label which is displayed for the user when selecting the chart type
   */
  label: string;

  /**
   * Whether the columns fulfill the requirements to use this chart type
   */
  isAvailable(columns: ColumnConfig[]): boolean;

  /**
   * Generate the default options for this chart type
   */
  getDefaultOptions(columns: ColumnConfig[]): ChartTypeOptions;

  /**
   * Create the config for the chart library
   */
  createConfig(columns: ColumnConfig[], options: ChartTypeOptions): any;

  /**
   * Creates the data to load in the chart
   */
  createDataConfig(columns: ColumnConfig[], options: ChartTypeOptions, data: any[]): any;
}


