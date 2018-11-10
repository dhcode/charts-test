import { PathType } from './path-info';
import { ChartType, ChartTypeOptions } from './chart-types';
import { OutputFormat, OutputFormatOptions } from './data-formatter';

export interface ChartConfig {
  /**
   * Revision number of the configuration format
   */
  rev: number;
  /**
   * If null, no chart type has been set yet
   */
  type: ChartType | null;
  columns: ColumnConfig[];

  /**
   * Chart type specific configuration options
   */
  chartOptions: ChartTypeOptions;
}

export interface ColumnConfig {
  label: string;
  /**
   * Whether the column should be used in the chart
   */
  active: boolean;
  /**
   * Source type
   */
  type: PathType;
  path: string;
  format: OutputFormat;
  formatOptions: OutputFormatOptions;
  /**
   * if this should not be rendered as default chart type
   */
  chartType?: ChartType;
  axis: 'x' | 'y' | 'y2';
  color?: string;
}

