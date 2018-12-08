import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DynChartConfig } from '../lib/dyn-chart-config';

@Component({
  selector: 'app-dyn-chart-configurer',
  templateUrl: './dyn-chart-configurer.component.html',
  styleUrls: ['./dyn-chart-configurer.component.scss']
})
export class DynChartConfigurerComponent implements OnInit {

  @Input() config: DynChartConfig;

  @Output() configChange = new EventEmitter<DynChartConfig>();

  constructor() { }

  ngOnInit() {
  }

}
