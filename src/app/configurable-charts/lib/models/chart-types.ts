import { AxesConfig } from './chart-config';
import { OutputFormat } from './data-formatter';
import { ChartOption, ChartOptionValues } from './chart-options';

export type ChartType = 'timeseries' | 'line' | 'gauge' | 'spline' | 'step' | 'bar' | 'scatter' | 'pie' | 'donut';

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
   * Options definition for the whole chart
   */
  optionsDef?: ChartOption[];

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
  getDefaultOptions(): ChartOptionValues;

  /**
   * Create the config for the chart library
   */
  createConfig(axes: AxesConfig, options: ChartOptionValues): any;

  /**
   * Creates the data to load in the chart
   */
  createDataConfig(axes: AxesConfig, options: ChartOptionValues, data: any[]): any;
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
  optionsDef?: ChartOption[];

  /**
   * Options for each trace
   */
  traceOptionsDef?: ChartOption[];

}

