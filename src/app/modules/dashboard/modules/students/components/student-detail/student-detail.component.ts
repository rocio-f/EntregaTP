import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../../../core/services/students.service';
import { studentsActions } from '../../store/students.actions';
import { Store } from '@ngrx/store';
import { selectStudentById, selectStudentIdError, selectStudentIdLoading } from '../../store/students.selector';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit {
// student$: Observable<Student | null>;
  studentId: string
  student$: Observable<Student>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;


  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private store: Store
  ) {
    this.studentId = this.activatedRoute.snapshot.params['id'];
 
     this.student$ = this.store.select(selectStudentById);
     this.loading$ = this.store.select(selectStudentIdLoading);
     this.error$ = this.store.select(selectStudentIdError);
  }

  ngOnInit(): void {
      this.store.dispatch(studentsActions.loadStudentById({id: this.studentId}))
      
  }
}
