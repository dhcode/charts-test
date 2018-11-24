import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ChartOption, ChartOptionValues } from '../../lib/models/chart-options';
import { stringOpt } from '../../lib/chart-option-utils';
import { TraceConfig } from '../../lib/models/chart-config';

@Component({
  selector: 'app-trace-options-dialog',
  templateUrl: './trace-options-dialog.component.html',
  styleUrls: ['./trace-options-dialog.component.scss']
})
export class TraceOptionsDialogComponent implements OnInit {

  valuesIn: ChartOptionValues;

  private values: ChartOptionValues;

  optionsDef: ChartOption[];

  constructor(public dialogRef: MatDialogRef<TraceOptionsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: { optionsDef: ChartOption[], options: ChartOption[], label: string }) {
    this.optionsDef = [
      stringOpt('_label', 'Label'),
      ...dialogData.optionsDef
    ];
    this.valuesIn = {
      _label: dialogData.label,
      ...dialogData.options
    };
  }

  ngOnInit() {
  }

  updateValues(options: ChartOptionValues) {
    this.values = options;
  }

  save() {
    const label = this.values._label || this.valuesIn._label;
    const options = this.values || this.valuesIn;
    delete options._label;
    this.dialogRef.close({options: options, label: label});
  }

}
