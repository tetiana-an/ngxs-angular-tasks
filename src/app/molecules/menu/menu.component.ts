import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
  <nav>
  <app-atom-list></app-atom-list>
</nav>`,
  styles: [
    `  ul{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  `
  ]
})
export class MenuComponent {
}
