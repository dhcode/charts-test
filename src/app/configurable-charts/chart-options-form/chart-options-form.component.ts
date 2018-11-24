import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChartOption, ChartOptionValues} from '../lib/models/chart-options';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-chart-options-form',
  templateUrl: './chart-options-form.component.html',
  styleUrls: ['./chart-options-form.component.scss']
})
export class ChartOptionsFormComponent implements OnInit {

  _options: ChartOption[] = [];
  _values: ChartOptionValues;
  @Output() valuesChange = new EventEmitter<ChartOptionValues>();

  form: FormGroup;

  constructor() {
  }

  @Input() set values(v: ChartOptionValues) {
    this._values = v;
    if (this.form) {
      this.form.patchValue(v);
    }
  }

  @Input() set options(o: ChartOption[]) {
    this._options = o;
    this.createForm();
    if (this._values) {
      this.form.patchValue(this._values);
    }
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(change => {
      this.valuesChange.next(change);
    });
  }

  createForm() {
    // types: 'int' | 'string' | 'decimal' | 'boolean' | 'color'

    const formControls = {};

    for (const option of this._options) {
      formControls[option.name] = new FormControl(option.defaultValue);
    }

    this.form = new FormGroup(formControls);

  }

}
