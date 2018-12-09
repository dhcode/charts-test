import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigurableChartsModule } from './configurable-charts/configurable-charts.module';
import { MatButtonToggleModule, MatTabsModule } from '@angular/material';
import { DynChartConfigurerModule } from './dynamic-charts/dyn-chart-configurer/dyn-chart-configurer.module';
import { DynamicChartsModule } from './dynamic-charts/dynamic-charts.module';

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ConfigurableChartsModule,
    DynChartConfigurerModule,
    DynamicChartsModule,
    MatButtonToggleModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
