import { Component, forwardRef, Input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-atom-textarea',
  templateUrl: './atom-textarea.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AtomTextareaComponent),
    multi: true
  }]
})

export class AtomTextareaComponent {
  @Input()
  labelName: string;

  @Input()
  formControlName: string;
  
  @Input() set control(value: FormControl) {
    if (this.formControl !== value) {
      this.formControl = value;
    }
  };

  formControl: FormControl;

}
