import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-atom-error',
  templateUrl: './atom-error.component.html',
  styleUrls: ['./atom-error.component.scss']
})
export class AtomErrorComponent implements OnInit {

  @Input()
  errorText: string = 'This username or email already exists';

  constructor() { }

  ngOnInit(): void {
  }

}
