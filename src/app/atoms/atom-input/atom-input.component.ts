import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-atom-input',
  templateUrl: './atom-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AtomInputComponent),
    multi: true
  }]
})

export class AtomInputComponent implements ControlValueAccessor {
  @Input()
  labelName: string;

  @Input()
  placeholderText: string;

  @Input()
  formControlName: string;
  
  @Input() set control(value: FormControl) {
    if (this.formControl !== value) {
      this.formControl = value;
    }
  };

  formControl: FormControl;

  value: string

  writeValue(value: string) {
    this.value = value
  }

  registerOnChange(value): void {
    this.value = value
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}