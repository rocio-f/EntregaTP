import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../students.services';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {
student$: Observable<Student | null>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService
  ) {
    const studentId = this.activatedRoute.snapshot.params['id'];
 
    this.student$ = this.studentService.getStudentById(studentId);
  }
}
