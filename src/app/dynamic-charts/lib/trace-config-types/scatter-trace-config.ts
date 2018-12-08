import { ConfigurationContext, RenderContext } from '../dyn-chart-config';
import { PlotlyTraceConfig } from './plotly-trace-config';
import { assignNotNull, assignWithDefaults } from '../utils';

export type TraceMode = 'markers' | 'markers+lines' | 'lines';

export class ScatterTraceConfig extends PlotlyTraceConfig {

  type = 'scatter';

  xAxis = 'x';

  yAxis = 'y';

  mode: TraceMode = 'lines';

  /**
   * Path from which the x value is resolved
   */
  xDataPath = '';

  /**
   * Path from which the y value is resolved
   */
  yDataPath = '';

  /**
   * Optional Path from which the text value is resolved
   */
  textDataPath = '';

  line = {
    color: null,
    width: 2,
    shape: 'linear',
    smoothing: 1,
    dash: 'solid'
  };

  connectGaps = false;


  constructor(props: any) {
    super(props);
    assignWithDefaults(this, props, {
      line: source => assignWithDefaults(this.line, source)
    });
  }

  toInitialConfig(ctx: ConfigurationContext): any {
    const chartTrace = {
      ...super.toInitialConfig(ctx),
      mode: this.mode,
      x: [],
      y: [],
      line: {},
      connectgaps: this.connectGaps,
      xaxis: this.xAxis,
      yaxis: this.yAxis
    };
    if (this.textDataPath) {
      chartTrace.text = [];
    }
    assignNotNull(chartTrace.line, this.line);
    return chartTrace;
  }

  toDataConfig(data: any[], ctx: RenderContext): any {
    const result = {
      x: [],
      y: []
    };
    for (let i = 0; i < data.length; i++) {
      const entry = data[i];
      result.x.push(ctx.resolveValue(entry, this.xDataPath));
      result.y.push(ctx.resolveValue(entry, this.yDataPath));
    }
    return result;
  }

}

PlotlyTraceConfig.registerTraceConfigType('scatter', ScatterTraceConfig);
