import { getValueByPath } from '../chart-type-utils';
import { AxisInfo, ChartType, ChartTypeConfigurer } from '../models/chart-types';
import { getFormatter } from '../chart-data-formatters';
import { AxesConfig, AxisConfig, TraceConfig } from '../models/chart-config';
import { colorOpt, createDefaultOptions, stringOpt } from '../chart-option-utils';
import { ChartOption, ChartOptionValues, SelectionValue } from '../models/chart-options';
import { getDefaultFormatOptions } from '../chart-config-utils';

const modes: SelectionValue[] = [
  {value: 'lines', label: 'Lines'},
  {value: 'lines+markers', label: 'Lines + Markers'},
  {value: 'lines+markers+text', label: 'Lines + Markers + Text'},
  {value: 'markers', label: 'Markers'},
  {value: 'markers+text', label: 'Markers + Text'}
];

const modesWithDefault: SelectionValue[] = [
  {value: null, label: 'Default'},
  ...modes
];

const dataTraceOptions: ChartOption[] = [
  colorOpt('color', 'Color', null),
  stringOpt('mode', 'Display mode', null, modesWithDefault)
];


const axesInfo: AxisInfo[] = [
  {
    id: 'x',
    label: 'X - Axis',
    required: true,
    maxTraces: 1,
    allowedFormats: ['datetime'],
  },
  {
    id: 'y',
    label: 'Y - Axis',
    required: true,
    maxTraces: 10,
    allowedFormats: ['number', 'boolean'],
    traceOptionsDef: dataTraceOptions
  },
  {
    id: 'y2',
    label: 'Y2 - Axis',
    required: false,
    maxTraces: 10,
    allowedFormats: ['number', 'boolean'],
    traceOptionsDef: dataTraceOptions
  }
];


export class TimeseriesChartTypeConfigurer implements ChartTypeConfigurer {
  type: ChartType = 'timeseries';
  label = 'Time series';

  optionsDef: ChartOption[] = [
    stringOpt('mode', 'Display mode', 'lines', modes)
  ];

  getAxesInfo(): AxisInfo[] {
    return axesInfo;
  }

  getDefaultAxes(): AxesConfig {
    const xAxis: AxisConfig = {
      traces: [],
      label: '',
      format: 'datetime',
      formatOptions: getDefaultFormatOptions('datetime', [])
    };
    const yAxis: AxisConfig = {
      traces: [],
      label: '',
      format: 'number',
      formatOptions: getDefaultFormatOptions('number', [])
    };
    const y2Axis: AxisConfig = {
      traces: [],
      label: '',
      format: 'number',
      formatOptions: getDefaultFormatOptions('number', [])
    };
    return {
      x: xAxis,
      y: yAxis,
      y2: y2Axis
    };
  }

  getDefaultOptions(): ChartOptionValues {
    return createDefaultOptions(this.optionsDef);
  }

  createConfig(axes: AxesConfig, options: ChartOptionValues): any {
    const xAxis: AxisConfig = axes.x;
    const yAxis: AxisConfig = axes.y;
    const y2Axis: AxisConfig = axes.y2;

    if (!xAxis.traces.length) {
      throw new Error('Missing traces for ' + axesInfo[0].label);
    }
    if (!yAxis.traces.length) {
      throw new Error('Missing traces for ' + axesInfo[1].label);
    }


    const layout = {
      xaxis: {
        title: xAxis.label,
        ...getFormatter(xAxis).getOutputTickOptions(xAxis.formatOptions),
      },
      yaxis: {
        ...getFormatter(yAxis).getOutputTickOptions(yAxis.formatOptions),
        title: yAxis.label,
        fixedrange: true
      },
    };

    if (y2Axis.traces.length) {
      layout['yaxis2'] = {
        ...getFormatter(y2Axis).getOutputTickOptions(y2Axis.formatOptions),
        title: y2Axis.label,
        side: 'right',
        overlaying: 'y',
        fixedrange: true
      };
    }

    const data = [
      ...this.getTraces('y', yAxis, options),
      ...this.getTraces('y2', y2Axis, options)
    ];

    return {
      data: data,
      layout: layout
    };
  }

  private getTraces(axisId: string, axis: AxisConfig, options: ChartOptionValues): any[] {
    return axis.traces.map(trace => {
      const chartTrace = {
        x: [],
        y: [],
        name: trace.label,
        type: trace.type || 'scatter',
        mode: trace.options.mode || options.mode,
        yaxis: axisId,
        line: {}
      };
      if (axis.format === 'boolean') {
        chartTrace.line['shape']  = 'hv';
      }
      if (trace.options.color) {
        chartTrace.line['color'] = trace.options.color;
      }
      return chartTrace;
    });
  }

  createDataConfig(axes: AxesConfig, options: ChartOptionValues, sourceData: any[]): any {
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
