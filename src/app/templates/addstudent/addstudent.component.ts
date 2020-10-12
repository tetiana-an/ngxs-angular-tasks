import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddStudent } from 'src/app/shared/actions/students.action';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.scss']
})

export class AddstudentComponent {
  id: number;
  name: string;
  address: string;

  constructor(private store: Store) { }

  addStudent(id, name, address): any {
    this.store.dispatch(new AddStudent({ regId: id, name: name, address: address }))
  }

}
