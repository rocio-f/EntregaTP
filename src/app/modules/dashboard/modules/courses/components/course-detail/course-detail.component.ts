import { Component, OnInit } from '@angular/core';
import { Course } from '../../models';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../../../../core/services/courses.service';
import { Store } from '@ngrx/store';
import { coursesActions } from '../../store/courses.actions';
import { selectCourseById, selectCourseIdError, selectCourseIdLoading } from '../../store/courses.selector';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
  courseId: string
  course$: Observable<Course>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private store: Store
  ) {
      this.courseId = this.activatedRoute.snapshot.params['id'];

      this.course$ = this.store.select(selectCourseById);
      this.loading$ = this.store.select(selectCourseIdLoading);
      this.error$ = this.store.select(selectCourseIdError);
  }
  
  ngOnInit(): void {
      this.store.dispatch(coursesActions.loadCourseById({id: this.courseId}))
  }
  
  backLastPage() {
    window.history.back()
  }
}
