import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder, FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';
import {noop, Subscription} from 'rxjs';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressFormComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AddressFormComponent,
      multi: true
    }
  ]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy, Validator {

  @Input()
  legend:string;

  onTouched = () => {};

  onValidatorChange = () => {};

  onChangeSub: Subscription;

  form: FormGroup = this.fb.group({
      addressLine1: [null, [Validators.required]],
      addressLine2: [null, [Validators.required]],
      zipCode: [null, [Validators.required]],
      city: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnDestroy(): void {
    this.onChangeSub?.unsubscribe();
  }

  writeValue(value: any): void {
    if (value) {
      this.form.setValue(value);
    }
  }

  registerOnChange(onChange: any): void {
    this.onChangeSub = this.form.valueChanges.subscribe(value => {
      onChange(value);
      this.onValidatorChange();
    });
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  validate(control: AbstractControl<any, any>): ValidationErrors {
    Object.keys(this.form.controls).forEach(key => {
      return this.form.get(key).errors;
    });
    return null;
  }

  registerOnValidatorChange?(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange;
  }
}



