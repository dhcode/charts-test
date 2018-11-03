import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigurableChartsModule } from './configurable-charts/configurable-charts.module';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ConfigurableChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
