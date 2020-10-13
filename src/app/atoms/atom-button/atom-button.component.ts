import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-atom-button',
  template: `<button [type]="type" [class]="btnClass" [disabled]="btnDisabled">{{ label }}</button>`
})

export class AtomButtonComponent{
  @Output() click = new EventEmitter();
  @Input() label = 'sign';
  @Input() btnClass = 'btn';
  @Input() type: string;
  @Input() btnDisabled: boolean
  
  onClick(){
    this.click.emit();
  }

}
