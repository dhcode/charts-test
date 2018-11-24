import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathSelectorComponent } from './axis-configuration/path-selector/path-selector.component';
import { FormatOptionsDialogComponent } from './axis-configuration/format-options-dialog/format-options-dialog.component';
import { ConfiguredChartComponent } from './configured-chart/configured-chart.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatLineModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartConfigurationComponent } from './chart-configuration/chart-configuration.component';
import { D3FormatPipe } from './pipes/d3-format.pipe';
import { AxisConfigurationComponent } from './axis-configuration/axis-configuration.component';
import { ChartOptionsFormComponent } from './chart-options-form/chart-options-form.component';
import { TraceOptionsDialogComponent } from './axis-configuration/trace-options-dialog/trace-options-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatLineModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonToggleModule
  ],
  declarations: [
    PathSelectorComponent,
    FormatOptionsDialogComponent,
    ConfiguredChartComponent,
    ChartConfigurationComponent,
    D3FormatPipe,
    AxisConfigurationComponent,
    ChartOptionsFormComponent,
    TraceOptionsDialogComponent,
  ],
  entryComponents: [
    FormatOptionsDialogComponent,
    TraceOptionsDialogComponent
  ],
  exports: [
    ChartConfigurationComponent,
    ConfiguredChartComponent,
    ChartOptionsFormComponent
  ]
})
export class ConfigurableChartsModule {
}
