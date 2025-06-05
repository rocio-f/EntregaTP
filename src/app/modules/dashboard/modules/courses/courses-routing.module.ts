import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';

const routes: Routes = [
   {
      path:'',
      component: CoursesComponent
   },
   {
      path:'courses',
      component: CoursesComponent
   },
   {
      path: 'courses/:id',
      component: CourseDetailComponent,
   },
   {
      path: ':id',
      component: CourseDetailComponent,
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
