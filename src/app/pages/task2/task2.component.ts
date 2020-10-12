import { AfterViewInit, Component, forwardRef, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Task2Component),
    multi: true
  }]
})

export class Task2Component implements AfterViewInit {
  modalRef: BsModalRef;
  currentUser = JSON.parse(localStorage.getItem('localUser'));
  isRegister: boolean;
  isLogin: boolean;
  isCreatePost: boolean;

  constructor( private modalService: BsModalService) { }

  ngAfterViewInit() {
    this.currentUser = JSON.parse(localStorage.getItem('localUser'));
  }

  signUp(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.isRegister = true;
  }

  signIn(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.isLogin = true;
  }

  addPost(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.isCreatePost = true;
  }

  reset() {
    this.isRegister = false;
    this.isLogin = false;
    this.isCreatePost = false;
  }

}