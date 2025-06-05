import { Component, OnInit } from '@angular/core';
import { Course, newCourse } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../../core/services/courses.service';
import { first, Observable, take } from 'rxjs';
import { coursesActions } from './store/courses.actions';
import { Store } from '@ngrx/store';
import { selectCourse, selectCourses, selectCoursesError, selectCoursesLoading } from './store/courses.selector';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  editingId: string | null = null;
  courseForm: FormGroup;

  courses: Course[] = []
  isLoading = false;

  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder, 
    private coursesService: CourseService,
    private store: Store) {

      this.courses$ = this.store.select(selectCourses);
      this.loading$ = this.store.select(selectCoursesLoading);
      this.error$ = this.store.select(selectCoursesError);
      
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      professor: ['', Validators.required],
      modality: ['', Validators.required],
      level: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    this.store.dispatch(coursesActions.loadCourses())
  }

  loadCourses(){
     this.isLoading = true;
    this.coursesService
      .getCourses()
      .pipe(take(1), first())
            .subscribe({
              next: (datos) => {
                this.courses = datos; 
              },
              error: (error) => console.error(error),
              complete: () => {
                this.isLoading = false; 
              },
            });
  }

  onSubmit(){
    if(this.editingId != null && this.editingId != undefined){
     const editCourse: Course  = this.courseForm.value
     editCourse.id = this.editingId

     this.store.dispatch(coursesActions.editCourse({Course: editCourse}))
    } 
    else{
      const newCourse: newCourse  = this.courseForm.value
      
      this.store.dispatch(coursesActions.createCourse({Course: newCourse}))
    }

    this.courseForm.reset()
    this.editingId = null
  }
  
  onEditCourse(course: Course){
    this.editingId = course.id;
    this.courseForm.patchValue(course)
  }

  onDeleteCourse(id: string){
    if(confirm("esta seguro que quiere eliminar este curso " + id + "?")){
      this.courses = this.courses.filter((course) => course.id !== id)

      this.store.dispatch(coursesActions.deleteCourse({id}))
    }
  }
}
