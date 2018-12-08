import { ConfigurationContext, DynChartConfig, DynChartType, DynTraceConfig } from './dyn-chart-config';
import { assignWithDefaults } from './utils';

export class DynChartConfigPlotly extends DynChartConfig {

  type: DynChartType = 'plotly-basic';

  xAxis = {
    tickformat: ',.2f',
    title: ''
  };

  yAxis = {
    tickformat: ',.2f',
    title: ''
  };

  constructor(props: any) {
    super(props);
    assignWithDefaults(this, props, {
      xAxis: source => source.map(s => assignWithDefaults(this.xAxis, s)),
      yAxis: source => source.map(s => assignWithDefaults(this.yAxis, s))
    });
  }

  toConfig(ctx: ConfigurationContext): any {
    const layout = {
      height: this.height,
      xAxis: this.xAxis,
      yAxis: this.yAxis
    };
    return {
      layout: layout,
      data: []
    };
  }
}
