import { Component, forwardRef, OnInit, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { GetPosts, RemovePost } from 'src/app/shared/actions/posts.action';
import { UserPost } from 'src/app/shared/models/post.model';
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
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.currentUser;
    this.store.dispatch(new GetPosts())
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
