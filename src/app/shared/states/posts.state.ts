import { UserPost } from '../models/post.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { AddPost, GetPosts, RemovePost, EditPost } from '../actions/posts.action';
import { tap } from 'rxjs/operators';

export class PostStateModel {
    posts: UserPost[];
}

@State<PostStateModel>({
    name: 'posts',
    defaults: {
        posts: []
    }
})

@Injectable()
export class PostState {
    @Selector()
    static getPosts({ posts }: PostStateModel ): UserPost[] {
        return posts
    }

    constructor(private blog: BlogService) { }

    @Action(GetPosts)
    get({ patchState }: StateContext<PostStateModel>) {
        return this.blog.getPosts().subscribe(data => {
            patchState({
                posts: data,
            });
        });
    }

    @Action(AddPost)
    add({ getState, patchState }: StateContext<PostStateModel>, { payload }: AddPost) {
      return this.blog.addPost(payload).pipe(tap((res) => {
        const state = getState();
        patchState({
          posts: [...state.posts, res]
        });
      }));
    }

    @Action(RemovePost)
    remove({ getState, patchState }: StateContext<PostStateModel>, { payload }: RemovePost) {
        return this.blog.deletePost(payload)
    }

    @Action(EditPost)
    edit({ getState, patchState }: StateContext<PostStateModel>, { payload }: EditPost) {
        return this.blog.updatePost(payload)
    }

}