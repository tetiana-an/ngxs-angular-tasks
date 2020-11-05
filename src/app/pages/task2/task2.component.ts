import { AfterViewInit, Component, forwardRef, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Store } from '@ngxs/store';
import { GetPosts } from 'src/app/shared/actions/posts.action';

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
  arrCircls = [{ title: "Menu1", rot: 0 }, { title: "Menu2", rot: 0 }, { title: "Menu3", rot: 0 }, { title: "Menu4", rot: 0 }, { title: "Menu5", rot: 0 }, { title: "Menu6", rot: 0 }]
  data: string;

  nbOptions = 8;
  angleStart = -360;

  constructor(private modalService: BsModalService,
    private auth: AuthService, private store: Store) { }

  ngAfterViewInit() {
    this.currentUser = JSON.parse(localStorage.getItem('localUser'));
    this.store.dispatch(new GetPosts())
    this.userInfo();
    this.getLocalStorage();
    this.setStyle()
  }

  getSel (sel) {
    return document.querySelectorAll(sel);
  };
  

  setStyle() {
    
   this.getSel('li#li').forEach(elem => {
      let p = document.createElement('p');
      p.textContent = elem.name;  
      elem.appendChild(p);
      console.log(elem);
      console.log(p);
   });
    
    let deg = 360 / this.arrCircls.length
    console.log(deg);

    this.arrCircls.forEach(elem => {
    })
  }

  private userInfo(): void {
    this.auth.user.subscribe(() => {
      this.getLocalStorage();
    }
    );
  }

  private getLocalStorage(): void {
    if (localStorage.length > 0 && localStorage.getItem('localUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('localUser'));
    }
  }

  signUp(template: TemplateRef<any>) {
    this.reset();
    this.modalRef = this.modalService.show(template);
    this.isRegister = true;
  }

  signIn(template: TemplateRef<any>) {
    this.reset();
    this.modalRef = this.modalService.show(template);
    this.isLogin = true;
  }

  addPost(template: TemplateRef<any>) {
    this.reset();
    this.modalRef = this.modalService.show(template);
    this.isCreatePost = true;
  }

  signOut() {
    this.reset();
    this.auth.signOut();
    this.auth.user.next(this.currentUser);
  }

  reset() {
    this.isRegister = false;
    this.isLogin = false;
    this.isCreatePost = false;
  }



}