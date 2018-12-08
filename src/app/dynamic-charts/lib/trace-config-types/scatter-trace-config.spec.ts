import { DynTraceConfig, RenderContext } from '../dyn-chart-config';
import { ScatterTraceConfig } from './scatter-trace-config';

describe('Scatter Trace Config', () => {

  const testData = [
    {time: 0, value: 1},
    {time: 1, value: 2},
  ];

  const renderContext: RenderContext = {
    locale: 'en',
    resolveValue(entry: any, dataPath: string): any {
      return entry[dataPath];
    }
  };

  it('find scatter trace config', () => {
    const traceConfig = DynTraceConfig.getTraceConfig<ScatterTraceConfig>('scatter', {});
    expect(traceConfig).toBeTruthy();
    expect(traceConfig instanceof ScatterTraceConfig).toBeTruthy();
  });

  it('serialize and unserialize config', () => {
    const traceConfig = DynTraceConfig.getTraceConfig<ScatterTraceConfig>('scatter', {
      name: 'test'
    });

    expect(traceConfig.name).toEqual('test');

    const serialized = JSON.stringify(traceConfig);
    const parsed = JSON.parse(serialized);
    console.log('parsed', parsed);

    const parsedConfig = DynTraceConfig.getTraceConfig<ScatterTraceConfig>('scatter', parsed);

    expect(parsedConfig.name).toEqual(traceConfig.name);
    expect(parsedConfig.visible).toEqual(traceConfig.visible);

  });

  it('get trace config with data', () => {
    const traceConfig = DynTraceConfig.getTraceConfig<ScatterTraceConfig>('scatter', {});
    traceConfig.mode = 'markers+lines';
    traceConfig.xDataPath = 'time';
    traceConfig.yDataPath = 'value';
    traceConfig.showLegend = true;
    const initialConfig = traceConfig.toInitialConfig(renderContext);
    console.log('initialConfig', initialConfig);
    expect(initialConfig.name).toEqual('');
    expect(initialConfig.mode).toEqual('markers+lines');
    expect(initialConfig.opacity).toEqual(1);
    expect(initialConfig.xaxis).toEqual('x');
    expect(initialConfig.yaxis).toEqual('y');
    expect(initialConfig.showlegend).toEqual(true);
    expect(initialConfig.line).toEqual({width: 2, shape: 'linear', smoothing: 1, dash: 'solid'});

    const dataConfig = traceConfig.toDataConfig(testData, renderContext);
    console.log('dataConfig', dataConfig);
    expect(dataConfig).toEqual({x: [0, 1], y: [1, 2]});

  });

});
