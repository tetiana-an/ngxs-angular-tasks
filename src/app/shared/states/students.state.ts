import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddStudent, EditStudent, RemoveStudent } from '../actions/students.action';
import { Student, StudentsList } from '../models/students.model'


@State<StudentsList>({
    name: 'students',
    defaults: {
        students: [{ regId: 1, name: 'Tania', address: '1/3 St' }]
    }
})

export class StudentState {
    @Selector()
    static getStudents({ students }: StudentsList): Student[] {
        return students
    }

    
    @Action(AddStudent)
    add ({ getState, patchState }: StateContext<StudentsList>, { student }: AddStudent) {
        const state = getState()        
        patchState({
            students: [...state.students, student]
        })
    }

    @Action(EditStudent)
    edit({ getState, patchState }: StateContext<StudentsList>, { student }: EditStudent) {
        const studList = getState().students
        const findIndex = studList.findIndex(elem => elem.regId === student.regId)
   
        const newStudList = [...studList.slice(0, findIndex), 
                                student, 
                             ...studList.slice(findIndex + 1)]
        patchState({
            students: newStudList
        })
    }

    @Action(RemoveStudent)
    remove({ getState, patchState }: StateContext<StudentsList>, { id }: RemoveStudent) {
        patchState({
            students: getState().students.filter(a => a.regId != id)
        })
    }

}