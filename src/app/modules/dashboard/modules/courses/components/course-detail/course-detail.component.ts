import { Component } from '@angular/core';
import { Course } from '../../models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../../../../core/services/courses.service';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
course$: Observable<Course | null>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService
  ) {
    const courseId = this.activatedRoute.snapshot.params['id'];

    this.course$ = this.courseService.getCourseById(courseId);
  }
}
