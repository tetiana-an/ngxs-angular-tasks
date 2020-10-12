import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-atom-button',
  templateUrl: './atom-button.component.html',
  styleUrls: ['./atom-button.component.scss']

})
export class AtomButtonComponent{
  @Output() click = new EventEmitter();
  @Input() label = 'sign';
  @Input() btnClass = 'btn';
  @Input() type: any;
  
  onClick(){
    this.click.emit();
  }

}
