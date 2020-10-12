import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-atom-label',
  templateUrl: './atom-label.component.html',
  styleUrls: ['./atom-label.component.scss']
})
export class AtomLabelComponent {
  @Input()
  labelName: string;
  @Input()
  labelfor: string;
}
