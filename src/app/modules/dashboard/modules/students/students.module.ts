import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NameLastNamePipe } from './pipes/name-last-name.pipe';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StoreModule } from '@ngrx/store';
import { StudentsFeature } from './store/students.reducer';
import { StudentByIdFeature } from './store/studentById.reducer';
import { StudentsEffects } from './store/students.effects';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    NameLastNamePipe,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    StudentsRoutingModule,
    StoreModule.forFeature(StudentsFeature),
    StoreModule.forFeature(StudentByIdFeature),
    EffectsModule.forFeature([StudentsEffects])
  ],
  exports: [StudentsComponent]
})
export class StudentsModule { }
