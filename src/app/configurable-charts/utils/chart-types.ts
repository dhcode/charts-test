import { ChartConfiguration } from 'c3';
import { ColumnConfig, outputFormatters } from './chart-config';
import { ChartDataFormatter } from './chart-data-formatter';

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
   * Create the config for c3
   */
  createConfig(columns: ColumnConfig[], options: ChartTypeOptions): ChartConfiguration;

  /**
   * Creates the data to load in the chart
   */
  createDataConfig(columns: ColumnConfig[], options: ChartTypeOptions, data: any[]): any;
}


export class TimeseriesChartTypeConfigurer implements ChartTypeConfigurer {
  type: ChartType = 'timeseries';
  label = 'Time series';

  isAvailable(columns: ColumnConfig[]): boolean {
    const xCol = columns.find(col => col.axis === 'x' && col.format === 'datetime');
    const yCols = columns.filter(col => col.axis === 'y' && ['number', 'boolean'].includes(col.format));
    return xCol && yCols.length > 0;
  }

  getDefaultOptions(columns: ColumnConfig[]): ChartTypeOptions {
    return {
      yAxisLabel: '',
      y2AxisLabel: ''
    };
  }

  createConfig(columns: ColumnConfig[], options: ChartTypeOptions): ChartConfiguration {
    const xCol = columns.find(col => col.axis === 'x');
    const yCols = columns.filter(col => col.axis === 'y' && ['number', 'boolean'].includes(col.format));
    const y2Cols = columns.filter(col => col.axis === 'y2' && ['number', 'boolean'].includes(col.format));
    const colsInfo = this.getDataColsInfo(columns);

    const axes = {};
    colsInfo.filter(c => c.col.axis !== 'x').forEach(c => axes[c.name] = c.col.axis);
    const dataCols = colsInfo.map(c => c.name);

    const axis = {
      x: {
        type: 'timeseries',
        label: xCol.label
      },
      y: {
        label: options.yAxisLabel
      }
    };
    if (y2Cols.length) {
      axis['y2'] = {label: options.y2AxisLabel};
    }

    return {
      data: {
        x: 'x',
        xFormat: '%Y-%m-%dT%H:%M:%SZ',
        rows: [dataCols],
        axes: axes
      },
      axis: axis
    };
  }

  createDataConfig(columns: ColumnConfig[], options: ChartTypeOptions, data: any[]): any {
    const dataCfg = {
      rows: []
    };
    if (data && data.length) {
      const colsInfo = this.getDataColsInfo(columns, true);
      const dataCols = colsInfo.map(c => c.name);
      dataCfg.rows.push(dataCols);
      for (const d of data) {
        dataCfg.rows.push(colsInfo.map(c => {
          const value = getValueByPath(d, c.col.path.split('.'));
          return c.formatter.toInternalValue(value, c.col.formatOptions);
        }));
      }
    }

    return dataCfg;
  }

  private getDataColsInfo(columns: ColumnConfig[], withFormatter = false) {
    const xCol = columns.find(col => col.axis === 'x');
    const yCols = columns.filter(col => col.axis === 'y' && ['number', 'boolean'].includes(col.format));
    const y2Cols = columns.filter(col => col.axis === 'y2' && ['number', 'boolean'].includes(col.format));

    return [
      {name: 'x', col: xCol, formatter: withFormatter && getFormatter(xCol)},
      ...yCols.map((c, i) => ({name: 'y1_' + i, col: c, formatter: withFormatter && getFormatter(c)})),
      ...y2Cols.map((c, i) => ({name: 'y2_' + i, col: c, formatter: withFormatter && getFormatter(c)}))
    ];
  }


}

export const chartTypeConfigurers = [
  new TimeseriesChartTypeConfigurer()
];

export function getAvailableChartTypes(columns: ColumnConfig[]): ChartTypeConfigurer[] {
  return chartTypeConfigurers.filter(c => c.isAvailable(columns));
}

export function getChartTypeConfigurer(type: ChartType): ChartTypeConfigurer {
  return chartTypeConfigurers.find(c => c.type === type);
}

function getFormatter(column: ColumnConfig): ChartDataFormatter {
  return outputFormatters.find(f => f.format === column.format);
}

function getValueByPath(data: any, path: string[]) {
  if (!path.length) {
    return data;
  }
  const key = path[0];
  if (data && data.hasOwnProperty(key)) {
    return getValueByPath(data[key], path.slice(1));
  }
  return undefined;
}
