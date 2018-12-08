import { TestBed } from '@angular/core/testing';

import { DynChartPlotlyBasicService, PlotlyConfigChange } from './dyn-chart-plotly-basic.service';
import { DynChartService } from '../dyn-chart.service';
import { DynChartConfigPlotly } from '../../lib/dyn-chart-config-plotly';
import { DynTraceConfig } from '../../lib/dyn-chart-config';
import { ScatterTraceConfig } from '../../lib/trace-config-types/scatter-trace-config';

describe('DynChartPlotlyBasicService', () => {


  beforeEach(() => TestBed.configureTestingModule({
    providers: [DynChartService, DynChartPlotlyBasicService]
  }));

  it('should be created', () => {
    const service: DynChartPlotlyBasicService = TestBed.get(DynChartPlotlyBasicService);
    expect(service).toBeTruthy();
  });

  it('should receive no config', () => {
    const plotlyService: DynChartPlotlyBasicService = TestBed.get(DynChartPlotlyBasicService);

    const changes = [];
    const sub = plotlyService.getPlotlyConfig().subscribe(change => {
      changes.push(change);
    });

    expect(changes.length).toEqual(0);

    sub.unsubscribe();
  });

  it('should receive config', () => {
    const chartService: DynChartService = TestBed.get(DynChartService);
    const plotlyService: DynChartPlotlyBasicService = TestBed.get(DynChartPlotlyBasicService);

    const buildConfigSpy = spyOn(plotlyService, 'buildChartConfig' as any).and.callThrough();

    const config = new DynChartConfigPlotly({});
    config.height = 600;
    chartService.updateConfig(config);

    const changes = [];
    const sub = plotlyService.getPlotlyConfig().subscribe(change => {
      console.log('change', change);
      changes.push(change);
    });

    expect(changes.length).toEqual(1);
    expect(changes[0].layout.height).toEqual(600);
    expect(buildConfigSpy).toHaveBeenCalledTimes(1);

    sub.unsubscribe();

    chartService.updateConfig(new DynChartConfigPlotly({}));

    expect(buildConfigSpy).toHaveBeenCalledTimes(1);

  });

  it('should receive config and data', () => {
    const chartService: DynChartService = TestBed.get(DynChartService);
    const plotlyService: DynChartPlotlyBasicService = TestBed.get(DynChartPlotlyBasicService);

    const config = new DynChartConfigPlotly({});
    const traceConfig = DynTraceConfig.getTraceConfig<ScatterTraceConfig>('scatter', {
      xDataPath: 'time',
      yDataPath: 'value'
    });
    config.traces.push(traceConfig);

    chartService.updateConfig(config);

    const changes: PlotlyConfigChange[] = [];
    const sub = plotlyService.getPlotlyConfig().subscribe(change => {
      console.log('change2', change);
      changes.push(change);
    });

    expect(changes.length).toEqual(1);

    const testData = [
      {time: 0, value: 1},
      {time: 1, value: 2},
    ];

    chartService.updateData(testData);

    expect(changes.length).toEqual(2);

    let dc: PlotlyConfigChange = changes[1];
    expect(dc.type).toEqual('update');
    expect(dc.indices).toEqual([0]);
    expect(dc.data).toEqual({x: [[0, 1]], y: [[1, 2]], text: [[]]});

    chartService.addData([
      {time: 2, value: 3}
    ]);

    expect(changes.length).toEqual(3);
    dc = changes[2];
    expect(dc.type).toEqual('extend');
    expect(dc.indices).toEqual([0]);
    expect(dc.data).toEqual({x: [[2]], y: [[3]], text: [[]]});

    sub.unsubscribe();

  });
});
