import { Component } from '@angular/core';

@Component({
  selector: 'app-atom-list',
  template: `<ul>
  <li routerLinkActive="active"  *ngFor="let item of items">
      <a [routerLink]="[item.link]">{{ item.name }}</a>
  </li>
  </ul>`,
  styleUrls: ['./atom-list.component.scss']
})

export class AtomListComponent {
  items = [{ name: 'blog', link: '/task2' }, { name: 'students list', link: '/task1' }]

}


