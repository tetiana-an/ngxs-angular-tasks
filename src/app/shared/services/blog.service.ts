import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserPost } from '../models/post.model';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/posts';
  }

  getPosts(): Observable<Array<UserPost>> {
    return this.http.get<Array<UserPost>>(this.url);
  }

  addPost(payload: UserPost): Observable<UserPost> {
    return this.http.post<UserPost>(this.url, payload);
  }

  deletePost(payload: UserPost): Observable<UserPost> {
    return this.http.delete<UserPost>(`${this.url}/${payload.id}`);
  }

  updatePost(payload: UserPost): Observable<UserPost> {
    return this.http.put<UserPost>(`${this.url}/${payload.id}`, payload);
  }

}