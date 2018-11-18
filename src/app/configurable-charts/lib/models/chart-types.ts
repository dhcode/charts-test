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
  /**
   * Name of the axis, which is part of a Chart Type
   */
  id: string;
  /**
   * Display name of the axis
   */
  label: string;
  /**
   * Whether the axis is required
   */
  required: boolean;
  /**
   * How many traces it should have as maximum
   */
  maxTraces: number;
  /**
   * The allowed formats for the axis
   */
  allowedFormats: OutputFormat[];
  /**
   * The options the user can choose for the axis
   */
  options: ChartOption[];
}

export interface ChartOption {
  /**
   * Technical name of the option
   */
  name: string;
  /**
   * Label that describes the option
   */
  label: string;
  /**
   * Hint that describes more details
   */
  hint?: string;
  /**
   * The type decided how the options input is presented
   */
  type: ChartOptionType;
  /**
   * If there are only some values to select from
   */
  selectionValues?: any[];
  /**
   * The default value
   */
  defaultValue: any;
}
