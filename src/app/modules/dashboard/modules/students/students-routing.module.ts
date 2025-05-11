import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';

const routes: Routes = [
  {
    path:'',
    component: StudentsComponent
  },
//   {
//     path:'',
//     loadChildren: () => import('').then(m => m.)
//   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
