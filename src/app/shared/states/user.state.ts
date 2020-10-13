import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddUser, GetUsers } from '../actions/user.action';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';


export class UsersStateModel {
  users: User[];
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    users: []
  }
})

@Injectable()
export class UsersState {
  @Selector()
  static getUsers({ users }: UsersStateModel): User[] {
    return users
  }

  constructor(private auth: AuthService) { }

  @Action(GetUsers)
  get({ patchState }: StateContext<UsersStateModel>) {
    return this.auth.getUsers().subscribe(data => {
      patchState({
        users: data,
      });
    });
  }

  @Action(AddUser)
  addUser({ getState, patchState }: StateContext<UsersStateModel>, { payload }: AddUser) {
    return this.auth.addUser(payload).pipe(tap((res) => {
      const state = getState();
      patchState({
        users: [...state.users, res]
      });
    }));
  }

}