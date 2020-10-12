export interface UserPost {
    id?: number;
    userID: number;
    title: string;
    author: string;
    text: string;
    date: Object;
}

export interface PostsList {
    posts: UserPost[];
}