import { Student } from '../models/students.model'

export class AddStudent {
    static readonly type = '[STUDENT] Add'
    static readonly descr = 'Add student to list'
    constructor(public student?: Student) {
    }
}

export class EditStudent {
    static readonly type = '[STUDENT] Edit'
    static readonly descr = 'Edit student from list'
    constructor(public student: Student) {
    }
}

export class RemoveStudent {
    static readonly type = '[STUDENT] Remove'
    static readonly descr = 'Remove student from list'
    constructor(public id: number) {
    }
}