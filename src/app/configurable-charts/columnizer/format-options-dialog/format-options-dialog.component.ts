import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OutputFormatOptions } from '../../utils/chart-data-formatter';
import { ColumnConfig } from '../../utils/chart-config';

@Component({
  selector: 'app-format-options-dialog',
  templateUrl: './format-options-dialog.component.html',
  styleUrls: ['./format-options-dialog.component.scss']
})
export class FormatOptionsDialogComponent implements OnInit {

  options: OutputFormatOptions;

  constructor(public dialogRef: MatDialogRef<FormatOptionsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private column: ColumnConfig) {
  }

  ngOnInit() {
    this.options = {...this.column.formatOptions};
  }

  save() {
    this.dialogRef.close(this.options);
  }

}
