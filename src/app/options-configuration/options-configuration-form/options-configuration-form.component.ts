import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { OptionDefinition, OptionValues } from '../lib/options.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-options-configuration-form',
  templateUrl: './options-configuration-form.component.html',
  styleUrls: ['./options-configuration-form.component.scss']
})
export class OptionsConfigurationFormComponent implements OnInit, OnDestroy {

  _options: OptionDefinition[] = [];
  _values: OptionValues;
  @Output() valuesChange = new EventEmitter<OptionValues>();

  form: FormGroup;

  private destroy = new Subject();

  constructor() {
  }

  @Input() set values(v: OptionValues) {
    this._values = v;
    if (this.form) {
      this.form.patchValue(v);
    }
  }

  @Input() set options(o: OptionDefinition[]) {
    this._options = o;
    this.createForm();
    if (this._values) {
      this.form.patchValue(this._values);
    }
  }

  ngOnInit() {
    this.form.valueChanges.pipe(takeUntil(this.destroy)).subscribe(change => {
      this.valuesChange.next(change);
    });
  }

  ngOnDestroy(): void {
    this.destroy.complete();
  }

  createForm() {
    // types: 'int' | 'string' | 'decimal' | 'boolean' | 'color'

    const formControls = {};

    for (const option of this._options) {
      formControls[option.name] = new FormControl(option.defaultValue);
    }

    this.form = new FormGroup(formControls);

    console.log('create form', this.form);

  }

  toggleValue(name: string, active: boolean) {
    if (!active) {
      this.form.get(name).setValue(null);
    }
  }


}
