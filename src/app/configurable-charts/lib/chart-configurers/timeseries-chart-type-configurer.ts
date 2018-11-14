import { getValueByPath } from '../chart-type-utils';
import { AxisInfo, ChartType, ChartTypeConfigurer, ChartTypeOptions } from '../models/chart-types';
import { getFormatter } from '../chart-data-formatters';
import { AxesConfig, AxisConfig, TraceConfig } from '../models/chart-config';

export class TimeseriesChartTypeConfigurer implements ChartTypeConfigurer {
  type: ChartType = 'timeseries';
  label = 'Time series';

  private axesInfo: AxisInfo[] = [
    {
      id: 'x',
      label: 'X - Axis',
      required: true,
      maxTraces: 1,
      allowedFormats: ['datetime'],
      options: []
    },
    {
      id: 'y',
      label: 'Y - Axis',
      required: true,
      maxTraces: 10,
      allowedFormats: ['number', 'boolean'],
      options: []
    },
    {
      id: 'y2',
      label: 'Y2 - Axis',
      required: false,
      maxTraces: 10,
      allowedFormats: ['number', 'boolean'],
      options: []
    }
  ];

  getAxesInfo(): AxisInfo[] {
    return this.axesInfo;
  }

  getDefaultAxes(): AxesConfig {
    const xAxis: AxisConfig = {
      traces: [],
      label: '',
      format: 'datetime',
      formatOptions: {}
    };
    const yAxis: AxisConfig = {
      traces: [],
      label: '',
      format: 'number',
      formatOptions: {}
    };
    const y2Axis: AxisConfig = {
      traces: [],
      label: '',
      format: 'number',
      formatOptions: {}
    };
    return {
      x: xAxis,
      y: yAxis,
      y2: y2Axis
    };
  }

  getDefaultOptions(): ChartTypeOptions {
    return {};
  }

  createConfig(axes: AxesConfig, options: ChartTypeOptions): any {
    const xAxis: AxisConfig = axes.x;
    const yAxis: AxisConfig = axes.y;
    const y2Axis: AxisConfig = axes.y2;

    if (!xAxis.traces.length) {
      throw new Error('Missing traces for X - Axis');
    }
    if (!yAxis.traces.length) {
      throw new Error('Missing traces for Y - Axis');
    }


    const layout = {
      xaxis: {
        title: xAxis.label,
        ...getFormatter(xAxis).getOutputTickOptions(xAxis.formatOptions),
      },
      yaxis: {
        ...getFormatter(yAxis).getOutputTickOptions(yAxis.formatOptions),
        title: yAxis.label,
      },
    };

    if (y2Axis.traces.length) {
      layout['yaxis2'] = {
        ...getFormatter(y2Axis).getOutputTickOptions(y2Axis.formatOptions),
        title: y2Axis.label,
        side: 'right',
        overlaying: 'y'
      };
    }

    const data = [
      ...this.getTraces('y', yAxis),
      ...this.getTraces('y2', y2Axis)
    ];

    return {
      data: data,
      layout: layout
    };
  }

  private getTraces(axisId: string, axis: AxisConfig): any[] {
    return axis.traces.map(trace => {
      const chartTrace = {
        x: [],
        y: [],
        name: trace.label,
        type: trace.type || 'scatter',
        mode: 'lines+markers',
        yaxis: axisId
      };
      if (axis.format === 'boolean') {
        chartTrace['line'] = {shape: 'hv'};
      }
      return chartTrace;
    });
  }

  createDataConfig(axes: AxesConfig, options: ChartTypeOptions, sourceData: any[]): any {
    const indices = [];
    const data = {
      x: [],
      y: []
    };
    if (sourceData && sourceData.length) {
      const xFormatter = getFormatter(axes.x);
      const xTrace: TraceConfig = axes.x.traces[0];

      const axisIds = ['y', 'y2'];
      let t = 0;
      for (const axisId of axisIds) {
        const axis = axes[axisId];
        for (const trace of axis.traces) {
          indices.push(t);
          data.y.push(new Array(sourceData.length));
          t++;
        }
      }

      let i = 0;
      const xValues = new Array(sourceData.length);
      for (const d of sourceData) {
        const time = getValueByPath(d, xTrace.path.split('.'));
        xValues[i] = xFormatter.toInternalValue(time, axes.x.formatOptions);
        t = 0;
        for (const axisId of axisIds) {
          const axis = axes[axisId];
          const formatter = getFormatter(axis);
          for (const trace of axis.traces) {
            const value = getValueByPath(d, trace.path.split('.'));
            data.y[t][i] = formatter.toInternalValue(value, axis.formatOptions);
            t++;
          }
        }
        i++;
      }

      for (t = 0; t < data.y.length; t++) {
        data.x.push(xValues);
      }
    }

    return {
      data: data,
      indices: indices
    };
  }

}
