import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { SharedModule } from '../../../../shared/shared.module';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import {MatTableModule} from '@angular/material/table';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoursesFeature } from './store/courses.reducer';
import { CoursetByIdFeature } from './store/courseById.reducer';
import { CoursesEffects } from './store/courses.effects';


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
    MatTableModule,
    StoreModule.forFeature(CoursesFeature),
    StoreModule.forFeature(CoursetByIdFeature),
    EffectsModule.forFeature([CoursesEffects])
  ]
})
export class CoursesModule { }
