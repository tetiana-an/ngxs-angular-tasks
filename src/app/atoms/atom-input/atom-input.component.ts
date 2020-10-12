import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-atom-input',
  templateUrl: './atom-input.component.html',
  styleUrls: ['./atom-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AtomInputComponent),
    multi: true
  }]
})
export class AtomInputComponent implements ControlValueAccessor {
  @Input()
  type: any;

  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  labelName: string;

  @Input()
  labelfor: string;

  value: string

  writeValue(value: string) {
    this.value = value
    console.log(this.value);
  }

  registerOnChange(value): void {
    this.value = value
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }


}