import { ColumnConfig } from '../models/chart-config';
import { getValueByPath } from '../chart-type-utils';
import { ChartType, ChartTypeConfigurer, ChartTypeOptions } from '../models/chart-types';
import { getFormatter } from '../chart-data-formatters';

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

  createConfig(columns: ColumnConfig[], options: ChartTypeOptions): any {
    const xCol = columns.find(col => col.axis === 'x');
    const xFormatter = getFormatter(xCol);
    const yCols = this.getDataColsInfo(columns, true);

    const firstYCol = yCols.find(ci => ci.col.axis === 'y');
    const firstY2Col = yCols.find(ci => ci.col.axis === 'y2');

    if (!firstYCol) {
      throw new Error('Missing columns for Y - Axis');
    }


    const layout = {
      yaxis: {
        ...firstYCol.formatter.getOutputTickOptions(firstYCol.col.formatOptions),
        title: options.yAxisLabel,
      },
      xaxis: {
        title: options.xAxisLabel,
        ...xFormatter.getOutputTickOptions(xCol.formatOptions),
      }
    };

    if (firstY2Col) {
      layout['yaxis2'] = {
        ...firstY2Col.formatter.getOutputTickOptions(firstY2Col.col.formatOptions),
        title: options.y2AxisLabel,
        side: 'right',
        overlaying: 'y'
      };
    }

    const data = [];
    for (const ci of yCols) {
      const line = {
        x: [],
        y: [],
        name: ci.col.label,
        type: 'scatter',
        mode: 'lines+markers',
        yaxis: ci.col.axis
      };
      if (ci.col.format === 'boolean') {
        line['line'] = {shape: 'hv'};
      }
      data.push(line);
    }


    return {
      data: data,
      layout: layout
    };
  }

  createDataConfig(columns: ColumnConfig[], options: ChartTypeOptions, sourceData: any[]): any {
    const indices = [];
    const data = {
      x: [],
      y: []
    };
    if (sourceData && sourceData.length) {
      const yCols = this.getDataColsInfo(columns, true);
      const xCol = columns.find(col => col.axis === 'x');
      const xFormatter = getFormatter(xCol);

      for (const ci of yCols) {
        indices.push(ci.index);
        data.x.push(new Array(sourceData.length));
        data.y.push(new Array(sourceData.length));
      }

      let i = 0;
      for (const d of sourceData) {
        const time = getValueByPath(d, xCol.path.split('.'));
        for (const ci of yCols) {
          const value = getValueByPath(d, ci.col.path.split('.'));
          data.y[ci.index][i] = ci.formatter.toInternalValue(value, ci.col.formatOptions);
          data.x[ci.index][i] = xFormatter.toInternalValue(time, xCol.formatOptions);
        }
        i++;
      }
    }

    return {
      data: data,
      indices: indices
    };
  }

  private getDataColsInfo(columns: ColumnConfig[], withFormatter = false) {
    const yCols = columns.filter(col => (col.axis === 'y' || col.axis === 'y2') && ['number', 'boolean'].includes(col.format));
    return [
      ...yCols.map((c, i) => ({index: i, col: c, formatter: withFormatter && getFormatter(c)}))
    ];
  }


}
