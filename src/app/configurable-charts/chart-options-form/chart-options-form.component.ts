import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChartOption, ChartOptionValues } from '../lib/models/chart-options';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chart-options-form',
  templateUrl: './chart-options-form.component.html',
  styleUrls: ['./chart-options-form.component.scss']
})
export class ChartOptionsFormComponent implements OnInit {

  @Input() options: ChartOption[];
  @Output() valuesChange = new EventEmitter<ChartOptionValues>();

  form: FormGroup;

  constructor() {
    this.createForm();
  }

  @Input() set values(v: ChartOptionValues) {
    this.form.patchValue(v);
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(change => {
      this.valuesChange.next(change);
    });
  }

  createForm() {
    // types: 'int' | 'string' | 'decimal' | 'boolean' | 'color'

    const formControls = {};

    for (const option of this.options) {
      formControls[option.name] = new FormControl(option.defaultValue);
    }

    this.form = new FormGroup(formControls);

  }

}
