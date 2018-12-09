import { ConfigurationContext, DynChartConfig, DynChartType, DynTraceConfig } from './dyn-chart-config';
import { assignWithDefaults } from './utils';

export class DynChartConfigPlotly extends DynChartConfig {

  type: DynChartType = 'plotly-basic';

  xAxis = {
    tickformat: '',
    title: ''
  };

  yAxis = {
    tickformat: '',
    title: ''
  };

  constructor(props: any) {
    super(props);
    assignWithDefaults(this, props, {
      xAxis: source => assignWithDefaults(this.xAxis, source),
      yAxis: source => assignWithDefaults(this.yAxis, source)
    });
  }

  toConfig(ctx: ConfigurationContext): any {
    const layout = {
      height: this.height,
      xaxis: this.xAxis,
      yaxis: this.yAxis
    };
    const data = [];
    for (const trace of this.traces) {
      data.push(trace.toInitialConfig(ctx));
    }
    return {
      layout: layout,
      data: data
    };
  }
}
