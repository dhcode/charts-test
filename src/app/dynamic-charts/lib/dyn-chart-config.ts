import { assignWithDefaults } from './utils';

export type DynChartType = 'plotly-basic' | 'map';

export interface DynTraceConfigClass {
  new<T extends DynTraceConfig>(props: any): T;
}

export abstract class DynTraceConfig {

  private static traceConfigsByType: { [type: string]: DynTraceConfigClass } = {};

  type = '';

  visible = true;

  /**
   * Display name of the chart trace
   */
  name = '';


  protected constructor(props: any) {
    assignWithDefaults(this, props);
  }

  static getTraceConfig<T extends DynTraceConfig>(type: string, props: any): T {
    if (type in this.traceConfigsByType) {
      const construct = this.traceConfigsByType[type];
      return new construct(props);
    } else {
      throw new Error(`Trace config for type ${type} not found`);
    }
  }

  static registerTraceConfigType<T extends DynTraceConfig>(type: string, ctor: typeof DynTraceConfig) {
    this.traceConfigsByType[type] = ctor as any as DynTraceConfigClass;
  }

  /**
   * Called when the chart is initialized
   */
  abstract toInitialConfig(ctx: ConfigurationContext): any;

  /**
   * Called when the data for a chart is updated
   */
  abstract toDataConfig(data: any[], ctx: RenderContext): any;

}

export abstract class DynChartConfig {
  /**
   * Revision of the config
   */
  rev = 0;

  type: DynChartType;

  /**
   * Height of the chart area
   */
  height = 400;

  traces: DynTraceConfig[] = [];


  constructor(props: any) {
    assignWithDefaults(this, props, {
      traces: source => source.map(s => DynTraceConfig.getTraceConfig(s.type, s))
    });
  }

  /**
   * Called to get the global chart config
   */
  abstract toConfig(ctx: ConfigurationContext): any;

}


export interface ConfigurationContext {
  locale: string;
}


export interface RenderContext  extends ConfigurationContext {
  resolveValue(entry: any, dataPath: string): any;
}
