import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
  <div class="logo">
    <app-atom-logo-icon></app-atom-logo-icon>
    <app-atom-logo-text></app-atom-logo-text>
</div>
`,
  styles: [
    `.logo{
      display: flex; 
      justify-content: space-between;
      align-items: baseline;
  }`
  ]
})
export class LogoComponent {

}
