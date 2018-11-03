import { PathInfo, PathType } from './path-info';
import {
  BooleanDataFormatter,
  ChartDataFormatter,
  DatetimeDataFormatter,
  getPrimaryDataType,
  NumberDataFormatter,
  OutputFormat,
  OutputFormatOptions,
  StringDataFormatter
} from './chart-data-formatter';
import { ChartType, ChartTypeOptions } from './chart-types';

export const outputFormatters: ChartDataFormatter[] = [
  new StringDataFormatter(),
  new DatetimeDataFormatter(),
  new NumberDataFormatter(),
  new BooleanDataFormatter()
];

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

interface FormatterWithPriority {
  format: OutputFormat;
  priority: number;
  formatter?: ChartDataFormatter;
}

export function getFormattersByTypes(type: PathType, values: any[]): ChartDataFormatter[] {
  const formatters: FormatterWithPriority[] = [];
  for (const formatter of outputFormatters) {
    const priority = formatter.getInputTypePriority(type, values);
    if (priority !== null) {
      formatters.push({format: formatter.format, priority: priority, formatter: formatter});
    }
  }
  formatters.sort((a, b) => b.priority - a.priority);
  return formatters.map(f => f.formatter);
}

export function getBestFormatByTypes(pathInfo: PathInfo): OutputFormat {
  const best: FormatterWithPriority = {format: 'string', priority: 0};
  for (const formatter of outputFormatters) {
    const priority = formatter.getInputTypePriority(getPrimaryDataType(pathInfo), pathInfo.values);
    if (priority !== null && priority > best.priority) {
      best.format = formatter.format;
      best.priority = priority;
    }
  }
  return best.format;
}

export function getDefaultFormatOptions(format: OutputFormat, values: any[]): OutputFormatOptions {
  return outputFormatters.find(f => f.format === format).getDefaultFormatOptions(values);
}

