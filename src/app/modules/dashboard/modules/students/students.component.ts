import { Component } from '@angular/core';
import { Student, newStudent } from './models';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../../core/services/students.service';
import { first, take } from 'rxjs';


@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent {

  editingId: number | null = null;
  studentForm: FormGroup;

  students: Student[] = []
  isLoading = false;

  constructor(private fb: FormBuilder, private studentsService: StudentService) {
    this.studentForm = this.fb.group({
      
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      grade: ['', Validators.required]
    })

    this.loadStudents()
  }

  loadStudents(){
     this.isLoading = true;
    this.studentsService
      .getStudents()
      .pipe(take(1), first())
      .subscribe({
        next: (datos) => {
          this.students = datos; 
        },
        error: (error) => console.error(error),
        complete: () => {
          this.isLoading = false; 
        },
      });
  }

  onSubmit(){
    if(this.editingId != null && this.editingId != undefined){
      this.students = this.students.map((student) =>
        student.id === this.editingId
          ? { ...student, ...this.studentForm.value }
          : student
      );
    } 
    else{
      ///nuevo estudiante
      const newStudent: newStudent  = this.studentForm.value
   
     this.studentsService.createStudent(newStudent)
     .subscribe({
        next: (response) =>{
          this.students = [...this.students, response]
        },
        error: (error) => console.error(error),
        complete: () => {
          
        }
     })
     
    }

    this.studentForm.reset()
    this.editingId = null
  }
  
  onEditStudent(student: Student){
    this.editingId = student.id;
    this.studentForm.patchValue(student)
  }

  onDeleteStudent(id: number){
    if(confirm("esta segudo que quiere eliminar este estudiante " + id + "?")){
      this.students = this.students.filter((student) => student.id !== id)
    }

    this.studentsService.deleteStudent(id.toLocaleString()).subscribe({
        next: (response) => {
          this.students = response;
        },
      });
  }

}
