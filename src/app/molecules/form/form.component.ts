import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { UsersState } from 'src/app/shared/states/user.state';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AddUser, GetUsers } from 'src/app/shared/actions/user.action';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UserPost } from 'src/app/shared/models/post.model';
import { AddPost, EditPost, GetPosts } from 'src/app/shared/actions/posts.action';
import { PostState } from 'src/app/shared/states/posts.state';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormComponent),
    multi: true
  }]
})

export class FormComponent implements OnInit {
  modalRef: BsModalRef
  @Input() register: boolean;
  @Input() login: boolean;
  @Input() addPost: boolean;
  @Input() update: boolean;

  @Select(UsersState.getUsers) users$: Observable<User[]>;
  @Select(PostState.getPosts) arrPost$: Observable<UserPost[]>;
  signUpForm: FormGroup;
  signInForm: FormGroup;
  createPost: FormGroup;
  updatePostForm: FormGroup;
  currentUser = JSON.parse(localStorage.getItem('localUser'));
  currentPost = JSON.parse(localStorage.getItem('localPost'));
  arrPost: Array<UserPost> = [];
 
  constructor( private formBuilder: FormBuilder,
               private store: Store ) { }
               
  ngOnInit(): void {
    this.signUpForm = this.createUserForm();
    this.signInForm = this.checkForm();
    this.createPost = this.createPostForm();
    this.updatePostForm = this.changePost();
    this.currentUser;
    this.store.dispatch(new GetUsers())
    this.store.dispatch(new GetPosts());
    this.changePost();
    this.arrPost$.subscribe(
      data => {
        this.arrPost = data
      })
  }

  createUserForm() {
    return this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern(/^[a-z]{1,20}$/i)]],
      email: ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([a-z\.-]+)\.([a-z\.]{2,6})$/)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  checkForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([a-z\.-]+)\.([a-z\.]{2,6})$/)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  createPostForm() {
    return this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      text: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  changePost() {
    return this.formBuilder.group({
      title: [this.currentPost?.title, [Validators.required, Validators.minLength(3)]],
      text: [this.currentPost?.text, [Validators.required, Validators.minLength(3)]],
    });
  }

  signUp(formData: FormGroup) {
    const newUser: User = {
      name: formData['userName'],
      email: formData['email'],
      password: formData['password'],
      role: 'user',
    }
    this.users$.subscribe(
      data => {
        if (data.some(user => user.email == formData['email'])) {
          console.log('regError');
        }
        else {
          this.store.dispatch(new AddUser(newUser))
          this.signUpForm.reset();
        }
      }
    )
  }

  signIn(formData: FormGroup) {
    this.users$.subscribe(
      data => {
        if (data.some(user => user.email == formData['email'] && user.password == formData['password'])) {
          const person = data.filter(user => user.email == formData['email']);
          localStorage.setItem('localUser', JSON.stringify(person[0]));
          this.signInForm.reset();
        }
        else {
          console.log('loginError');
        }
      }
    )
  }

  newPost(formData: FormGroup) {
    const newPost: UserPost = {
      id: 1,
      userID: this.currentUser.id,
      title: formData['title'],
      author: this.currentUser.name,
      text: formData['text'],
      date: new Date()
    }
    if (this.arrPost.length > 0) {
      newPost.id = this.arrPost.slice(-1)[0].id + 1;
    }
    this.store.dispatch(new AddPost(newPost))
  }

  updatePost(formData: FormGroup) {
    const updatePost: UserPost = {
      id: this.currentPost.id,
      userID: this.currentUser.id,
      title: formData['title'],
      author: this.currentUser.name,
      text: formData['text'],
      date: this.currentPost.date
    }
    this.store.dispatch(new EditPost(updatePost))
    this.store.dispatch(new GetPosts());
    this.updatePostForm.reset()
  }

}