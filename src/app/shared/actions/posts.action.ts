import { UserPost } from '../models/post.model';

export class GetPosts {
    static readonly type = '[POSTS] Get';
    static readonly descr = 'Get all posts from database'
}

export class AddPost {
    static readonly type = '[POST] Add'
    static readonly descr = 'Add post to database'
    constructor(public payload: UserPost) { }
}

export class EditPost {
    static readonly type = '[POST] Edit'
    static readonly descr = 'Edit post from list'

    constructor(public payload: any) {
    }
}

export class RemovePost {
    static readonly type = '[POST] Remove'
    static readonly descr = 'Remove post from list'

    constructor(public payload: UserPost) {
    }
}