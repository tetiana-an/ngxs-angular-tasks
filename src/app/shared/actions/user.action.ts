import { User } from '../models/user.model';

export class GetUsers {
    static readonly type = '[USERS] Get';
    static readonly descr = 'Get all users from database'
}

export class AddUser {
    static readonly type = '[USER] Add'
    static readonly descr = 'Add user to database'
    constructor(public payload: User) { }
}