import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';

const routes: Routes = [
  {
    path:'',
    component: StudentsComponent
  },
  {
    path:'students',
    component: StudentsComponent
  },
  {
    path: 'students/:id',
    component: StudentDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
