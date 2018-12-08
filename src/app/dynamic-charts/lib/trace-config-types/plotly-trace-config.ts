import { ConfigurationContext, DynTraceConfig } from '../dyn-chart-config';
import { assignWithDefaults } from '../utils';

export abstract class PlotlyTraceConfig extends DynTraceConfig {

  showLegend = true;

  opacity = 1;

  protected constructor(props: any) {
    super(props);
    assignWithDefaults(this, props);
  }

  toInitialConfig(ctx: ConfigurationContext): any {
    return {
      name: this.name,
      type: this.type,
      showlegend: this.showLegend,
      opacity: this.opacity
    };
  }
}

