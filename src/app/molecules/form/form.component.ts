import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { UsersState } from "src/app/shared/states/user.state";
import { Observable } from "rxjs";
import { User } from "src/app/shared/models/user.model";
import { AddUser, GetUsers } from "src/app/shared/actions/user.action";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { UserPost } from "src/app/shared/models/post.model";
import { AddPost, EditPost, GetPosts } from "src/app/shared/actions/posts.action";
import { PostState } from "src/app/shared/states/posts.state";
import { BsModalRef } from "ngx-bootstrap/modal";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styles: [
    `
      form {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormComponent),
      multi: true,
    },
  ],
})
export class FormComponent implements OnInit {
  modalRef: BsModalRef;
  @Input() register: boolean;
  @Input() login: boolean;
  @Input() addPost: boolean;
  @Input() editPost: boolean;

  @Output() closeClick = new EventEmitter();
  @Select(UsersState.getUsers) users$: Observable<User[]>;
  @Select(PostState.getPosts) arrPost$: Observable<UserPost[]>;
  signUpForm: FormGroup;
  signInForm: FormGroup;
  createPost: FormGroup;
  updatePostForm: FormGroup;
  currentUser = JSON.parse(localStorage.getItem("localUser"));
  currentPost = JSON.parse(localStorage.getItem("localPost"));
  arrPost: Array<UserPost> = [];
  user: string | object;
  error: boolean;
  errorText = "Please provide a valid email";
  editStatus: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.createUserForm();
    this.signInForm = this.checkForm();
    this.createPost = this.createPostForm();
    this.updatePostForm = this.changePost();
    this.currentUser;
    this.store.dispatch(new GetUsers());
    this.store.dispatch(new GetPosts());
    this.changePost();
    this.arrPost$.subscribe((data) => {
      this.arrPost = data;
    });
  }

  createUserForm() {
    return this.formBuilder.group({
      userName: ["", [Validators.required, Validators.pattern(/^[a-z]{1,20}$/i)]],
      email: ["", [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([a-z\.-]+)\.([a-z\.]{2,6})$/)]],
      password: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  checkForm() {
    return this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern(/^([a-z0-9_\.-]+)@([a-z\.-]+)\.([a-z\.]{2,6})$/)]],
      password: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  createPostForm() {
    if (this.editPost) {
      return this.formBuilder.group({
        title: [this.currentPost?.title, [Validators.required, Validators.minLength(3)]],
        text: [this.currentPost?.text, [Validators.required, Validators.minLength(3)]],
      });
    }
    return this.formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      text: ["", [Validators.required, Validators.minLength(3)]],
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
      name: formData["userName"],
      email: formData["email"],
      password: formData["password"],
      role: "user",
    };
    this.users$.subscribe((data) => {
      if (data.some((user) => user.email == formData["email"])) {
        console.log("This email already exist");
      } else {
        this.store.dispatch(new AddUser(newUser));
        this.signUpForm.reset();
        this.closeClick.emit();
      }
    });
  }

  signIn(formData: FormGroup) {
    this.users$.subscribe((data) => {
      if ( data.some((user) => user.email == formData["email"] && user.password == formData["password"])) {
        const person = data.filter((user) => user.email == formData["email"]);
        localStorage.setItem("localUser", JSON.stringify(person[0]));
        this.signInForm.reset();
        this.currentUser = JSON.parse(localStorage.getItem("localUser"));
        this.auth.user.next(this.currentUser);
        this.closeClick.emit();
      } else {
        console.log("Please provide a valid email or password");
      }
    });
  }

  newPost(formData: FormGroup) {
    const newPost: UserPost = {
      id: 1,
      userID: this.currentUser.id,
      title: formData["title"],
      author: this.currentUser.name,
      text: formData["text"],
      date: new Date(),
    };
    if (!this.editPost) {
      if (this.arrPost.length > 0) {
        newPost.id = this.arrPost[this.arrPost.length - 1].id + 1;
      }
      this.store.dispatch(new AddPost(newPost));
    }
    else {
      newPost.id = this.currentPost.id,
      this.store.dispatch(new EditPost(newPost));
      this.store.dispatch(new GetPosts)
    }
    this.closeClick.emit();
  }

  updateLocalUser() {
    localStorage.setItem("localUser", JSON.stringify(this.user));
  }

  resetForm() {
    this.register = false;
    this.login = false;
    this.addPost = false;
    this.editPost = false;
  }
}