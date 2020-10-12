import { Component, TemplateRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { EditStudent, RemoveStudent } from 'src/app/shared/actions/students.action';
import { Student } from 'src/app/shared/models/students.model';
import { Observable } from 'rxjs'
import { StudentState } from 'src/app/shared/states/students.state';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-viewstudent',
  templateUrl: './viewstudent.component.html',
  styleUrls: ['./viewstudent.component.scss']
})
export class ViewstudentComponent {
  modalRef: BsModalRef;
  @Select(StudentState.getStudents)
  students$: Observable<Student[]>;
  id: number;
  name: string;
  address: string;
  editIndex: number;

  constructor( private store: Store, 
               private modalService: BsModalService ) { }

  public changeForm = new FormGroup({
    id: new FormControl('',),
    name: new FormControl('',),
    address: new FormControl('',),
  });

  delStudent(regId) {
    this.store.dispatch(new RemoveStudent(regId))
  }

  editStudent(student: Student, index: number): void {
    this.id = student.regId;
    this.name = student.name;
    this.address = student.address;
  }

  saveEditStudent(formData: FormData): void {
    const updateStudent = { regId: formData['id'], name: formData['name'], address: formData['address'] }
    this.store.dispatch(new EditStudent(updateStudent))
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


}
