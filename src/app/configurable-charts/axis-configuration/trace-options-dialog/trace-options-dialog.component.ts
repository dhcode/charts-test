import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ChartOption, ChartOptionValues} from '../../lib/models/chart-options';

@Component({
  selector: 'app-trace-options-dialog',
  templateUrl: './trace-options-dialog.component.html',
  styleUrls: ['./trace-options-dialog.component.scss']
})
export class TraceOptionsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TraceOptionsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData: {optionsDef: ChartOption[], options: ChartOptionValues}) { }

  ngOnInit() {
  }

}
