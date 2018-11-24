import {
  AfterViewInit,
  Component, ComponentRef,
  ElementRef, Injector,
  Input,
  NgModuleFactoryLoader,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild, ViewContainerRef
} from '@angular/core';
import { ChartConfig } from '../lib/models/chart-config';
import { ChartTypeConfigurer } from '../lib/models/chart-types';
import { getChartTypeConfigurer } from '../lib/chart-configurers';
import { CHART_COMPONENT, ChartComponentBase } from './configured-chart.model';

@Component({
  selector: 'app-configured-chart',
  templateUrl: './configured-chart.component.html',
  styleUrls: ['./configured-chart.component.scss']
})
export class ConfiguredChartComponent implements OnInit, OnChanges {

  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  @Input() config: ChartConfig;

  @Input() data: any[];

  error = null;

  private configurer: ChartTypeConfigurer;

  private chartRef: ComponentRef<ChartComponentBase>;

  private initializedType = null;

  constructor(private loader: NgModuleFactoryLoader, private injector: Injector) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config && this.config && this.config.type) {
      this.configurer = getChartTypeConfigurer(this.config.type);
      this.initChartModule();
    }

  }

  updateInputs() {
    this.chartRef.instance.config = this.config;
    this.chartRef.instance.data = this.data;
    this.chartRef.instance.configurer = this.configurer;
  }

  initChartModule() {
    if (this.initializedType === this.config.type && this.chartRef) {
      this.updateInputs();
      return;
    }
    this.initializedType = this.config.type;
    const basePath = 'src/app/configurable-charts/configured-chart';
    this.loader.load(basePath + '/plotly-chart/plotly-chart.module#PlotlyChartModule').then(factory => {
      const module = factory.create(this.injector);
      const cfr = module.componentFactoryResolver;
      const componentType = module.injector.get(CHART_COMPONENT);
      const componentFactory = cfr.resolveComponentFactory(componentType);

      this.chartRef = this.container.createComponent(componentFactory);
      this.updateInputs();

    }, error => {
      console.error(error);
      this.error = error.toString();
    });
  }


}
