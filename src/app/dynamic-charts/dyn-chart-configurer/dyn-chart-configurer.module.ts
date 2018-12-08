import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynChartConfigurerComponent } from './dyn-chart-configurer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DynChartConfigurerComponent
  ],
  exports: [
    DynChartConfigurerComponent
  ]
})
export class DynChartConfigurerModule {
}
