import { ChartType} from './chart-types';
import { OutputFormat, OutputFormatOptions } from './data-formatter';
import { OptionValues } from '../../../options-configuration/lib/options.model';

/**
 * Savable chart configuration
 */
export interface ChartConfig {
  /**
   * Revision number of the configuration format
   */
  rev: number;
  /**
   * If null, no chart type has been set yet
   */
  type: ChartType | null;

  axes: AxesConfig;

  /**
   * Chart type specific configuration options
   */
  chartOptions: OptionValues;
}

export interface AxesConfig {
  [axis: string]: AxisConfig;
}


export interface AxisConfig {
  /**
   * Traces that are displayed on the Axis
   */
  traces: TraceConfig[];
  /**
   * Label to be displayed on the Axis
   */
  label: string;
  /**
   * Format for the tick output
   */
  format: OutputFormat;
  /**
   * Format Options
   */
  formatOptions: OutputFormatOptions;
}

/**
 * A trace is a line in a line chart
 */
export interface TraceConfig {
  /**
   * The path where the value is found in a document
   */
  path: string;
  /**
   * Label of the series
   */
  label: string;
  /**
   * optional different type than the ChartType
   */
  type?: string;

  /**
   * Custom options for the trace
   */
  options: OptionValues;
}
