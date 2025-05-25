import { Component } from '@angular/core';
import { Course } from './models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../../core/services/courses.service';

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
      id: [''],
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
      .then((datos) => 
        this.courses = datos
      )
      .catch((error) => console.error(error)) 
      .finally(() => (this.isLoading = false)); 
  }

  onSubmit(){
    if(this.editingId != null && this.editingId != undefined){
     
      this.courses = this.courses.map((course) => course.id === this.editingId ? 
      {...course, ...this.courseForm.value} : course )
    } 
    else{
      let lastCourse = this.courses[this.courses.length-1];
      this.courseForm.value.id = lastCourse.id + 1;
      this.courses = [...this.courses, this.courseForm.value]
    }

    this.courseForm.reset()
    this.editingId = null
  }
  
  onEditCourse(course: Course){
    
    this.editingId = course.id;
    this.courseForm.patchValue(course)
  }

  onDeleteCourse(id: number){
    if(confirm("esta segudo que quiere eliminar este curso " + id + "?")){
      this.courses = this.courses.filter((course) => course.id !== id)
    }
  }
}
