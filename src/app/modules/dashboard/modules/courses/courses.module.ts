import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import {MatTableModule} from '@angular/material/table';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CoursesTableComponent,
    CourseDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    MatTableModule
  ]
})
export class CoursesModule { }
