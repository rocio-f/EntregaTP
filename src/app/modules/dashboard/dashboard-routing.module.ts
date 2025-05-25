import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'students',
    loadChildren: () =>
      import('./modules/students/students.module').then(
        (m) => m.StudentsModule
      ),
  },
  {
    path: 'courses',
    // canActivate: [adminGuard], //los alumnos puede listar los cursos segun consigna coderhouse
    loadChildren: () =>
      import('./modules/courses/courses.module').then(
        (m) => m.CoursesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
