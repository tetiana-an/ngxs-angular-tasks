import { Component, forwardRef, OnInit, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { GetPosts, RemovePost } from 'src/app/shared/actions/posts.action';
import { UserPost } from 'src/app/shared/models/post.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostState } from 'src/app/shared/states/posts.state';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CardComponent),
    multi: true
  }]
})

export class CardComponent implements OnInit {
  @Select(PostState.getPosts)
  arrPosts$: Observable<UserPost[]>;
  modalRef: BsModalRef;
  currentUser = JSON.parse(localStorage.getItem('localUser'));;
  currentPost = JSON.parse(localStorage.getItem('localPost'));
  editStatus: boolean;
  changePost: boolean;

  constructor(private store: Store,
    private modalService: BsModalService, private auth: AuthService) { }

  ngOnInit(): void {
    this.store.dispatch(new GetPosts())
    this.userInfo();
    this.getLocalStorage();
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

  editPost(post: UserPost, template: TemplateRef<any>) {
    this.changePost = true;
    localStorage.setItem('localPost', JSON.stringify(post));
    this.modalRef = this.modalService.show(template);
  }

  deletePost(post: UserPost) {
    this.store.dispatch([new RemovePost(post), new GetPosts()])
  }

}
