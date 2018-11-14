import { AxesConfig, AxisConfig } from './chart-config';
import { OutputFormat } from './data-formatter';

export type ChartType = 'timeseries' | 'line' | 'gauge' | 'spline' | 'step' | 'bar' | 'scatter' | 'pie' | 'donut';
export type ChartOptionType = 'int' | 'string' | 'decimal' | 'boolean';

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
   * Information about the available axes
   */
  getAxesInfo(): AxisInfo[];

  /**
   * Generate the default axes configuration
   */
  getDefaultAxes(): AxesConfig;

  /**
   * Generate the default options for this chart type
   */
  getDefaultOptions(): ChartTypeOptions;

  /**
   * Create the config for the chart library
   */
  createConfig(axes: AxesConfig, options: ChartTypeOptions): any;

  /**
   * Creates the data to load in the chart
   */
  createDataConfig(axes: AxesConfig, options: ChartTypeOptions, data: any[]): any;
}

export interface AxisInfo {
  id: string;
  label: string;
  required: boolean;
  maxTraces: number;
  allowedFormats: OutputFormat[];
  options: ChartOption[];
}

export interface ChartOption {
  name: string;
  label: string;
  type: ChartOptionType;
  selectionValues: any[];
  defaultValue: any;
}
