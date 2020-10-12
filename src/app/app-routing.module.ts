import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Task1Component } from './pages/task1/task1.component';
import { Task2Component } from './pages/task2/task2.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'task2' },
  { path: 'task2', component:  Task2Component},
  { path: 'task1', component:  Task1Component},
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
