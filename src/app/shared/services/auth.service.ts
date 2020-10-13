import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url: string;
  currentUser: string | object;
  user: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/users';
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.url);
  }

  addUser(payload: User): Observable<User> {
    return this.http.post<User>(this.url, payload);
  }

  getLocalUser(): string | Object {
    return this.currentUser = JSON.parse(localStorage.getItem('localUser'));
  }

  signOut(): void {
    this.currentUser = null;
    localStorage.setItem('localUser', JSON.stringify(this.currentUser));
  }

}
