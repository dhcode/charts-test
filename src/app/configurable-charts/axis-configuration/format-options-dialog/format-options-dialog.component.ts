import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OutputFormatOptions } from '../../lib/models/data-formatter';
import { AxisConfig } from '../../lib/models/chart-config';

@Component({
  selector: 'app-format-options-dialog',
  templateUrl: './format-options-dialog.component.html',
  styleUrls: ['./format-options-dialog.component.scss']
})
export class FormatOptionsDialogComponent implements OnInit {

  options: OutputFormatOptions;

  numberFormats = [
    ',d',
    ',.2f'
  ];

  constructor(public dialogRef: MatDialogRef<FormatOptionsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private column: AxisConfig) {
  }

  ngOnInit() {
    this.options = {...this.column.formatOptions};
  }

  save() {
    this.dialogRef.close(this.options);
  }

}
