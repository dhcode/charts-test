import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnizerComponent } from './columnizer/columnizer.component';
import { ColumnSettingComponent } from './columnizer/column-setting/column-setting.component';
import { PathSelectorComponent } from './columnizer/path-selector/path-selector.component';
import { FormatOptionsDialogComponent } from './columnizer/format-options-dialog/format-options-dialog.component';
import { ConfiguredChartComponent } from './configured-chart/configured-chart.component';
import {
  MatButtonModule, MatButtonToggleModule,
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
  MatSelectModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ChartConfigurationComponent } from './chart-configuration/chart-configuration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    MatLineModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonToggleModule
  ],
  declarations: [
    ColumnizerComponent,
    ColumnSettingComponent,
    PathSelectorComponent,
    FormatOptionsDialogComponent,
    ConfiguredChartComponent,
    ChartConfigurationComponent
  ],
  entryComponents: [
    FormatOptionsDialogComponent
  ],
  exports: [
    ChartConfigurationComponent,
    ConfiguredChartComponent
  ]
})
export class ConfigurableChartsModule { }
