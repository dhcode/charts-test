import { AxisInfo, ChartType, ChartTypeConfigurer } from '../models/chart-types';
import { AxesConfig, AxisConfig, TraceConfig } from '../models/chart-config';
import { getFormatter } from '../chart-data-formatters';
import { getValueByPath } from '../chart-type-utils';
import { OptionDefinition, OptionValues } from '../../../options-configuration/lib/options.model';
import { colorOpt, stringOpt } from '../../../options-configuration/lib/option-utils';
import { getDefaultFormatOptions } from '../chart-config-utils';

const dataTraceOptions: OptionDefinition[] = [
  colorOpt('color', 'Color', null),
];

export class BarChartTypeConfigurer implements ChartTypeConfigurer {
  label = 'Bar';
  type: ChartType = 'bar';

  private axesInfo: AxisInfo[] = [
    {
      id: 'x',
      label: 'Bars',
      required: true,
      maxTraces: 1,
      allowedFormats: ['string'],
      optionsDef: []
    },
    {
      id: 'y',
      label: 'Values',
      required: true,
      maxTraces: 10,
      allowedFormats: ['number'],
      optionsDef: [],
      traceOptionsDef: dataTraceOptions
    }
  ];

  getAxesInfo(): AxisInfo[] {
    return this.axesInfo;
  }

  getDefaultAxes(): AxesConfig {
    const xAxis: AxisConfig = {
      traces: [],
      label: '',
      format: 'string',
      formatOptions: getDefaultFormatOptions('string', [])
    };
    const yAxis: AxisConfig = {
      traces: [],
      label: '',
      format: 'number',
      formatOptions: getDefaultFormatOptions('number', [])
    };
    return {
      x: xAxis,
      y: yAxis,
    };
  }

  getDefaultOptions(): OptionValues {
    return {};
  }

  createConfig(axes: AxesConfig, options: OptionValues): any {
    const xAxis: AxisConfig = axes.x;
    const yAxis: AxisConfig = axes.y;

    if (!xAxis.traces.length) {
      throw new Error('Missing traces for ' + this.axesInfo[0].label);
    }
    if (!yAxis.traces.length) {
      throw new Error('Missing traces for ' + this.axesInfo[1].label);
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


    const data = yAxis.traces.map(trace => {
      const barTrace = {
        x: [],
        y: [],
        name: trace.label,
        type: trace.type || 'bar',
        marker: {}
      };
      if (trace.options.color) {
        barTrace.marker['color'] = trace.options.color;
      }
      return barTrace;
    });

    return {
      data: data,
      layout: layout
    };
  }

  createDataConfig(axes: AxesConfig, options: OptionValues, sourceData: any[]): any {
    const indices = [];
    const data = {
      x: [],
      y: []
    };
    if (sourceData && sourceData.length) {
      const xFormatter = getFormatter(axes.x);
      const xTrace: TraceConfig = axes.x.traces[0];

      let t = 0;
      for (const trace of axes.y.traces) {
        indices.push(t);
        data.y.push(new Array(sourceData.length));
        t++;
      }

      let i = 0;
      const xValues = new Array(sourceData.length);
      for (const d of sourceData) {
        const time = getValueByPath(d, xTrace.path.split('.'));
        xValues[i] = xFormatter.toInternalValue(time, axes.x.formatOptions);
        t = 0;
        const axis = axes.y;
        const formatter = getFormatter(axis);
        for (const trace of axis.traces) {
          const value = getValueByPath(d, trace.path.split('.'));
          data.y[t][i] = formatter.toInternalValue(value, axis.formatOptions);
          t++;
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
