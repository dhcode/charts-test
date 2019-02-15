import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OptionDefinition, OptionValues } from '../../../options-configuration/lib/options.model';
import { stringOpt } from '../../../options-configuration/lib/option-utils';

@Component({
  selector: 'app-trace-options-dialog',
  templateUrl: './trace-options-dialog.component.html',
  styleUrls: ['./trace-options-dialog.component.scss']
})
export class TraceOptionsDialogComponent implements OnInit {

  valuesIn: OptionValues;

  private values: OptionValues;

  optionsDef: OptionDefinition[];

  constructor(public dialogRef: MatDialogRef<TraceOptionsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: { optionsDef: OptionDefinition[], options: OptionDefinition[], label: string }) {
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

  updateValues(options: OptionValues) {
    this.values = options;
  }

  save() {
    const label = this.values._label || this.valuesIn._label;
    const options = this.values || this.valuesIn;
    delete options._label;
    this.dialogRef.close({options: options, label: label});
  }

}
