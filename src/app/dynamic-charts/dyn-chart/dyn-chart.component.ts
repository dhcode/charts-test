import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentRef,
  Injector,
  Input,
  NgModuleFactoryLoader,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DynChartConfig } from '../lib/dyn-chart-config';
import { DynChartService } from './dyn-chart.service';
import { Subject } from 'rxjs';
import { DYN_CHART_COMPONENT } from './dyn-chart.model';

const basePath = 'src/app/dynamic-charts/dyn-chart/';

const typeToModule = {
  'plotly-basic': basePath + 'dyn-chart-plotly-basic/dyn-chart-plotly-basic.module#DynChartPlotlyBasicModule'
};

@Component({
  selector: 'app-dyn-chart',
  templateUrl: './dyn-chart.component.html',
  styleUrls: ['./dyn-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DynChartService]
})
export class DynChartComponent implements OnDestroy, OnChanges {

  @Input() config: DynChartConfig;

  @Input() data: any[];

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  private destroy = new Subject();

  error = null;

  private chart: any;

  private _error = null;

  private chartRef: ComponentRef<any>;

  private initializedType = null;

  constructor(private chartService: DynChartService,
              private loader: NgModuleFactoryLoader,
              private injector: Injector,
              private cd: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.checkConfig(changes.config.currentValue);
    }
    if (changes.data) {
      this.chartService.updateData(changes.data.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.destroy.complete();
  }

  checkConfig(config: DynChartConfig) {
    if (config && config.type !== this.initializedType) {
      this.clearChart();
    }

    this.chartService.updateConfig(config);

    this.initChartModule();
  }

  clearChart() {
    if (this.chartRef) {
      this.container.clear();
      this.chartRef = null;
    }
  }

  initChartModule() {
    if (!this.config || this.initializedType === this.config.type && this.chartRef) {
      return;
    }
    this.initializedType = this.config.type;
    const modulePath = typeToModule[this.config.type];
    if (!modulePath) {
      this.error = `Unknown chart type ${this.config.type}`;
      return;
    }

    this.loader.load(modulePath).then(factory => {
      const module = factory.create(this.injector);
      const cfr = module.componentFactoryResolver;
      const componentType = module.injector.get(DYN_CHART_COMPONENT);
      const componentFactory = cfr.resolveComponentFactory(componentType);

      this.chartRef = this.container.createComponent(componentFactory);

      this.cd.markForCheck();

    }, error => {
      console.error(error);
      this.error = error.toString();
    });
  }
}
