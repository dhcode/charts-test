import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { ColumnizerComponent } from './columnizer/columnizer.component';
import { ColumnSettingComponent } from './columnizer/column-setting/column-setting.component';
import { PathSelectorComponent } from './columnizer/path-selector/path-selector.component';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule, MatIconModule,
  MatInputModule,
  MatLineModule,
  MatListModule, MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormatOptionsDialogComponent } from './columnizer/format-options-dialog/format-options-dialog.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ColumnizerComponent,
    ColumnSettingComponent,
    PathSelectorComponent,
    FormatOptionsDialogComponent
  ],
  entryComponents: [
    FormatOptionsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
