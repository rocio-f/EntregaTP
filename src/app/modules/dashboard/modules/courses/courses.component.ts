import { Component } from '@angular/core';
import { Course, newCourse } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../../core/services/courses.service';
import { first, take } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  editingId: number | null = null;
  courseForm: FormGroup;

  courses: Course[] = []
  isLoading = false;

  constructor(private fb: FormBuilder, private coursesService: CourseService) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      professor: ['', Validators.required],
      modality: ['', Validators.required],
      level: ['', Validators.required]
    })

    this.loadCourses()
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
     this.courses = this.courses.map((course) =>
        course.id === this.editingId
          ? { ...course, ...this.courseForm.value }
          : course
           );
    } 
    else{
      const newCourse: newCourse  = this.courseForm.value
   
      this.coursesService.createCourse(newCourse)
      .subscribe({
        next: (response) =>{
          this.courses = [...this.courses, response]
        },
        error: (error) => console.error(error),
        complete: () => {
          
        }
      })
    }

    this.courseForm.reset()
    this.editingId = null
  }
  
  onEditCourse(course: Course){
    this.editingId = course.id;
    this.courseForm.patchValue(course)
  }

  onDeleteCourse(id: number){
    if(confirm("esta seguro que quiere eliminar este curso " + id + "?")){
      this.courses = this.courses.filter((course) => course.id !== id)
    }

    this.coursesService.deleteCourse(id.toLocaleString()).subscribe({
        next: (response) => {
          this.courses = response;
        },
      });
  }
}
